import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Image as ImageIcon,
  Play,
  Search,
} from "lucide-react";
import { iconForExternalLink, slides, type LinkItem, type MediaItem, type Slide } from "./slides";

const avatarSrc = "/assets/profile/avatar.png";
const ExternalLinkIcon = iconForExternalLink;

function useSlideNavigation(total: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelLock = useRef(false);

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(total - 1, index)));
  };

  const next = () => goTo(activeIndex + 1);
  const previous = () => goTo(activeIndex - 1);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "A" || target?.tagName === "BUTTON") return;

      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex + 1);
      }

      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex - 1);
      }

      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(total - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, total]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (window.matchMedia("(max-width: 760px)").matches) return;
      if (Math.abs(event.deltaY) < 28 || wheelLock.current) return;

      wheelLock.current = true;
      if (event.deltaY > 0) goTo(activeIndex + 1);
      if (event.deltaY < 0) goTo(activeIndex - 1);

      window.setTimeout(() => {
        wheelLock.current = false;
      }, 720);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeIndex, total]);

  return { activeIndex, goTo, next, previous };
}

function App() {
  const { activeIndex, goTo, next, previous } = useSlideNavigation(slides.length);
  const activeSlide = slides[activeIndex];

  return (
    <main className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="deck-meta">
        <span>Hermionewei</span>
        <span>AI Product Experience Design</span>
      </div>

      <section className="slide-stage" aria-live="polite">
        <SlideView slide={activeSlide} index={activeIndex} total={slides.length} goTo={goTo} />
      </section>

      <nav className="deck-controls" aria-label="页面导航">
        <button
          type="button"
          className="icon-button"
          onClick={previous}
          disabled={activeIndex === 0}
          aria-label="上一页"
          title="上一页"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="progress-track" aria-label={`第 ${activeIndex + 1} 页，共 ${slides.length} 页`}>
          {slides.map((slide, index) => (
            <button
              key={`${slide.eyebrow}-${index}`}
              type="button"
              className={`progress-dot ${activeIndex === index ? "is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`跳转到第 ${index + 1} 页：${slide.title}`}
              title={slide.title}
            />
          ))}
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={next}
          disabled={activeIndex === slides.length - 1}
          aria-label="下一页"
          title="下一页"
        >
          <ArrowRight size={18} />
        </button>
      </nav>

      <div className="page-counter">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      {activeIndex < slides.length - 1 ? (
        <button type="button" className="scroll-hint" onClick={next} aria-label="下一页">
          <ChevronDown size={18} />
        </button>
      ) : null}
    </main>
  );
}

function SlideView({
  slide,
  index,
  total,
  goTo,
}: {
  slide: Slide;
  index: number;
  total: number;
  goTo: (index: number) => void;
}) {
  const slideClassName = [
    "slide",
    `slide-${slide.kind}`,
    slide.kind === "project" && slide.title.includes("\n") ? "has-title-break" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={slideClassName} key={`${slide.title}-${index}`}>
      {slide.kind === "finale" ? null : <SlideHeader slide={slide} index={index} total={total} />}
      {renderSlideBody(slide, goTo)}
    </article>
  );
}

function SlideHeader({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  const [heroName, ...heroAliasParts] = slide.title.split(" ");
  const heroAlias = heroAliasParts.join(" ");
  const closingTitleParts =
    slide.kind === "closing" && slide.title.includes("VibeCoding")
      ? slide.title.split("把想法")
      : null;
  const reflectionTitleBreak =
    slide.kind === "reflection" && slide.title.includes("\n")
      ? { parts: slide.title.split("\n"), sep: "" }
      : slide.kind === "reflection" && slide.title.includes("，")
        ? { parts: slide.title.split("，"), sep: "，" }
        : null;
  const proofTitleParts =
    slide.kind === "proof" && slide.title.includes("：")
      ? slide.title.split("：")
      : null;
  const projectTitleBreak =
    slide.kind === "project" && slide.title.includes("\n")
      ? slide.title.split("\n")
      : null;
  const title =
    slide.kind === "hero" && heroAlias ? (
      <h1 className="hero-title" aria-label={slide.title}>
        <span>{heroName}</span>
        <span className="hero-title-alias">{heroAlias}</span>
      </h1>
    ) : closingTitleParts ? (
      <h1 className="closing-title" aria-label={slide.title}>
        <span>{closingTitleParts[0]}</span>
        <span>把想法{closingTitleParts[1]}</span>
      </h1>
    ) : reflectionTitleBreak ? (
      <h1 className="reflection-title" aria-label={slide.title.replace("\n", "")}>
        <span>
          {reflectionTitleBreak.parts[0]}
          {reflectionTitleBreak.sep}
        </span>
        <span>{reflectionTitleBreak.parts.slice(1).join(reflectionTitleBreak.sep)}</span>
      </h1>
    ) : proofTitleParts ? (
      <h1 className="proof-title" aria-label={slide.title}>
        <span>{proofTitleParts[0]}：</span>
        <span>{proofTitleParts.slice(1).join("：")}</span>
      </h1>
    ) : projectTitleBreak ? (
      <h1 className="project-title-break" aria-label={slide.title.replace("\n", "")}>
        {projectTitleBreak.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
    ) : (
      <h1>{slide.title}</h1>
    );

  return (
    <header className="slide-header">
      <div>
        <p className="eyebrow">{slide.eyebrow}</p>
        {title}
        {slide.kind === "showcase" && slide.body ? <p className="lead header-lead">{slide.body}</p> : null}
      </div>
    </header>
  );
}

function renderSlideBody(slide: Slide, goTo: (index: number) => void) {
  switch (slide.kind) {
    case "hero":
      return <HeroSlide slide={slide} />;
    case "timeline":
      return <TimelineSlide slide={slide} />;
    case "pillars":
    case "closing":
      return <PillarsSlide slide={slide} />;
    case "project-map":
      return <ProjectMapSlide slide={slide} goTo={goTo} />;
    case "project":
      return <ProjectSlide slide={slide} />;
    case "proof":
      return <ProofSlide slide={slide} />;
    case "reflection":
      return <ReflectionSlide slide={slide} />;
    case "showcase":
      return <ShowcaseSlide slide={slide} />;
    case "influence":
      return <InfluenceSlide slide={slide} />;
    case "finale":
      return <FinaleSlide slide={slide} />;
    default:
      return null;
  }
}

function HeroSlide({ slide }: { slide: Slide }) {
  return (
    <div className="hero-layout">
      <div className="hero-copy">
        {slide.kicker ? <p className="kicker">{slide.kicker}</p> : null}
        {slide.body ? <p className="lead">{slide.body}</p> : null}
        <TagList tags={slide.tags} />
      </div>
      <div className="portrait-panel">
        <div className="portrait-frame">
          <img src={avatarSrc} alt="魏瑶 Hermionewei 头像" />
        </div>
      </div>
      <StatsGrid stats={slide.stats} />
    </div>
  );
}

function TimelineSlide({ slide }: { slide: Slide }) {
  return (
    <div className="timeline-layout">
      {slide.body ? <p className="lead">{slide.body}</p> : null}
      <div className="timeline-track">
        {slide.timeline?.map((item) => (
          <div
            className={`timeline-node ${item.current ? "is-current" : ""}`}
            key={item.period}
          >
            <span className="timeline-dot" aria-hidden="true" />
            <span className="timeline-period">{item.period}</span>
            <div className="timeline-card">
              <h2>
                {item.title}
                {item.note ? <span className="timeline-note">{item.note}</span> : null}
              </h2>
              {item.detail
                ? item.detail.map((line) => <p key={line}>{line}</p>)
                : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PillarsSlide({ slide }: { slide: Slide }) {
  return (
    <div className={`content-grid ${slide.kind === "closing" ? "is-closing" : ""}`}>
      <div className="intro-column">
        {slide.body ? <p className="lead">{slide.body}</p> : null}
        <TagList tags={slide.tags} />
      </div>
      <div className="pillar-grid">
        {slide.pillars?.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <section className="pillar" key={pillar.title}>
              <Icon size={28} aria-hidden="true" />
              <h2>{pillar.title}</h2>
              <p>{pillar.body}</p>
              <span className="pillar-proof">
                {pillar.proof.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function ProjectMapSlide({ slide, goTo }: { slide: Slide; goTo: (index: number) => void }) {
  const projectTargets: Record<string, string> = {
    爆锤解压音游: "爆锤解压音游",
    角色卡点播放器: "角色卡点播放器",
    "Vemus未音·Web端": "Vemus 未音 · Web 端",
    "Vemus未音·移动端": "音乐Agent工具设计\nVemus未音 · 移动端",
  };

  return (
    <div className="project-map-layout">
      <div className="project-card-grid">
        {slide.projects?.map((project, index) => {
          const targetTitle = projectTargets[project.title];
          const targetIndex = targetTitle
            ? slides.findIndex((item) => item.title === targetTitle)
            : -1;
          const isLinked = targetIndex >= 0;
          return (
            <button
              type="button"
              className={`project-card ${isLinked ? "" : "is-muted"}`}
              key={project.title}
              onClick={() => {
                if (isLinked) goTo(targetIndex);
              }}
              disabled={!isLinked}
              aria-label={isLinked ? `跳转到项目页：${project.title}` : project.title}
            >
              {isLinked ? (
                <ArrowUpRight className="project-card-arrow" size={18} aria-hidden="true" />
              ) : null}
              <h2>{project.title}</h2>
              <p className="project-card-meta">
                {project.time} · {project.role}
                {project.note ? ` · ${project.note}` : null}
              </p>
              <div className="project-card-foot">
                <span className="status-pill">{project.status}</span>
                <span className="project-card-metric">{project.highlight}</span>
                <span className="project-card-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectSlide({ slide }: { slide: Slide }) {
  const Icon = slide.icon;
  const projectShotClassName = [
    "project-shot",
    slide.image ? "" : "is-placeholder",
    slide.imageLayout === "web" ? "is-web" : "",
    slide.imageLayout === "mobile" ? "is-mobile" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (slide.image || slide.imagePlaceholder) {
    return (
      <div className="project-layout has-shot">
        <div className="project-copy">
          {slide.kicker ? <p className="kicker">{slide.kicker}</p> : null}
          {slide.body ? <p className="lead">{slide.body}</p> : null}
          <StatsGrid stats={slide.stats} />
          <TagList tags={slide.tags} />
          <LinkList links={slide.links} />
          <AppStoreHint text={slide.appStoreHint} />
        </div>
        <div className={projectShotClassName}>
          {slide.image ? (
            <img src={slide.image} alt={`${slide.title.replace("\n", " ")} 项目截图`} />
          ) : (
            <div className="project-shot-placeholder">
              <ImageIcon size={34} aria-hidden="true" />
              <span>{slide.imagePlaceholder}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="project-layout">
      <div className="project-copy">
        {slide.kicker ? <p className="kicker">{slide.kicker}</p> : null}
        {slide.body ? <p className="lead">{slide.body}</p> : null}
        <TagList tags={slide.tags} />
        <LinkList links={slide.links} />
        <BulletList bullets={slide.bullets} />
      </div>
      <div className="project-side">
        <div className="icon-orbit">
          {Icon ? <Icon size={58} aria-hidden="true" /> : <ArrowUpRight size={58} aria-hidden="true" />}
        </div>
        <StatsGrid stats={slide.stats} />
      </div>
    </div>
  );
}

function ProofSlide({ slide }: { slide: Slide }) {
  const hasIntro = Boolean(slide.body || slide.stats?.length);

  return (
    <div className={`proof-layout ${hasIntro ? "" : "is-media-only"}`}>
      {hasIntro ? (
        <div>
          {slide.body ? <p className="lead">{slide.body}</p> : null}
          <StatsGrid stats={slide.stats} compact />
        </div>
      ) : null}
      <MediaGrid media={slide.media} />
    </div>
  );
}

function ReflectionSlide({ slide }: { slide: Slide }) {
  const Icon = slide.icon;

  if (slide.avatar) {
    return (
      <div className="reflection-layout has-avatar is-quoted-reflection">
        <div>
          <BulletList bullets={slide.bullets} large />
          <MediaGrid media={slide.media} small />
        </div>
      </div>
    );
  }

  const isTakeaway = !slide.quote && !slide.body && !slide.media?.length && Boolean(slide.bullets?.length);

  if (isTakeaway) {
    return (
      <div className="reflection-layout is-takeaway">
        <BulletList bullets={slide.bullets} large />
      </div>
    );
  }

  return (
    <div className="reflection-layout">
      <div className="quote-panel">
        {Icon ? <Icon size={24} aria-hidden="true" /> : null}
        {slide.quote ? <blockquote>{slide.quote}</blockquote> : null}
        {slide.body ? <p className="lead">{slide.body}</p> : null}
      </div>
      <div>
        <BulletList bullets={slide.bullets} large />
        <MediaGrid media={slide.media} small />
      </div>
    </div>
  );
}

function ShowcaseSlide({ slide }: { slide: Slide }) {
  const mediaHasInlineLinks = slide.media?.some((item) => item.link);
  const hasLeftCopy = Boolean((slide.links?.length && !mediaHasInlineLinks) || slide.tags?.length);
  const isD2c = slide.variant === "d2c";

  return (
    <div
      className={`showcase-layout ${mediaHasInlineLinks ? "has-inline-links" : ""} ${isD2c ? "is-d2c" : ""} ${
        isD2c && !hasLeftCopy ? "is-media-only" : ""
      }`}
    >
      {hasLeftCopy ? (
        <div className="intro-column">
          {slide.tags?.length ? <TagList tags={slide.tags} /> : null}
          {slide.links?.length && !mediaHasInlineLinks ? <LinkList links={slide.links} dense /> : null}
        </div>
      ) : null}
      <MediaGrid media={slide.media} inlineLinks={mediaHasInlineLinks} variant={slide.variant} />
    </div>
  );
}

function InfluenceSlide({ slide }: { slide: Slide }) {
  const items = slide.influenceItems ?? [];
  if (!items.length) return null;

  const columns = items
    .map((item) => (item.images.length > 1 ? "2.1fr" : "1fr"))
    .join(" ");

  return (
    <div className="influence-grid" style={{ gridTemplateColumns: columns }}>
      {items.map((item) => (
        <article className="influence-card" key={item.title}>
          <div className="influence-card-head">
            <span className="influence-badge">{item.badge}</span>
            <p className="influence-card-title">
              {item.title}
              {item.desc ? (
                <>
                  <br />
                  {item.desc}
                </>
              ) : null}
            </p>
          </div>
          <div
            className="influence-shots"
            style={{ gridTemplateColumns: `repeat(${item.images.length}, minmax(0, 1fr))` }}
          >
            {item.images.map((src, i) => (
              <InfluenceShot
                key={src}
                src={src}
                alt={`${item.badge} ${i + 1}`}
                link={item.link}
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function InfluenceShot({ src, alt, link }: { src: string; alt: string; link?: LinkItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`influence-shot ${failed ? "is-empty" : ""}`}>
      {failed ? (
        <ImageIcon size={30} aria-hidden="true" />
      ) : (
        <>
          <img src={src} alt={alt} onError={() => setFailed(true)} />
          {link ? (
            <a
              className="influence-read-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`去阅读：${link.label}`}
            >
              <span>
                <ArrowUpRight size={15} aria-hidden="true" />
                去阅读
              </span>
            </a>
          ) : null}
        </>
      )}
    </div>
  );
}

function FinaleSlide({ slide }: { slide: Slide }) {
  return (
    <div className="finale-layout">
      <h1 className="finale-title" aria-label={slide.title.replace("\n", "")}>
        {slide.title.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
    </div>
  );
}

function StatsGrid({ stats, compact = false }: { stats?: Slide["stats"]; compact?: boolean }) {
  if (!stats?.length) return null;

  return (
    <div className={`stats-grid ${compact ? "is-compact" : ""}`}>
      {stats.map((stat) => (
        <div className="stat-card" key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          {stat.note ? <span className="stat-note">{stat.note}</span> : null}
        </div>
      ))}
    </div>
  );
}

function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;

  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function renderHighlights(text: string) {
  return text.split(/\[\[(.+?)\]\]/).map((part, i) =>
    i % 2 === 1 ? (
      <mark className="bullet-hl" key={i}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function BulletList({ bullets, large = false }: { bullets?: string[]; large?: boolean }) {
  if (!bullets?.length) return null;

  return (
    <ul className={`bullet-list ${large ? "is-large" : ""}`}>
      {bullets.map((bullet) => (
        <li key={bullet}>{renderHighlights(bullet)}</li>
      ))}
    </ul>
  );
}

function LinkList({ links, dense = false }: { links?: Slide["links"]; dense?: boolean }) {
  if (!links?.length) return null;

  return (
    <div className={`link-list ${dense ? "is-dense" : ""}`}>
      {links.map((link) => {
        const LinkIconComponent = link.label === "在线体验" ? ArrowUpRight : ExternalLinkIcon;

        return (
          <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
            <LinkIconComponent size={17} aria-hidden="true" />
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}

function AppStoreHint({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div className="link-list">
      <span className="app-store-hint">
        <Search size={17} aria-hidden="true" />
        <span>{text}</span>
      </span>
    </div>
  );
}

function MediaGrid({
  media,
  small = false,
  inlineLinks = false,
  variant,
}: {
  media?: MediaItem[];
  small?: boolean;
  inlineLinks?: boolean;
  variant?: Slide["variant"];
}) {
  const items = useMemo(() => media ?? [], [media]);
  if (!items.length) return null;

  return (
    <div
      className={`media-grid ${small ? "is-small" : ""} ${inlineLinks ? "has-inline-links" : ""} ${
        variant === "d2c" ? "is-d2c" : ""
      }`}
    >
      {items.map((item) => (
        <figure
          className={`media-card ${item.link ? "has-inline-link" : ""} ${
            item.imageFit === "contain" || item.placeholder ? "is-contain" : ""
          }`}
          key={`${item.label}-${item.image ?? item.placeholder ?? item.hint ?? ""}`}
        >
          <div className={`media-placeholder ${item.placeholder ? "has-generated-placeholder" : ""}`}>
            {item.placeholder === "npm-package" ? (
              <NpmPackagePlaceholder />
            ) : item.image ? (
              <img src={item.image} alt={item.label} />
            ) : (
              <ImageIcon size={34} aria-hidden="true" />
            )}
            {item.link ? (
              <a
                className="media-play-link"
                href={item.link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`播放：${item.link.label}`}
              >
                <Play size={20} aria-hidden="true" />
              </a>
            ) : null}
          </div>
          <figcaption>
            <strong>{item.label}</strong>
            {item.hint ? <span>{item.hint}</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function NpmPackagePlaceholder() {
  return (
    <div className="npm-placeholder" aria-label="未来组件库 npm package 占位示意">
      <div className="npm-window">
        <div className="npm-window-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="npm-package-head">
          <b className="npm-badge">npm</b>
          <div>
            <strong>@vemus/components</strong>
            <span>design tokens + UI components</span>
          </div>
        </div>
        <div className="npm-command">npm install @vemus/components</div>
        <div className="npm-module-grid" aria-hidden="true">
          <span>Button</span>
          <span>Input</span>
          <span>Dialog</span>
          <span>Tabs</span>
        </div>
      </div>
    </div>
  );
}

export default App;
