// Every technology here comes from a project's own code: package.json files, READMEs and source.
// An edge means that project ships with that technology.

export type Category = "language" | "frontend" | "backend" | "ai" | "realtime" | "platform" | "delivery";

export const CATEGORIES: { id: Category; name: string; color: string }[] = [
  { id: "language", name: "Languages", color: "#e3e7f5" },
  { id: "frontend", name: "Frontend", color: "#5b8cff" },
  { id: "backend", name: "Backend and data", color: "#f0a23a" },
  { id: "ai", name: "AI", color: "#86c232" },
  { id: "realtime", name: "Real-time and XR", color: "#b490ff" },
  { id: "platform", name: "Web platform", color: "#3cc6d8" },
  { id: "delivery", name: "Delivery and tooling", color: "#e985bd" },
];

export type Project = { id: string; name: string; anchor: string; color: string; note: string; x: number; y: number };

// x and y place each project in the wide layout; the phone layout swaps them.
export const PROJECTS: Project[] = [
  { id: "mevo", name: "MEVO", anchor: "#mevo", color: "#86c232", note: "Research internship", x: 0.1, y: 0.42 },
  { id: "armap", name: "armap", anchor: "#armap", color: "#e68c0c", note: "Open source", x: 0.27, y: 0.74 },
  { id: "armanly", name: "Armanly", anchor: "#armanly", color: "#3b5bff", note: "Offline English app", x: 0.35, y: 0.24 },
  { id: "belvia", name: "Belvia", anchor: "#belvia", color: "#a88a7c", note: "Order calculator", x: 0.48, y: 0.8 },
  { id: "portfolio", name: "This site", anchor: "#work", color: "#ffffff", note: "Portfolio", x: 0.55, y: 0.32 },
  { id: "jetaime", name: "Jetaime", anchor: "#jetaime", color: "#c4007b", note: "Pastry brand", x: 0.68, y: 0.7 },
  { id: "nextribe", name: "NEXTRIBE", anchor: "#nextribe", color: "#8352dc", note: "Growth platform", x: 0.82, y: 0.3 },
  { id: "parsilon", name: "Parsilon", anchor: "#parsilon", color: "#2f5fb3", note: "Shop with AI", x: 0.9, y: 0.72 },
];

export type Tech = { name: string; category: Category; projects: string[] };

export const TECHS: Tech[] = [
  { name: "TypeScript", category: "language", projects: ["mevo", "portfolio", "jetaime", "nextribe", "parsilon"] },
  { name: "JavaScript", category: "language", projects: ["armap", "armanly", "belvia"] },
  { name: "C#", category: "language", projects: ["mevo"] },
  { name: "HTML", category: "language", projects: ["armanly", "belvia"] },
  { name: "CSS", category: "language", projects: ["armanly", "belvia"] },
  { name: "SQL", category: "language", projects: ["jetaime", "nextribe", "parsilon"] },

  { name: "React", category: "frontend", projects: ["portfolio", "jetaime", "nextribe", "parsilon"] },
  { name: "Next.js", category: "frontend", projects: ["jetaime", "nextribe", "parsilon"] },
  { name: "Tailwind CSS", category: "frontend", projects: ["portfolio", "jetaime", "nextribe", "parsilon"] },
  { name: "Vite", category: "frontend", projects: ["portfolio"] },
  { name: "Three.js", category: "frontend", projects: ["nextribe"] },
  { name: "Canvas", category: "frontend", projects: ["portfolio", "armanly"] },
  { name: "d3-force", category: "frontend", projects: ["portfolio"] },
  { name: "TanStack Table", category: "frontend", projects: ["jetaime"] },
  { name: "RTL layouts", category: "frontend", projects: ["jetaime", "nextribe", "parsilon", "belvia"] },

  { name: "Node.js", category: "backend", projects: ["mevo", "armap", "jetaime", "nextribe", "parsilon"] },
  { name: "Fastify", category: "backend", projects: ["mevo"] },
  { name: "PostgreSQL", category: "backend", projects: ["jetaime", "nextribe", "parsilon"] },
  { name: "Prisma", category: "backend", projects: ["nextribe", "parsilon"] },
  { name: "Drizzle", category: "backend", projects: ["jetaime"] },
  { name: "Zod", category: "backend", projects: ["nextribe", "parsilon"] },
  { name: "JWT", category: "backend", projects: ["nextribe", "parsilon"] },
  { name: "bcrypt", category: "backend", projects: ["parsilon"] },
  { name: "S3 storage", category: "backend", projects: ["nextribe"] },
  { name: "ExcelJS", category: "backend", projects: ["jetaime"] },
  { name: "Telegram Bot API", category: "backend", projects: ["nextribe"] },

  { name: "Claude API", category: "ai", projects: ["nextribe", "parsilon"] },
  { name: "Tool use", category: "ai", projects: ["parsilon"] },
  { name: "Claude Code", category: "ai", projects: ["armap"] },
  { name: "PageRank", category: "ai", projects: ["armap"] },

  { name: "WebRTC", category: "realtime", projects: ["mevo"] },
  { name: "WebSocket", category: "realtime", projects: ["mevo"] },
  { name: "Unity", category: "realtime", projects: ["mevo"] },
  { name: "Meta Quest", category: "realtime", projects: ["mevo"] },
  { name: "WebGL", category: "realtime", projects: ["mevo"] },

  { name: "PWA", category: "platform", projects: ["armanly", "belvia", "nextribe", "parsilon"] },
  { name: "Service Worker", category: "platform", projects: ["armanly", "belvia", "nextribe"] },
  { name: "Web Push", category: "platform", projects: ["nextribe"] },
  { name: "Web Speech", category: "platform", projects: ["armanly"] },
  { name: "Barcode scanning", category: "platform", projects: ["nextribe"] },
  { name: "Local storage", category: "platform", projects: ["armanly", "belvia"] },

  { name: "Vercel", category: "delivery", projects: ["nextribe"] },
  { name: "Docker", category: "delivery", projects: ["nextribe"] },
  { name: "GitHub Pages", category: "delivery", projects: ["portfolio", "armanly", "belvia"] },
  { name: "Turborepo", category: "delivery", projects: ["jetaime"] },
  { name: "Vitest", category: "delivery", projects: ["jetaime"] },
  { name: "Git", category: "delivery", projects: ["mevo", "armap", "armanly", "belvia", "portfolio", "jetaime", "nextribe", "parsilon"] },
];
