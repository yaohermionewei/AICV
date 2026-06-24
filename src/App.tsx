import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { iconForExternalLink, slides, type MediaItem, type Slide } from "./slides";

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
        <SlideView slide={activeSlide} index={activeIndex} total={slides.length} />
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

function SlideView({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <article className={`slide slide-${slide.kind}`} key={`${slide.title}-${index}`}>
      <SlideHeader slide={slide} index={index} total={total} />
      {renderSlideBody(slide)}
    </article>
  );
}

function SlideHeader({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  return (
    <header className="slide-header">
      <div>
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1>{slide.title}</h1>
      </div>
      <div className="slide-index" aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>
    </header>
  );
}

function renderSlideBody(slide: Slide) {
  switch (slide.kind) {
    case "hero":
      return <HeroSlide slide={slide} />;
    case "pillars":
    case "closing":
      return <PillarsSlide slide={slide} />;
    case "project-map":
      return <ProjectMapSlide slide={slide} />;
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
        <div className="portrait-caption">
          <span>AI Creator</span>
          <span>Product Designer</span>
        </div>
      </div>
      <StatsGrid stats={slide.stats} />
    </div>
  );
}

function PillarsSlide({ slide }: { slide: Slide }) {
  return (
    <div className="content-grid">
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
              <span>{pillar.proof}</span>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function ProjectMapSlide({ slide }: { slide: Slide }) {
  return (
    <div className="project-map-layout">
      {slide.body ? <p className="lead">{slide.body}</p> : null}
      <div className="project-list">
        {slide.projects?.map((project, index) => (
          <section className="project-row" key={project.title}>
            <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{project.title}</h2>
              <p>{project.time} · {project.role}</p>
            </div>
            <span className="status-pill">{project.status}</span>
            <strong>{project.highlight}</strong>
          </section>
        ))}
      </div>
    </div>
  );
}

function ProjectSlide({ slide }: { slide: Slide }) {
  const Icon = slide.icon;

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
  return (
    <div className="proof-layout">
      <div>
        {slide.body ? <p className="lead">{slide.body}</p> : null}
        <StatsGrid stats={slide.stats} compact />
      </div>
      <MediaGrid media={slide.media} />
    </div>
  );
}

function ReflectionSlide({ slide }: { slide: Slide }) {
  const Icon = slide.icon;

  return (
    <div className="reflection-layout">
      <div className="quote-panel">
        {Icon ? <Icon size={34} aria-hidden="true" /> : null}
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
  return (
    <div className="showcase-layout">
      <div className="intro-column">
        {slide.body ? <p className="lead">{slide.body}</p> : null}
        <TagList tags={slide.tags} />
        <LinkList links={slide.links} dense />
      </div>
      <MediaGrid media={slide.media} />
    </div>
  );
}

function InfluenceSlide({ slide }: { slide: Slide }) {
  return (
    <div className="influence-layout">
      <div className="influence-list">
        <BulletList bullets={slide.bullets} />
        <LinkList links={slide.links} dense />
      </div>
      <MediaGrid media={slide.media} small />
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

function BulletList({ bullets, large = false }: { bullets?: string[]; large?: boolean }) {
  if (!bullets?.length) return null;

  return (
    <ul className={`bullet-list ${large ? "is-large" : ""}`}>
      {bullets.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  );
}

function LinkList({ links, dense = false }: { links?: Slide["links"]; dense?: boolean }) {
  if (!links?.length) return null;

  return (
    <div className={`link-list ${dense ? "is-dense" : ""}`}>
      {links.map((link) => (
        <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
          <ExternalLinkIcon size={17} aria-hidden="true" />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}

function MediaGrid({ media, small = false }: { media?: MediaItem[]; small?: boolean }) {
  const items = useMemo(() => media ?? [], [media]);
  if (!items.length) return null;

  return (
    <div className={`media-grid ${small ? "is-small" : ""}`}>
      {items.map((item) => (
        <figure className="media-card" key={`${item.label}-${item.hint}`}>
          <div className="media-placeholder">
            {item.image ? <img src={item.image} alt={item.label} /> : <ImageIcon size={34} aria-hidden="true" />}
          </div>
          <figcaption>
            <strong>{item.label}</strong>
            <span>{item.hint}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default App;
