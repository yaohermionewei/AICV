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
  | "timeline"
  | "pillars"
  | "project-map"
  | "project"
  | "proof"
  | "reflection"
  | "showcase"
  | "influence"
  | "closing"
  | "finale";

export type Stat = {
  value: string;
  label: string;
  note?: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type MediaItem = {
  label: string;
  hint?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  placeholder?: "npm-package";
  link?: LinkItem;
};

export type InfluenceItem = {
  badge: string;
  title: string;
  desc?: string;
  images: string[];
  link?: LinkItem;
};

export type Pillar = {
  icon: LucideIcon;
  title: string;
  body: string;
  proof: string[];
};

export type ProjectCard = {
  title: string;
  time: string;
  role: string;
  note?: string;
  status: string;
  highlight: string;
};

export type TimelineItem = {
  period: string;
  title: string;
  detail?: string[];
  note?: string;
  current?: boolean;
};

export type Slide = {
  kind: SlideKind;
  eyebrow: string;
  title: string;
  variant?: "d2c";
  kicker?: string;
  body?: string;
  tags?: string[];
  stats?: Stat[];
  links?: LinkItem[];
  appStoreHint?: string;
  bullets?: string[];
  influenceItems?: InfluenceItem[];
  pillars?: Pillar[];
  projects?: ProjectCard[];
  timeline?: TimelineItem[];
  media?: MediaItem[];
  quote?: string;
  icon?: LucideIcon;
  image?: string;
  imageLayout?: "web" | "mobile";
  imagePlaceholder?: string;
  avatar?: string;
};

export const slides: Slide[] = [
  {
    kind: "hero",
    eyebrow: "AI PRODUCT EXPERIENCE DESIGN",
    title: "魏瑶 Hermionewei",
    kicker: "工程背景的体验设计师",
    body: "AI 领域持续探索实践、独立开发、Agent 工具设计、探索 D2C。能从创意、体验设计到通过 Vibe Coding 实现上线验证。",
    tags: ["产品体验设计", "Vibe Coding", "Agent工具设计", "D2C探索", "AI视频创作"],
    stats: [
      { value: "6+", label: "主导QQ音乐AI项目" },
      { value: "10+", label: "公司级分享 / 行业文章", note: "各 5+" },
      { value: "30w+", label: "Vibe Coding 作品社媒热度" },
    ],
  },
  {
    kind: "timeline",
    eyebrow: "CAREER PATH",
    title: "从前端工程到Agent体验设计",
    timeline: [
      { period: "2018 年前", title: "香港公司 · 前端开发", note: "in HK" },
      { period: "2018 – 2020", title: "QQ 浏览器 · 直播体验设计" },
      { period: "2020 – 2023", title: "Q 音 · 社交及游戏体验设计" },
      {
        period: "2023 – 至今",
        title: "Agent体验设计·VibeCoding",
        detail: ["Agent工具体验设计", "VibeCoding播放器 & 互动游戏", "长音频 & 车载AI视频工作流"],
        current: true,
      },
    ],
  },
  {
    kind: "closing",
    eyebrow: "WHY ME",
    title: "利用VibeCoding把想法做成可验证的产品体验",
    pillars: [
      {
        icon: PenTool,
        title: "懂AI产品体验设计",
        body: "从场景梳理到方案细节，把复杂的 AI 能力转化为丝滑体验。",
        proof: ["音乐制作Agent工具Vemus", "移动端&Web端"],
      },
      {
        icon: Code2,
        title: "用Vibe Coding全流程闭环",
        body: "用 Codex+Lovart 把创意做成真实可用 web 产品，覆盖设计、开发、部署和反馈回收。",
        proof: ["爆锤音游", "角色卡点播放器"],
      },
      {
        icon: ArrowUpRight,
        title: "输出AI影响力",
        body: "build in public，在社媒反馈中迭代，并分享 AI 可复用知识。",
        proof: ["TME黑客松分享嘉宾", "少数派APP和WaytoAGI文章精选"],
      },
    ],
  },
  {
    kind: "influence",
    eyebrow: "INFLUENCE · 01",
    title: "影响力：AI课程，分享可复用经验",
    influenceItems: [
      {
        badge: "邀请嘉宾",
        title: "TME 2026 产品设计黑客松",
        desc: "受邀分享 Vibe Coding 经验",
        images: ["/assets/imgs/设计周分享嘉宾.png"],
      },
      {
        badge: "内部分享课 ×4",
        title: "TME 内部分享课 4 次：",
        desc: "两次 AI 视频、一次 AI 音乐、一次 Vibe Coding",
        images: [
          "/assets/imgs/tme分享课-ai视频2.png",
          "/assets/imgs/tme分享课-ai音乐.png",
          "/assets/imgs/tme分享课-vibecoding.png",
        ],
      },
    ],
    icon: Trophy,
  },
  {
    kind: "influence",
    eyebrow: "INFLUENCE · 02",
    title: "影响力：文章沉淀与行业认可",
    influenceItems: [
      {
        badge: "实践案例 Top 2",
        title: "TME “AI 主理人”",
        desc: "AI 实践案例分享文章获 Top 2",
        images: ["/assets/imgs/TME“AI主理人”，AI实践案例分享文章获Top2.png"],
      },
      {
        badge: "少数派首页 · WaytoAGI",
        title: "角色卡点播放器文章",
        desc: "登上少数派 APP 首页",
        images: ["/assets/imgs/卡点播放器登上少数派首页.png"],
        link: { label: "少数派 · 卡点播放器", href: "https://sspai.com/post/106050" },
      },
      {
        badge: "设计代表",
        title: "TME “寻找 AI 手艺人”",
        desc: "作为设计代表分享 AI经验技巧",
        images: ["/assets/imgs/ai手艺人.png"],
      },
    ],
    icon: Trophy,
  },
  {
    kind: "project-map",
    eyebrow: "AI BUSINESS PORTFOLIO",
    title: "核心AI项目总览",
    projects: [
      {
        title: "爆锤解压音游",
        time: "2026.04",
        role: "全流程vibecoding：创意/交互/美术/前端",
        status: "可在线体验",
        highlight: "单篇内容10w+曝光，玩家积极晒战报",
      },
      {
        title: "角色卡点播放器",
        time: "2026.01",
        role: "全流程vibecoding：创意/交互/美术/前端",
        status: "开发评审完成",
        highlight: "单篇内容近10w+曝光，用户积极使用并返图",
      },
      {
        title: "Vemus未音·Web端",
        time: "2025.09-2026.02",
        role: "交互设计/UI设计",
        status: "Web端已落地",
        highlight: "无运营仍有日收入800+",
      },
      {
        title: "Vemus未音·移动端",
        time: "2025.6-至今",
        role: "交互设计",
        status: "移动端已落地",
        highlight: "DAU 3w / 收入3.39w",
      },
      {
        title: "车载端AI视频",
        time: "2025.03",
        role: "视频生产工作流搭建",
        note: "沉浸体验沿途风景",
        status: "车载端可体验",
        highlight: "6大流派歌曲实现沉浸体验",
      },
      {
        title: "有声书AI视频",
        time: "2023",
        role: "视频生产工作流搭建",
        status: "Q音线上可体验",
        highlight: "儿童/古诗品类精选专辑视频化",
      },
    ],
  },
  {
    kind: "project",
    eyebrow: "PROJECT 01",
    title: "爆锤解压音游",
    kicker: "通过 Vibe Coding 把创意做成真实可玩的游戏。",
    tags: ["Codex", "Lovart", "Figma", "Playable Web Game"],
    stats: [
      { value: "全链路", label: "覆盖创意构思、交互与美术设计、前端开发、部署和反馈回收迭代" },
      { value: "H5", label: "可落地一起听场景、新歌宣发和游戏feeds流" },
      { value: "10w+", label: "社媒热度高，玩家自发传播晒战报" },
    ],
    links: [{ label: "在线体验", href: "https://bnzhitpig.wystudio.zone/" }],
    image: "/assets/imgs/爆锤音游游戏截图.png",
    icon: Music2,
  },
  {
    kind: "proof",
    eyebrow: "PROJECT 01 · PROOF",
    title: "社媒数据验证：用户录屏分享、晒战报",
    media: [
      {
        label: "单篇热度 10w+",
        image: "/assets/imgs/爆锤音游单笔记10w曝光截图.png",
      },
      {
        label: "玩家高度评价",
        image: "/assets/imgs/爆锤音游玩家分享游戏战报.png",
      },
      {
        label: "晒战报，形成二次传播",
        image: "/assets/imgs/爆锤音游晒战报.png",
      },
    ],
  },
  {
    kind: "reflection",
    eyebrow: "PROJECT 01 · REFLECTION",
    title: "AI提升游戏制作效率，故事设定与情绪价值仍是核心竞争力",
    avatar: "/assets/profile/avatar.png",
    bullets: [
      "艺粉游戏的设计理念是营造[[应援氛围]]。",
      "[[Build in public]]，利用粉丝反馈来优化设计决策。",
      "学会[[控制和管理]]Agent，释放它的潜能。",
    ],
  },
  {
    kind: "project",
    eyebrow: "PROJECT 02",
    title: "角色卡点播放器",
    kicker: "把播放体验做成有角色陪伴，随音乐律动的视觉权益。",
    tags: ["Codex", "Lovart", "Figma", "Music Visualizer"],
    stats: [
      { value: "全链路", label: "覆盖创意构思、交互与美术设计、前端开发、部署和反馈回收迭代" },
      { value: "音画同步", label: "场景和角色随音乐律动\n增强陪伴和沉浸感" },
      { value: "个性化", label: "角色数量随听歌时长增加\n阵列可定制成艺人昵称吸引粉丝" },
    ],
    links: [{ label: "在线体验", href: "https://njzneverdie.wystudio.zone/" }],
    image: "/assets/imgs/角色卡点播放器项目截图.png",
    icon: Sparkles,
  },
  {
    kind: "proof",
    eyebrow: "PROJECT 02 · PROOF",
    title: "社媒数据验证：用户大量好评并返图",
    media: [
      {
        label: "社媒近10w热度",
        image: "/assets/imgs/卡点播放器播放量.png",
      },
      {
        label: "用户好评&返图",
        image: "/assets/imgs/卡点播放器用户返图.png",
      },
    ],
  },
  {
    kind: "reflection",
    eyebrow: "PROJECT 02 · DESIGN AS CODE",
    title: "设计即代码：\n从“反复对齐”到“交付代码”",
    avatar: "/assets/imgs/profile.jpg",
    bullets: [
      "利用Agent制作出[[真实可互动效果]]，降低设计&开发沟通损耗",
      "播放器的价值不只在视觉，更在[[情感陪伴]]",
    ],
  },
  {
    kind: "project",
    eyebrow: "PROJECT 03",
    title: "音乐Agent工具设计\nVemus未音 · Web端",
    kicker: "面向专业音乐创作的Agent平台",
    tags: ["AI Music", "Web Product", "Interaction Design", "UI Design"],
    stats: [
      { value: "双职责", label: "交互 + UI 设计" },
      { value: "画布式", label: "适合资产管理和灵感发散" },
      { value: "800+", label: "无运营情况下每日收入" },
    ],
    links: [{ label: "在线体验", href: "https://y.qq.com/vemus#/" }],
    image: "/assets/imgs/vemus web端截图.png",
    imageLayout: "web",
    icon: Brain,
  },
  {
    kind: "project",
    eyebrow: "PROJECT 04",
    title: "音乐Agent工具设计\nVemus未音 · 移动端",
    kicker: "3周内完成 APP 交互方案，支撑产品顺利上线。",
    tags: ["Mobile App", "AI Music", "Fast Delivery", "Product Launch"],
    stats: [
      { value: "对话式 + 表单式", label: "双路径作歌" },
      { value: "改编 & 换音", label: "歌曲再创作" },
      { value: "3w+", label: "DAU 和日收入" },
    ],
    bullets: [
      "对泛音乐爱好者，需要探索更有趣的社交玩法，带动产品破圈。",
    ],
    appStoreHint: "前往应用商店搜索 Vemus未音",
    image: "/assets/imgs/vemus移动端截图.png",
    imageLayout: "mobile",
    icon: LineChart,
  },
  {
    kind: "reflection",
    eyebrow: "VEMUS REFLECTION",
    title: "把复杂AI作歌能力\n转化为易上手的创作体验",
    avatar: "/assets/profile/avatar.png",
    bullets: [
      "画布式交互与 Chatbot 体验，优化空间受底层能力制约。",
      "通过灵感引导、多路径入口和二创延展，构建低门槛、可持续的 AI 作歌链路。",
      "交互和 UI 双职责，令我的 UI 设计能力有了很大提升。",
    ],
  },
  {
    kind: "showcase",
    variant: "d2c",
    eyebrow: "DESIGN TO CODE",
    title: "Design to Code探索",
    body: "基于 Vemus 设计系统，自发进行 D2C 流程验证，理解设计资产如何结构化转译为组件代码。",
    media: [
      {
        label: "Step 01｜梳理设计系统",
        hint: "覆盖颜色、文字、组件规范等基础资产，为代码生成提供结构化输入",
        image: "/assets/imgs/vemus设计系统.jpg",
        imageFit: "contain",
      },
      {
        label: "Step 02｜用 Codex 生成组件代码",
        hint: "逐一尝试将设计组件转译为前端组件，后续仍需更多真实样例持续校准 AI 输出",
        image: "/assets/imgs/codex生成组件代码.jpg",
        imageFit: "contain",
      },
      {
        label: "Step 03｜组件库打包设想",
        hint: "未来可打包为 npm package，为前端项目复用做准备",
        placeholder: "npm-package",
      },
    ],
    icon: Compass,
  },
  {
    kind: "showcase",
    eyebrow: "AI VIDEO CREATION",
    title: "AI 视频创作：辅助业务进行品牌运营",
    media: [
      {
        label: "Vemus品牌宣传",
        image: "/assets/imgs/vemus品牌宣传.jpg",
        link: {
          label: "Vemus品牌宣传",
          href: "https://www.xiaohongshu.com/discovery/item/690c980c00000000040020bc?source=webshare&xhsshare=pc_web&xsec_token=AB9OD9wm4CPWjsw8S8tVaRgpnLc3trcOmL1lZDvVLhWGw=&xsec_source=pc_share",
        },
      },
      {
        label: "播放器企鹅角色上新",
        image: "/assets/imgs/播放器高雅企鹅.png",
        link: {
          label: "播放器企鹅角色上新",
          href: "https://www.xiaohongshu.com/discovery/item/69182fa60000000004021467?source=webshare&xhsshare=pc_web&xsec_token=ABKTOz3W0nOJlq9ByinPbIBPcTbfhqoeziwbCblx-A48A=&xsec_source=pc_share",
        },
      },
      {
        label: "哪吒皮肤上新",
        image: "/assets/imgs/哪吒来q音上班.png",
        link: {
          label: "哪吒皮肤上新",
          href: "https://www.xiaohongshu.com/discovery/item/67ae0e36000000001800fb81?source=webshare&xhsshare=pc_web&xsec_token=ABgEqgkQtqg1aKUxj0kPSBVesInOcH-xR4o8TqSNgHjVE=&xsec_source=pc_share",
        },
      },
    ],
  },
  {
    kind: "showcase",
    eyebrow: "BRAND CO-CREATION",
    title: "其他品牌共创",
    media: [
      {
        label: "Intel 合作",
        image: "/assets/imgs/intel合作.png",
        link: {
          label: "Intel 合作",
          href: "https://www.xiaohongshu.com/discovery/item/65d876b4000000000b018701?source=webshare&xhsshare=pc_web&xsec_token=ABczOgCOj-R9R3D2bECJJmjhAqO11EIrvNXYCamOI75YQ=&xsec_source=pc_share",
        },
      },
      {
        label: "支付宝合作",
        image: "/assets/imgs/支付宝合作.png",
        link: {
          label: "支付宝合作",
          href: "https://www.xiaohongshu.com/discovery/item/67a4c23b0000000018004353?source=webshare&xhsshare=pc_web&xsec_token=ABoL9L2QBxuE44D_mIYaZBxSot34FAmKQClI4c3A5qRNw=&xsec_source=pc_share",
        },
      },
      {
        label: "混元合作",
        image: "/assets/imgs/混元合作.png",
        link: {
          label: "混元合作",
          href: "https://www.xiaohongshu.com/discovery/item/6752f95d000000000202ddce?source=webshare&xhsshare=pc_web&xsec_token=ABTiy6mrovEK8lk3urEs4xtYuvWHJgrhEVFI9fRYge1cs=&xsec_source=pc_share",
        },
      },
    ],
    icon: Users,
  },
  {
    kind: "finale",
    eyebrow: "FINAL",
    title: "主要在行动\n就是在向前走",
  },
];

export const iconForExternalLink = ExternalLink;
