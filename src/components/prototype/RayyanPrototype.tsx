/**
 * THROWAWAY PROTOTYPE: Can a portrait-led menu and work gallery bring Rayyan's
 * energy to Bono's existing theme? Three layouts on /, selected by ?variant=A|B|C.
 * Main reference: https://rayyan.theloopboard.com/
 */
import { useCallback, useEffect, useState } from "react";
import { SITE, SOCIALS } from "@/config/site";
import PrototypeSwitcher, { type PrototypeVariant } from "./PrototypeSwitcher";

interface Props {
  portraitSrc: string;
  projects: { title: string; thumbnail: string | null; monogram: string }[];
}

const chapters = [
  { label: "Work", detail: "The experience so far", href: "#work-section" },
  { label: "Projects", detail: "Things I've put into the world", href: "#project-section" },
  { label: "Beyond", detail: "A little outside the day job", href: "#extra-section" },
  { label: "Skills", detail: "Tools of the trade", href: "#skill-section" },
];

function ChapterLink({ chapter, index }: { chapter: typeof chapters[number]; index: number }) {
  return <a className="prototype-chapter" href={chapter.href}>
    <span className="prototype-chapter__number">0{index + 1}</span>
    <span><strong>{chapter.label}</strong><small>{chapter.detail}</small></span>
    <span className="prototype-chapter__arrow" aria-hidden="true">↗</span>
  </a>;
}

function Portrait({ src }: { src: string }) {
  return <div className="prototype-portrait">
    <span className="prototype-portrait__disc" aria-hidden="true" />
    <span className="prototype-portrait__cross" aria-hidden="true">+</span>
    <img src={src} width={640} height={800} alt={`Aerial portrait of ${SITE.fullName}`} fetchPriority="high" />
    <span className="prototype-portrait__caption">FIG. 01 — THE HUMAN BEHIND THE CODE</span>
  </div>;
}

function Header() {
  return <header className="prototype-header">
    <a href="#hero-section" className="prototype-wordmark" aria-label="Bono, back to top">b<span>·</span>k</a>
    <span className="prototype-micro">{SITE.role} <span className="prototype-separator">/</span> Independent mind.</span>
    <a className="prototype-contact" href={SOCIALS.find(s => s.name === "Email")!.href}>Let's talk <span aria-hidden="true">↗</span></a>
  </header>;
}

export function VariantA({ portraitSrc }: Props) {
  return <div className="prototype-stage prototype-stage--a">
    <div className="prototype-backword" aria-hidden="true">BONO</div>
    <div className="prototype-identity">
      <p className="prototype-micro">Physics mind. Engineer by craft.</p>
      <h1 id="hero-name">Bono<br />Ku<span className="prototype-name-dot">●</span></h1>
      <p className="prototype-name-note">KU BON KWAN / SOFTWARE ENGINEER</p>
    </div>
    <Portrait src={portraitSrc} />
    <nav className="prototype-chapters" aria-label="Explore the portfolio">
      {chapters.map((chapter, index) => <ChapterLink key={chapter.href} chapter={chapter} index={index} />)}
    </nav>
    <div className="prototype-stage-foot">
      <p>Reliable systems.<br /><span>Unexpected details.</span></p>
      <a className="prototype-resume" href={SITE.cvUrl} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
      <a href="#work-section" className="prototype-micro">SELECT A CHAPTER <span aria-hidden="true">↓</span></a>
    </div>
  </div>;
}

export function VariantB({ portraitSrc }: Props) {
  return <div className="prototype-stage prototype-stage--b">
    <div className="prototype-editorial-copy">
      <p className="prototype-micro">01 / A DIFFERENT WAY OF THINKING</p>
      <h1 id="hero-name">Physics<br />to <em>pixels.</em></h1>
      <p className="prototype-bio">I'm Bono Ku. A software engineer building reliable web systems, with an eye for the details that make them feel human.</p>
      <a className="prototype-primary-link" href="#project-section">See what I've built <span aria-hidden="true">↗</span></a>
      <a className="prototype-text-link" href={SITE.cvUrl} target="_blank" rel="noreferrer">Read my résumé ↗</a>
    </div>
    <div className="prototype-editorial-art"><span className="prototype-art-name" aria-hidden="true">BONO KU</span><Portrait src={portraitSrc} /><span className="prototype-art-label">ENGINEERING / CURIOSITY / CRAFT</span></div>
    <nav className="prototype-chapter-strip" aria-label="Portfolio chapters">{chapters.map((chapter, index) => <a href={chapter.href} key={chapter.href}><small>0{index + 1}</small><span>{chapter.label}</span><span aria-hidden="true">↗</span></a>)}</nav>
  </div>;
}

export function VariantC({ portraitSrc, projects }: Props) {
  return <div className="prototype-stage prototype-stage--c">
    <aside className="prototype-profile-index">
      <div className="prototype-small-portrait"><img src={portraitSrc} alt={SITE.fullName} width={140} height={170} /></div>
      <p className="prototype-micro">THE PERSON</p>
      <h1 id="hero-name">Bono Ku<span>Software Engineer</span></h1>
      <p>Physics graduate.<br />Perpetually curious.<br />Built for the details.</p>
      <nav aria-label="Portfolio index">{chapters.map((chapter, index) => <ChapterLink key={chapter.href} chapter={chapter} index={index} />)}</nav>
      <a className="prototype-text-link" href={SITE.cvUrl} target="_blank" rel="noreferrer">Résumé ↗</a>
    </aside>
    <div className="prototype-work-preview">
      <div className="prototype-preview-heading"><h2>Made with<br /><em>intent.</em></h2><p className="prototype-micro">SELECTED PROJECTS<br />IDEA → INTERFACE</p></div>
      <div className="prototype-preview-grid">{projects.slice(0,3).map((project, index) => <a href="#project-section" key={project.title} className="prototype-preview-card">
        <div>{project.thumbnail ? <img src={project.thumbnail} alt="" /> : <span className="prototype-monogram">{project.monogram}</span>}</div>
        <span><small>0{index + 1}</small>{project.title}<b aria-hidden="true">↗</b></span>
      </a>)}</div>
      <a className="prototype-primary-link" href="#project-section">Explore all projects ↗</a>
    </div>
  </div>;
}

export default function RayyanPrototype(props: Props) {
  const [variant, setVariant] = useState<PrototypeVariant>("A");
  const changeVariant = useCallback((next: PrototypeVariant) => {
    setVariant(next);
    const url = new URL(location.href);
    url.searchParams.set("variant", next);
    history.replaceState(null, "", url);
    document.documentElement.dataset.prototypeVariant = next;
    document.getElementById("hero-section")?.scrollIntoView({ behavior: "instant" });
  }, []);

  useEffect(() => {
    const read = () => {
      const selected = new URLSearchParams(location.search).get("variant");
      const next = selected === "B" || selected === "C" ? selected : "A";
      setVariant(next);
      document.documentElement.dataset.prototypeVariant = next;
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  return <div className="rayyan-prototype" data-variant={variant}>
    <Header />
    <div key={variant} className="prototype-variant-arrival">
      {variant === "A" ? <VariantA {...props} /> : variant === "B" ? <VariantB {...props} /> : <VariantC {...props} />}
    </div>
    <div className="prototype-about-line"><span className="prototype-micro">A LITTLE CONTEXT</span><p>{SITE.about[0]}</p><span aria-hidden="true">↙</span></div>
    <PrototypeSwitcher current={variant} onChange={changeVariant} />
  </div>;
}
