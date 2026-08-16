export const SITE = {
  url: "https://cvbono.vercel.app",
  name: "Bono",
  fullName: "Ku Bon Kwan",
  alias: "Bono",
  role: "Software Engineer",
  title: "Bono",
  description:
    "Ku Bon Kwan (Bono) — Physics graduate turned software engineer, building reliable, fast web systems in TypeScript, React and Next.js.",
  intro:
    "Prospective mentality, a self-motivator, and a creative and persevering deep problem solver",
  about: [
    "Hi, I'm a Physics graduate turned Software Engineer — I build reliable and scalable web systems with a focus on performance, and the kind of UI details most people don't notice until they're missing.",
  ],
  cvUrl:
    "https://docs.google.com/document/d/1iOCAEYbtnJaxwnk-93Wl93FD0sGByxqgnPY7pwAdHWQ/",
  ogImage: "/og.png",
  locale: "en",
  origins: [
    { emoji: "👨‍👩‍👦‍👦", label: "KR" },
    { emoji: "🎒", label: "MY" },
    { emoji: "🎓", label: "HK" },
  ],
  credits: "Special thanks to my wife Lisa",
} as const;

export const SOCIALS = [
  { name: "GitHub", icon: "github", href: "https://github.com/ipod1g" },
  // {
  //   name: "Instagram",
  //   icon: "instagram",
  //   href: "https://www.instagram.com/bono420/",
  // },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/bon-kwan-ku-340082245/",
  },
  { name: "Email", icon: "envelope", href: "mailto:kubonkwan99@gmail.com" },
] as const;

export const NAV = [
  // About has no section of its own — it's the chat bubble inside the hero.
  { label: "Work", href: "#work-section" },
  { label: "Project", href: "#project-section" },
  { label: "Extra", href: "#extra-section" },
  { label: "Skill", href: "#skill-section" },
] as const;

/** `icon` maps to the inline set in SkillsGrid; `color` tints the cluster. */
export const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: "globe",
    color: "#4c82f7",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    title: "Frontend",
    icon: "code",
    color: "#2f9e44",
    items: [
      "React",
      "Next.js",
      "TanStack Start",
      "TanStack Query",
      "Zustand",
      "Vue",
      "Astro",
      "Three.js",
    ],
  },
  {
    title: "Backend",
    icon: "server",
    color: "#f0921f",
    items: ["Node.js", "Cloudflare Workers"],
  },
  {
    title: "Infrastructure",
    icon: "cloud",
    color: "#2ba3d4",
    items: ["AWS", "GCP", "GitHub Actions"],
  },
  {
    title: "Architecture",
    icon: "layers",
    color: "#5560e8",
    items: ["SSR", "Design Systems"],
  },
  {
    title: "Databases",
    icon: "database",
    color: "#7d4f9e",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    title: "Payments",
    icon: "card",
    color: "#e8548f",
    items: ["Stripe", "Adyen", "Square", "Checkout.com"],
  },
  {
    title: "Design & Tooling",
    icon: "pen",
    color: "#14929e",
    items: ["Figma", "Storybook", "Accessibility (WCAG)"],
  },
] as const;

export type SkillIcon = (typeof SKILL_GROUPS)[number]["icon"];

export const SPOKEN_LANGUAGES = [
  "English — Native",
  "Korean — Native",
] as const;
