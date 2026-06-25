import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const sourceAssetsDir = path.join(projectRoot, "source-assets");
const sourceFiles = [
  "index.html",
  "src/App.tsx",
  "src/slides.ts",
  "src/styles.css",
].map((file) => path.join(projectRoot, file));

const outputBaseUrl = "/assets/optimized";
const outputDir = path.join(publicDir, "assets", "optimized");
const quotedSourceImagePattern =
  /(["'`])((?:\/assets\/(?:imgs|profile)\/)[^"'`]+?\.(?:png|jpe?g))\1/gi;
const quotedOptimizedImagePattern = /(["'`])(\/assets\/optimized\/[^"'`]+?\.webp)\1/gi;
const rewriteRefs = process.argv.includes("--rewrite");

const maxWidths = {
  avatar: 520,
  profile: 520,
  mobile: 920,
  web: 1280,
  proof: 1180,
  default: 1280,
};

const sourceRoots = [sourceAssetsDir, publicDir];

function slugify(input) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function pickMaxWidth(publicPath) {
  const decoded = decodeURIComponent(publicPath).toLowerCase();
  if (decoded.includes("/profile/") || decoded.includes("profile")) return maxWidths.profile;
  if (decoded.includes("头像")) return maxWidths.avatar;
  if (decoded.includes("移动端")) return maxWidths.mobile;
  if (decoded.includes("web端")) return maxWidths.web;
  if (decoded.includes("截图") || decoded.includes("分享") || decoded.includes("合作")) {
    return maxWidths.proof;
  }
  return maxWidths.default;
}

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

async function loadExistingManifest() {
  const manifestPath = path.join(outputDir, "manifest.json");
  try {
    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    const optimizedToSource = new Map(
      (manifest.images ?? []).map((item) => [item.to, item.from]),
    );
    return { manifest, optimizedToSource };
  } catch (error) {
    if (error.code === "ENOENT") return { manifest: null, optimizedToSource: new Map() };
    throw error;
  }
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findSourcePath(publicPath) {
  const relativePath = decodeURIComponent(publicPath.replace(/^\//, ""));

  for (const root of sourceRoots) {
    const candidate = path.join(root, relativePath);
    if (await exists(candidate)) return candidate;
  }

  throw new Error(
    `Missing source image for ${publicPath}. Expected it under source-assets/ or public/.`,
  );
}

async function collectImageRefs(optimizedToSource) {
  const refs = new Set();
  const missingSources = new Set();

  for (const filePath of sourceFiles) {
    const content = await readIfExists(filePath);
    for (const match of content.matchAll(quotedSourceImagePattern)) {
      refs.add(match[2]);
    }
    for (const match of content.matchAll(quotedOptimizedImagePattern)) {
      const originalRef = optimizedToSource.get(match[2]);
      if (originalRef) {
        refs.add(originalRef);
      } else {
        missingSources.add(match[2]);
      }
    }
  }

  if (missingSources.size) {
    console.warn(
      `Skipped ${missingSources.size} optimized image reference(s) without manifest source mapping:`,
    );
    for (const ref of missingSources) {
      console.warn(`  - ${ref}`);
    }
  }

  return [...refs].sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}

async function optimizeImage(publicPath) {
  const sourcePath = await findSourcePath(publicPath);
  const stat = await fs.stat(sourcePath);
  const ext = path.extname(sourcePath).toLowerCase();
  const baseName = slugify(path.basename(sourcePath, ext)) || `image-${Date.now()}`;
  const outName = `${baseName}.webp`;
  const outPath = path.join(outputDir, outName);
  const outPublicPath = `${outputBaseUrl}/${outName}`;
  const metadata = await sharp(sourcePath).metadata();
  const maxWidth = pickMaxWidth(publicPath);
  const width = metadata.width && metadata.width > maxWidth ? maxWidth : undefined;

  await sharp(sourcePath)
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp({
      quality: 72,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outPath);

  const outputStat = await fs.stat(outPath);

  return {
    from: publicPath,
    to: outPublicPath,
    sourceBytes: stat.size,
    outputBytes: outputStat.size,
    sourceWidth: metadata.width ?? null,
    outputWidth: width ?? metadata.width ?? null,
  };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function rewriteSourceRefs(results, optimizedToSource) {
  const replacements = new Map(results.map((item) => [item.from, item.to]));

  for (const filePath of sourceFiles) {
    const content = await readIfExists(filePath);
    if (!content) continue;

    const nextContent = content
      .replace(quotedSourceImagePattern, (full, quote, imagePath) => {
        const replacement = replacements.get(imagePath);
        return replacement ? `${quote}${replacement}${quote}` : full;
      })
      .replace(quotedOptimizedImagePattern, (full, quote, imagePath) => {
        const sourceRef = optimizedToSource.get(imagePath);
        const replacement = sourceRef ? replacements.get(sourceRef) : null;
        return replacement ? `${quote}${replacement}${quote}` : full;
      });

    if (nextContent !== content) {
      await fs.writeFile(filePath, nextContent);
    }
  }
}

async function main() {
  const { optimizedToSource } = await loadExistingManifest();
  const refs = await collectImageRefs(optimizedToSource);

  await fs.rm(outputDir, { force: true, recursive: true });
  await fs.mkdir(outputDir, { recursive: true });

  const results = [];
  for (const ref of refs) {
    results.push(await optimizeImage(ref));
  }

  const totalBefore = results.reduce((sum, item) => sum + item.sourceBytes, 0);
  const totalAfter = results.reduce((sum, item) => sum + item.outputBytes, 0);
  const manifest = {
    generatedAt: new Date().toISOString(),
    outputBaseUrl,
    totalBefore,
    totalAfter,
    savingsRatio: totalBefore ? 1 - totalAfter / totalBefore : 0,
    images: results,
  };

  await fs.writeFile(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  if (rewriteRefs) {
    const nextOptimizedToSource = new Map(results.map((item) => [item.to, item.from]));
    await rewriteSourceRefs(results, new Map([...optimizedToSource, ...nextOptimizedToSource]));
  }

  console.table(
    results.map((item) => ({
      from: item.from,
      to: item.to,
      before: formatBytes(item.sourceBytes),
      after: formatBytes(item.outputBytes),
      saved: `${Math.round((1 - item.outputBytes / item.sourceBytes) * 100)}%`,
      width: item.outputWidth,
    })),
  );

  console.log(
    `Optimized ${results.length} images: ${formatBytes(totalBefore)} -> ${formatBytes(
      totalAfter,
    )} (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller).`,
  );
  console.log(`Manifest: ${path.relative(projectRoot, path.join(outputDir, "manifest.json"))}`);
  if (rewriteRefs) {
    console.log("Source references rewritten to optimized WebP paths.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
