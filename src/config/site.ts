export const SITE = {
  url: "https://cvbono.vercel.app",
  name: "Bono",
  fullName: "Ku Bon Kwan",
  alias: "Bono",
  role: "Software Engineer",
  title: "Bono — Software Engineer",
  description:
    "Ku Bon Kwan (Bono) — Physics graduate turned software engineer, building reliable, fast web systems in TypeScript, React and Next.js.",
  intro:
    "Prospective mentality, a self-motivator, and a creative and persevering deep problem solver",
  about: [
    "Hi, I'm a Physics graduate turned Software Engineer — I build reliable and scalable web systems with a focus on performance, and the kind of UI details most people don't notice until they're missing.",
    "Check out my projects through the links!",
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
  credits: "Special thanks to YI Jisoo",
} as const;

export const SOCIALS = [
  { name: "GitHub", icon: "github", href: "https://github.com/ipod1g" },
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/bono420/",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/bon-kwan-ku-340082245/",
  },
  { name: "Email", icon: "envelope", href: "mailto:kubonkwan99@gmail.com" },
] as const;

export const NAV = [
  { label: "About", href: "#about-section" },
  { label: "Work", href: "#work-section" },
  { label: "Project", href: "#project-section" },
  { label: "Extra", href: "#extra-section" },
  { label: "Skill", href: "#skill-section" },
] as const;

export const SKILL_GROUPS = [
  { title: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tanstack Start", "Vue", "Astro"],
  },
  {
    title: "Backend & infra",
    items: [
      "Node.js",
      "Cloudflare Workers",
      "AWS",
      "Google Cloud",
      "GitHub Actions",
    ],
  },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { title: "Design & tooling", items: ["Figma", "Storybook"] },
] as const;

export const SPOKEN_LANGUAGES = [
  "English — Native",
  "Korean — Native",
] as const;
