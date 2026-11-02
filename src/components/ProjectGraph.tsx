import { useEffect, useRef } from "react";

type Kind = "hub" | "project" | "tech";
type GraphNode = { id: string; x: number; y: number; mx: number; my: number; kind: Kind; color?: string; href?: string; note?: string };

const LIME = "#86c232";
const BLUE = "#4a72e0";
const AMBER = "#e68c0c";

// The edges are real: each one is a technology that project uses.
const NODES: GraphNode[] = [
  { id: "NEXTRIBE", x: 0.5, y: 0.44, mx: 0.52, my: 0.5, kind: "hub", color: LIME, href: "#nextribe", note: "71 pages" },
  { id: "Parsilon Part", x: 0.82, y: 0.34, mx: 0.5, my: 0.84, kind: "hub", color: BLUE, href: "#parsilon", note: "AI assistant" },
  { id: "armap", x: 0.19, y: 0.46, mx: 0.5, my: 0.2, kind: "hub", color: AMBER, href: "#armap", note: "15 languages" },
  { id: "Jetaime", x: 0.74, y: 0.9, mx: 0.93, my: 0.63, kind: "project" },
  { id: "MEVO", x: 0.36, y: 0.08, mx: 0.2, my: 0.41, kind: "project" },
  { id: "Armanly", x: 0.05, y: 0.16, mx: 0.1, my: 0.03, kind: "project" },
  { id: "Belvia", x: 0.24, y: 0.96, mx: 0.95, my: 0.12, kind: "project" },
  { id: "TypeScript", x: 0.56, y: 0.06, mx: 0.07, my: 0.58, kind: "tech" },
  { id: "Next.js", x: 0.68, y: 0.14, mx: 0.1, my: 0.71, kind: "tech" },
  { id: "PostgreSQL", x: 0.62, y: 0.68, mx: 0.66, my: 0.69, kind: "tech" },
  { id: "Prisma", x: 0.86, y: 0.72, mx: 0.93, my: 0.79, kind: "tech" },
  { id: "Claude API", x: 0.66, y: 0.44, mx: 0.36, my: 0.69, kind: "tech" },
  { id: "Node.js", x: 0.28, y: 0.2, mx: 0.1, my: 0.2, kind: "tech" },
  { id: "Unity", x: 0.2, y: 0.04, mx: 0.04, my: 0.33, kind: "tech" },
  { id: "JavaScript", x: 0.06, y: 0.72, mx: 0.56, my: 0.02, kind: "tech" },
  { id: "PWA", x: 0.38, y: 0.76, mx: 0.92, my: 0.36, kind: "tech" },
];

const EDGES: [string, string][] = [
  ["NEXTRIBE", "TypeScript"], ["NEXTRIBE", "Next.js"], ["NEXTRIBE", "PostgreSQL"], ["NEXTRIBE", "Prisma"],
  ["NEXTRIBE", "Claude API"], ["NEXTRIBE", "PWA"],
  ["Parsilon Part", "TypeScript"], ["Parsilon Part", "Next.js"], ["Parsilon Part", "PostgreSQL"],
  ["Parsilon Part", "Prisma"], ["Parsilon Part", "Claude API"],
  ["Jetaime", "TypeScript"], ["Jetaime", "Next.js"], ["Jetaime", "PostgreSQL"],
  ["MEVO", "TypeScript"], ["MEVO", "Node.js"], ["MEVO", "Unity"],
  ["armap", "JavaScript"], ["armap", "Node.js"],
  ["Armanly", "JavaScript"], ["Belvia", "JavaScript"], ["Belvia", "PWA"],
];

const HUBS = NODES.filter((node) => node.kind === "hub");
const PAD_REM = 2.25;

