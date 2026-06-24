import {
  ArrowUpRight,
  Brain,
  Clapperboard,
  Code2,
  Compass,
  ExternalLink,
  LineChart,
  Music2,
  PenTool,
  Sparkles,
  Trophy,
  Users,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SlideKind =
  | "hero"
  | "pillars"
  | "project-map"
  | "project"
  | "proof"
  | "reflection"
  | "showcase"
  | "influence"
  | "closing";

export type Stat = {
  value: string;
  label: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type MediaItem = {
  label: string;
  hint: string;
  image?: string;
};

export type Pillar = {
  icon: LucideIcon;
  title: string;
  body: string;
  proof: string;
};

export type ProjectCard = {
  title: string;
  time: string;
  role: string;
  status: string;
  highlight: string;
};

export type Slide = {
  kind: SlideKind;
  eyebrow: string;
  title: string;
  kicker?: string;
  body?: string;
  tags?: string[];
  stats?: Stat[];
  links?: LinkItem[];
  bullets?: string[];
  pillars?: Pillar[];
  projects?: ProjectCard[];
  media?: MediaItem[];
  quote?: string;
  icon?: LucideIcon;
};

export const slides: Slide[] = [
  {
    kind: "hero",
    eyebrow: "AI PRODUCT EXPERIENCE DESIGN",
    title: "魏瑶 Hermionewei",
    kicker: "计算机背景的产品体验设计师",
    body: "AI 领域创作者、实践者：独立开发、探索 D2C、AI 视频创作。能从创意、体验、设计到 Vibe Coding 与上线验证完成闭环。",
    tags: ["产品体验设计", "Vibe Coding", "AI 视频创作", "从 0 到上线"],
    stats: [
      { value: "5", label: "AI 业务项目" },
      { value: "3w", label: "Vemus 移动端 DAU" },
      { value: "10w+", label: "社媒单篇录屏反馈" },
    ],
  },
  {
    kind: "pillars",
    eyebrow: "CAPABILITY MAP",
    title: "我希望面试官先记住三件事",
    body: "不是把 AI 当效率工具，而是把它放进产品定义、设计表达、实现验证和内容传播的完整链路里。",
    pillars: [
      {
        icon: PenTool,
        title: "AI 产品体验设计",
        body: "负责 Vemus Web / 移动端交互和 UI，在真实业务中处理创作者工具、Agent 对话和音乐生产场景。",
        proof: "从用户分析、框架到细节输出，支撑产品上线。",
      },
      {
        icon: Code2,
        title: "Vibe Coding 独立实现",
        body: "用 Codex、Lovart、Figma 把创意做成可体验 Web Demo，覆盖设计、开发、部署和反馈回收。",
        proof: "爆锤音游、卡点播放器均已线上可访问。",
      },
      {
        icon: Clapperboard,
        title: "AI 内容与影响力",
        body: "持续实践 Sora、即梦、可灵、Pika、Vidu 等视频工具，并形成品牌运营、共创和内部分享影响力。",
        proof: "少数派首页 / 编辑精选、TME 内部分享与案例 Top2。",
      },
    ],
  },
  {
    kind: "project-map",
    eyebrow: "AI BUSINESS PORTFOLIO",
    title: "AI 业务项目总览",
    body: "项目不是孤立作品，而是一条从早期生成式工作流探索，到 AI 音乐产品，再到可传播互动体验的实践曲线。",
    projects: [
      {
        title: "爆锤解压音游",
        time: "2026.04",
        role: "创意 / 交互 / 美术 / 前端 / 部署",
        status: "线上可体验",
        highlight: "单篇录屏笔记 10w+",
      },
      {
        title: "角色卡点播放器",
        time: "2026.01",
        role: "创意 / 交互 / 前端 / 部署",
        status: "开发评审完成",
        highlight: "录屏笔记近 10w+",
      },
      {
        title: "Vemus 未音 Web 端",
        time: "2025.09 - 2026.02",
        role: "交互设计 / UI 设计",
        status: "已落地",
        highlight: "半年无更新仍有日收入",
      },
      {
        title: "Vemus 未音移动端",
        time: "2025.09 - 至今",
        role: "交互设计",
        status: "应用商店可体验",
        highlight: "DAU 3w / 收入 3.39w",
      },
      {
        title: "长音频视频化",
        time: "2023",
        role: "视频化生产工作流搭建",
        status: "落地儿童 / 古诗品类",
        highlight: "Stable Diffusion 早期实践",
      },
    ],
  },
  {
    kind: "project",
    eyebrow: "PROJECT 01",
    title: "爆锤解压音游",
    kicker: "把一个情绪化、可传播的创意，做成真实可玩的 Web 游戏。",
    body: "2026.04，完整覆盖创意构思、交互与美术设计、前端开发、部署、社媒用户反馈回收。计划落地于一起听场景、游戏 feeds 流和新歌宣发 H5 活动。",
    tags: ["Codex", "Lovart", "Figma", "Playable Web Game"],
    stats: [
      { value: "10w+", label: "单篇录屏笔记" },
      { value: "全链路", label: "从创意到反馈回收" },
      { value: "H5", label: "可落地活动场景" },
    ],
    links: [{ label: "体验项目", href: "https://bnzhitpig.wystudio.zone/" }],
    icon: Music2,
  },
  {
    kind: "proof",
    eyebrow: "PROJECT 01 · PROOF",
    title: "社媒传播证明：用户愿意录屏、转发、晒战报",
    body: "这个项目最重要的验证不是页面是否完成，而是目标用户是否愿意把它当成情绪表达和社交素材继续传播。",
    media: [
      {
        label: "录屏笔记截图",
        hint: "后续替换：10w+ 社媒笔记证明",
        image: "/assets/imgs/爆锤音游单笔记10w曝光截图.png",
      },
      {
        label: "玩家战报",
        hint: "后续替换：用户分享战报截图",
        image: "/assets/imgs/爆锤音游玩家分享游戏战报.png",
      },
      {
        label: "晒战报",
        hint: "玩家晒出游戏战报，形成二次传播",
        image: "/assets/imgs/爆锤音游晒战报.png",
      },
    ],
    stats: [
      { value: "10w+", label: "单篇录屏笔记" },
      { value: "UGC", label: "玩家自发返图" },
      { value: "传播", label: "游戏结果可被分享" },
    ],
  },
  {
    kind: "reflection",
    eyebrow: "PROJECT 01 · REFLECTION",
    title: "AI 让制作变快，但买单理由仍来自创意和审美",
    quote: "通过 Codex，可以非常方便生成游戏帧动画并制作成真实可玩游戏；最大壁垒在于美术与创意设计，需要让目标玩家对游戏设定买单。",
    bullets: [
      "可玩 Demo 的门槛下降，设计师可以更早进入“真实反馈”阶段。",
      "AI 不是替代创意判断，而是放大创意验证速度。",
      "小游戏的核心不是技术完成度，而是角色、情绪、反馈和分享动机是否成立。",
    ],
    icon: WandSparkles,
  },
  {
    kind: "project",
    eyebrow: "PROJECT 02",
    title: "角色卡点播放器",
    kicker: "把音乐播放体验做成有角色、有节奏、有购买理由的视觉权益。",
    body: "2026.01，完整覆盖创意构思、交互设计、前端开发、部署、社媒用户反馈回收。计划落地于横屏播放器，作为会员或单条购买权益，已完成开发评审，因人力问题 hold。",
    tags: ["Codex", "Lovart", "Figma", "Music Visualizer"],
    stats: [
      { value: "近 10w+", label: "录屏笔记" },
      { value: "会员权益", label: "潜在商业化场景" },
      { value: "已评审", label: "完成开发评审" },
    ],
    links: [{ label: "体验项目", href: "https://njzneverdie.wystudio.zone/" }],
    icon: Sparkles,
  },
  {
    kind: "reflection",
    eyebrow: "PROJECT 02 · DESIGN AS CODE",
    title: "设计即代码：从“沟通效果”到“直接做出效果”",
    quote: "过去这类可视化效果，需要视觉在 3D 软件里实现后开发来回对齐沟通；现通过 agent，设计师可以直接把效果制作出来。",
    bullets: [
      "把想法从静态稿推进到可运行体验，降低跨职能沟通损耗。",
      "播放器的价值不只在视觉包装，而是为音乐消费场景增加角色陪伴和节奏反馈。",
      "Demo 先于排期完成，让团队可以围绕真实体验讨论商业化与开发投入。",
    ],
    media: [
      {
        label: "播放器录屏",
        hint: "后续替换：角色卡点播放器动效截图",
        image: "/assets/imgs/卡点播放器播放量.png",
      },
      {
        label: "用户返图",
        hint: "后续替换：返图 / 评论截图",
        image: "/assets/imgs/卡点播放器用户返图.png",
      },
    ],
    icon: Code2,
  },
  {
    kind: "project",
    eyebrow: "PROJECT 03",
    title: "Vemus 未音 · Web 端",
    kicker: "面向 AI 音乐创作的 Web 产品体验设计。",
    body: "2025.09 - 2026.02，负责交互设计和 UI 设计。业务较少资源投入市场运营、声量不高，但半年无更新和运营，每天仍然有 800 左右收入。",
    tags: ["AI Music", "Web Product", "Interaction Design", "UI Design"],
    stats: [
      { value: "800", label: "半年无运营日收入左右" },
      { value: "双职责", label: "交互 + UI 设计" },
      { value: "已落地", label: "线上可访问" },
    ],
    links: [{ label: "查看产品", href: "https://y.qq.com/vemus#/" }],
    icon: Brain,
  },
  {
    kind: "project",
    eyebrow: "PROJECT 04",
    title: "Vemus 未音 · 移动端",
    kicker: "两周内完成 APP 交互方案，支撑产品顺利上线。",
    body: "2025.09 至今，负责交互设计。去年项目启动后，需要在两周内完成整个 APP 交互方案：从竞品、用户分析到框架和细节输出，保证产品顺利上线。",
    tags: ["Mobile App", "AI Music", "Fast Delivery", "Product Launch"],
    stats: [
      { value: "3w", label: "DAU" },
      { value: "3.39w", label: "收入" },
      { value: "32%", label: "次留" },
    ],
    bullets: [
      "对专业创作者，需要继续提升做歌 Agent 底层能力。",
      "对泛音乐爱好者，需要探索更有趣的社交玩法，带动产品破圈。",
    ],
    icon: LineChart,
  },
  {
    kind: "reflection",
    eyebrow: "PROJECT 05",
    title: "长音频视频化：在蛮荒时代就开始探索 AI 工作流",
    body: "2023 年，负责视频化内容生产工作流搭建，基于 Stable Diffusion，落地于长音频儿童、古诗品类。",
    quote: "AI 图片生成的 SD 年代，还需要搭配 LoRA 调试各种参数。当时的工作流早已被淘汰，但自驱力和解决问题的能力是一脉相承的。",
    bullets: [
      "从早期 SD / LoRA 参数调试开始，理解生成式工具的能力边界。",
      "关注的不是某个工具本身，而是如何把它组织成稳定内容生产流程。",
      "这条经验延续到后来的 AI 视频、AI 音乐和 Vibe Coding 项目中。",
    ],
    icon: Compass,
  },
  {
    kind: "showcase",
    eyebrow: "AI VIDEO CREATION",
    title: "AI 视频创作：从品牌运营到产品表达",
    body: "围绕 Vemus、Q 音和品牌合作，持续把新的视频生成工具转化为可传播内容。",
    media: [
      { label: "Vemus 品牌宣传短片", hint: "Sora · 后续替换作品截图" },
      { label: "播放器高雅企鹅陪伴小人", hint: "即梦动作模仿 · 后续替换作品截图" },
      { label: "哪吒皮肤上线 Q 音", hint: "可灵 / Pika / Vidu · 后续替换作品截图" },
    ],
    links: [
      {
        label: "Vemus 品牌宣传短片",
        href: "https://www.xiaohongshu.com/discovery/item/690c980c00000000040020bc?source=webshare&xhsshare=pc_web&xsec_token=AB9OD9wm4CPWjsw8S8tVaRgpnLc3trcOmL1lZDvVLhWGw=&xsec_source=pc_share",
      },
      {
        label: "企鹅陪伴小人",
        href: "https://www.xiaohongshu.com/discovery/item/69182fa60000000004021467?source=webshare&xhsshare=pc_web&xsec_token=ABKTOz3W0nOJlq9ByinPbIBPcTbfhqoeziwbCblx-A48A=&xsec_source=pc_share",
      },
      {
        label: "哪吒皮肤上线",
        href: "https://www.xiaohongshu.com/discovery/item/67ae0e36000000001800fb81?source=webshare&xhsshare=pc_web&xsec_token=ABgEqgkQtqg1aKUxj0kPSBVesInOcH-xR4o8TqSNgHjVE=&xsec_source=pc_share",
      },
    ],
    tags: ["Sora", "即梦", "可灵", "Pika", "Vidu"],
  },
  {
    kind: "showcase",
    eyebrow: "BRAND CO-CREATION",
    title: "其他品牌共创：把 AI 内容能力带到更广的表达场景",
    body: "除自有业务外，也参与 Intel、蚂蚁科技、混元等品牌共创，把 AI 视频创作能力应用到不同品牌语境中。",
    media: [
      { label: "Intel 合作", hint: "后续替换：合作内容截图" },
      { label: "蚂蚁科技", hint: "后续替换：合作内容截图" },
      { label: "混元", hint: "后续替换：合作内容截图" },
    ],
    links: [
      {
        label: "Intel 合作",
        href: "https://www.xiaohongshu.com/discovery/item/65d876b4000000000b018701?source=webshare&xhsshare=pc_web&xsec_token=ABczOgCOj-R9R3D2bECJJmjhAqO11EIrvNXYCamOI75YQ=&xsec_source=pc_share",
      },
      {
        label: "蚂蚁科技",
        href: "https://www.xiaohongshu.com/discovery/item/67a4c23b0000000018004353?source=webshare&xhsshare=pc_web&xsec_token=ABoL9L2QBxuE44D_mIYaZBxSot34FAmKQClI4c3A5qRNw=&xsec_source=pc_share",
      },
      {
        label: "混元",
        href: "https://www.xiaohongshu.com/discovery/item/6752f95d000000000202ddce?source=webshare&xhsshare=pc_web&xsec_token=ABTiy6mrovEK8lk3urEs4xtYuvWHJgrhEVFI9fRYge1cs=&xsec_source=pc_share",
      },
    ],
    icon: Users,
  },
  {
    kind: "influence",
    eyebrow: "INFLUENCE",
    title: "影响力：从实践到可复用的方法分享",
    body: "持续把 AI 产品、AI 音乐、AI 视频和 Vibe Coding 的实践沉淀为文章、课程和内部分享。",
    bullets: [
      "卡点播放器总结文章登上少数派 APP 首页，并被 WaytoAGI 社区转载。",
      "AI 音乐产品洞察登上少数派 APP 编辑精选，并被 WaytoAGI 社区转载。",
      "TME 内部分享课 4 次：两次 AI 视频、一次 AI 音乐、一次 Vibe Coding。",
      "TME 2026 产品设计黑客松，作为邀请嘉宾分享 Vibe Coding 经验。",
      "TME “寻找 AI 手艺人”，作为设计代表分享 AI 对工作、生活的帮助。",
      "TME “AI 主理人”，AI 实践案例分享文章获 Top2。",
    ],
    links: [
      { label: "少数派 · 卡点播放器", href: "https://sspai.com/post/106050" },
      { label: "少数派 · AI 音乐产品洞察", href: "https://sspai.com/post/92435" },
    ],
    media: [
      {
        label: "分享现场",
        hint: "后续替换：TME 内部分享 / 黑客松图片",
        image: "/assets/imgs/设计周分享嘉宾.png",
      },
      {
        label: "文章收录",
        hint: "后续替换：少数派 / WaytoAGI 截图",
        image: "/assets/imgs/TME“AI主理人”，AI实践案例分享文章获Top2.png",
      },
    ],
    icon: Trophy,
  },
  {
    kind: "closing",
    eyebrow: "WHY ME",
    title: "我能把 AI 想法做成可以被验证的产品体验",
    body: "如果面试官只带走三个判断，我希望是：懂产品体验、能用 AI 把想法做出来、能用真实反馈验证价值。",
    pillars: [
      {
        icon: PenTool,
        title: "懂产品体验",
        body: "能从用户、场景、框架到细节，把复杂的 AI 能力翻译成可使用的体验。",
        proof: "Vemus Web / 移动端真实业务落地。",
      },
      {
        icon: Code2,
        title: "能自己做出来",
        body: "不止输出方案，也能用 AI 工具完成设计、开发、部署和迭代验证。",
        proof: "爆锤音游、角色卡点播放器线上可体验。",
      },
      {
        icon: ArrowUpRight,
        title: "用反馈证明价值",
        body: "关注真实用户、社媒传播、商业化可能和团队落地，而不是停留在概念稿。",
        proof: "10w+ 传播反馈、DAU / 收入数据、内部外部影响力。",
      },
    ],
  },
];

export const iconForExternalLink = ExternalLink;