export function ProjectGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<string | null>(null);
  const redrawRef = useRef<() => void>(() => {});

  const setActive = (id: string | null) => {
    activeRef.current = id;
    redrawRef.current();
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    const links = new Map<string, Set<string>>();
    for (const [a, b] of EDGES) {
      if (!links.has(a)) links.set(a, new Set());
      if (!links.has(b)) links.set(b, new Set());
      links.get(a)!.add(b);
      links.get(b)!.add(a);
    }

    let width = 0, height = 0, frame = 0, visible = true;
    let spots = new Map<string, { x: number; y: number }>();

    const place = (t: number) => {
      const portrait = width < 768;
      const pad = PAD_REM * 16;
      spots = new Map(NODES.map((node, i) => {
        const nx = portrait ? node.mx : node.x;
        const ny = portrait ? node.my : node.y;
        const drift = node.kind === "hub" ? 3 : 7;
        return [node.id, {
          x: pad + nx * (width - pad * 2) + Math.sin(t * 0.32 + i * 1.7) * drift,
          y: pad + ny * (height - pad * 2) + Math.cos(t * 0.27 + i * 2.3) * drift,
        }];
      }));
    };

    const draw = (t: number) => {
      place(t);
      const active = activeRef.current;
      const near = active ? links.get(active) : null;
      const scale = Math.min(1, Math.max(0.74, width / 1200));
      ctx.clearRect(0, 0, width, height);

      for (const [a, b] of EDGES) {
        const from = spots.get(a)!, to = spots.get(b)!;
        const lit = active !== null && (a === active || b === active);
        const owner = NODES.find((node) => node.id === (a === active ? a : b === active ? b : a))!;
        ctx.strokeStyle = lit ? owner.color ?? "#ffffff" : "#8592c0";
        ctx.globalAlpha = lit ? 0.95 : active ? 0.1 : 0.3;
        ctx.lineWidth = lit ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      if (!calm.matches) {
        EDGES.forEach(([a, b], i) => {
          if (i % 3 !== 0) return;
          const from = spots.get(a)!, to = spots.get(b)!;
          const k = (t / 4.5 + i * 0.37) % 1;
          ctx.globalAlpha = active ? 0.15 : Math.sin(k * Math.PI) * 0.9;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(from.x + (to.x - from.x) * k, from.y + (to.y - from.y) * k, 2.2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      for (const node of NODES) {
        const { x, y } = spots.get(node.id)!;
        const on = !active || node.id === active || near?.has(node.id);
        ctx.globalAlpha = on ? 1 : 0.28;
        if (node.kind === "hub") {
          const r = (node.id === "NEXTRIBE" ? 30 : 23) * scale;
          ctx.fillStyle = node.color!;
          ctx.globalAlpha *= 0.17;
          ctx.beginPath();
          ctx.arc(x, y, r * (1.55 + Math.sin(t * 0.8 + x) * 0.1), 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = on ? 1 : 0.28;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
        const project = node.kind === "project";
        ctx.fillStyle = project ? "#ffffff" : "#0a1030";
        ctx.strokeStyle = project ? "#ffffff" : "#b4bee4";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(x, y, project ? 6.5 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = project ? "#ffffff" : "#b4bee4";
        ctx.font = project ? '600 14px "Onest Variable", sans-serif' : '400 12px "JetBrains Mono Variable", monospace';
        ctx.textBaseline = "top";
        ctx.textAlign = x < 56 ? "left" : x > width - 56 ? "right" : "center";
        const anchor = x < 56 ? x - 6 : x > width - 56 ? x + 6 : x;
        ctx.fillText(node.id, anchor, y + 12);
      }
      ctx.globalAlpha = 1;
    };

    const clock = () => (calm.matches ? 0 : performance.now() / 1000);
    const loop = () => {
      draw(clock());
      frame = !calm.matches && visible ? requestAnimationFrame(loop) : 0;
    };
    redrawRef.current = () => { if (!frame) draw(clock()); };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(clock());
    };

    const point = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      const px = event.clientX - box.left, py = event.clientY - box.top;
      let best: string | null = null, reach = 44;
      for (const node of NODES) {
        const spot = spots.get(node.id)!;
        const d = Math.hypot(spot.x - px, spot.y - py);
        if (d < reach) { reach = d; best = node.id; }
      }
      if (best !== activeRef.current) setActive(best);
    };
    const leave = () => setActive(null);

    const size = new ResizeObserver(resize);
    size.observe(canvas);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) loop();
    });
    seen.observe(canvas);
    canvas.addEventListener("pointermove", point);
    canvas.addEventListener("pointerdown", point);
    canvas.addEventListener("pointerleave", leave);
    document.fonts?.ready.then(() => draw(clock()));
    return () => {
      cancelAnimationFrame(frame);
      size.disconnect();
      seen.disconnect();
      canvas.removeEventListener("pointermove", point);
      canvas.removeEventListener("pointerdown", point);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="relative h-[38rem] w-full md:h-[32rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,#1b3372,transparent)]" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      {HUBS.map((hub) => (
        <a
          key={hub.id}
          href={hub.href}
          className="hub-pill whitespace-nowrap rounded-lg border bg-navy px-3 py-1.5 font-mono text-[0.8125rem] leading-none text-white transition-colors hover:bg-navy-up"
          style={{ "--x": hub.x, "--y": hub.y, "--mx": hub.mx, "--my": hub.my, borderColor: hub.color } as React.CSSProperties}
          onPointerEnter={() => setActive(hub.id)}
          onPointerLeave={() => setActive(null)}
          onFocus={() => setActive(hub.id)}
          onBlur={() => setActive(null)}
        >
          {hub.id} <span className="text-soft">{hub.note}</span>
        </a>
      ))}
    </div>
  );
}
