import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY, type SimulationLinkDatum, type SimulationNodeDatum } from "d3-force";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, PROJECTS, TECHS, type Category } from "../data/stack";

type GraphNode = SimulationNodeDatum & {
  id: string;
  label: string;
  kind: "project" | "tech";
  color: string;
  radius: number;
  category?: Category;
  anchor?: string;
  note?: string;
  tx: number;
  ty: number;
  phase: number;
};
type GraphLink = SimulationLinkDatum<GraphNode> & { source: GraphNode; target: GraphNode; color: string };

const CATEGORY_COLOR = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.color])) as Record<Category, string>;
const PROJECT_BY_ID = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
const LINK_COUNT = TECHS.reduce((sum, t) => sum + t.projects.length, 0);

type Measure = (text: string, kind: GraphNode["kind"]) => number;

// The box a node needs on screen: its circle plus the label or pill drawn under it.
function box(n: GraphNode, measure: Measure, portrait: boolean) {
  if (portrait && n.kind === "tech" && n.radius <= 7) {
    return { l: n.x! - n.radius - 3, r: n.x! + n.radius + 3, t: n.y! - n.radius - 3, b: n.y! + n.radius + 3 };
  }
  const label = measure(n.label, n.kind) + (n.kind === "project" ? 22 : 8);
  const half = Math.max(n.radius, label / 2);
  const below = n.kind === "project" ? n.radius + 10 + (portrait ? 24 : 27) : n.radius + 5 + (portrait ? 13 : 15);
  return { l: n.x! - half, r: n.x! + half, t: n.y! - n.radius, b: n.y! + below };
}

// Pushes apart any two nodes whose boxes overlap, along the shorter overlap. Projects move less than technologies.
function separate(nodes: GraphNode[], measure: Measure, portrait: boolean, width: number, height: number, pad: number) {
  for (let pass = 0; pass < 220; pass++) {
    let moved = false;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], c = nodes[j];
        const p = box(a, measure, portrait), q = box(c, measure, portrait);
        const ox = Math.min(p.r, q.r) - Math.max(p.l, q.l) + 4;
        const oy = Math.min(p.b, q.b) - Math.max(p.t, q.t) + 4;
        if (ox <= 0 || oy <= 0) continue;
        moved = true;
        const wa = a.kind === "project" ? 0.2 : 0.8, wc = c.kind === "project" ? 0.2 : 0.8;
        const share = wa / (wa + wc);
        if (ox < oy) {
          const dir = a.x! < c.x! ? -1 : 1;
          a.x! += dir * ox * share;
          c.x! -= dir * ox * (1 - share);
        } else {
          const dir = a.y! < c.y! ? -1 : 1;
          a.y! += dir * oy * share;
          c.y! -= dir * oy * (1 - share);
        }
      }
    }
    for (const n of nodes) {
      n.x = Math.max(pad * 0.55, Math.min(width - pad * 0.55, n.x!));
      n.y = Math.max(pad * 0.4, Math.min(height - pad * 0.9, n.y!));
    }
    if (!moved) break;
  }
}

function buildGraph(width: number, height: number, portrait: boolean, measure: Measure) {
  const pad = portrait ? 44 : 70;
  const place = (fx: number, fy: number) => ({
    x: pad + (portrait ? fy : fx) * (width - pad * 2),
    y: pad + (portrait ? fx : fy) * (height - pad * 2),
  });
  const nodes: GraphNode[] = PROJECTS.map((p, i) => {
    const at = place(p.x, p.y);
    const uses = TECHS.filter((t) => t.projects.includes(p.id)).length;
    return { id: p.id, label: p.name, kind: "project", color: p.color, radius: (portrait ? 12 : 15) + uses * (portrait ? 0.45 : 0.6), anchor: p.anchor, note: p.note, tx: at.x, ty: at.y, x: at.x, y: at.y, phase: i * 1.3 };
  });
  for (const [i, t] of TECHS.entries()) {
    const owners = t.projects.map((id) => nodes.find((n) => n.id === id)!);
    const tx = owners.reduce((s, n) => s + n.tx, 0) / owners.length;
    const ty = owners.reduce((s, n) => s + n.ty, 0) / owners.length;
    const spread = 40 + (i % 5) * 9;
    nodes.push({
      id: `t:${t.name}`, label: t.name, kind: "tech", color: CATEGORY_COLOR[t.category], category: t.category,
      radius: 3.5 + t.projects.length * 1.15, tx, ty,
      x: tx + Math.cos(i * 2.4) * spread, y: ty + Math.sin(i * 2.4) * spread, phase: i * 0.77,
    });
  }
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const links: GraphLink[] = TECHS.flatMap((t) => t.projects.map((p) => ({ source: byId[p], target: byId[`t:${t.name}`], color: PROJECT_BY_ID[p].color })));

  const simulation = forceSimulation<GraphNode>(nodes)
    .force("link", forceLink<GraphNode, GraphLink>(links).distance((l) => (l.target.label === "Git" ? 150 : portrait ? 70 : 92)).strength((l) => (l.target.label === "Git" ? 0.04 : 0.32)))
    .force("charge", forceManyBody<GraphNode>().strength((n) => (n.kind === "project" ? (portrait ? -420 : -620) : portrait ? -70 : -110)))
    .force("collide", forceCollide<GraphNode>((n) => (n.kind === "project" ? n.radius + (portrait ? 22 : 30) : n.radius + (portrait ? 14 : n.label.length * 2.9))).strength(0.9))
    .force("x", forceX<GraphNode>((n) => n.tx).strength((n) => (n.kind === "project" ? 0.32 : 0.05)))
    .force("y", forceY<GraphNode>((n) => n.ty).strength((n) => (n.kind === "project" ? 0.32 : 0.05)))
    .stop();
  for (let i = 0; i < 420; i++) {
    simulation.tick();
    for (const n of nodes) {
      n.x = Math.max(pad * 0.55, Math.min(width - pad * 0.55, n.x!));
      n.y = Math.max(pad * 0.45, Math.min(height - pad * 0.45, n.y!));
    }
  }
  separate(nodes, measure, portrait, width, height, pad);
  return { nodes, links, simulation };
}

export function ProjectGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<Category | null>(null);
  const redrawRef = useRef<() => void>(() => {});
  const [filter, setFilter] = useState<Category | null>(null);

  const pick = (category: Category | null) => {
    filterRef.current = category;
    setFilter(category);
    redrawRef.current();
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const tip = tipRef.current!;
    const ctx = canvas.getContext("2d")!;
    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, portrait = false, frame = 0, visible = true;
    const measure: Measure = (text, kind) => {
      ctx.font = kind === "project" ? `700 ${portrait ? 13 : 15}px "Onest Variable", sans-serif` : `500 ${portrait ? 11 : 12}px "JetBrains Mono Variable", monospace`;
      return ctx.measureText(text).width;
    };
    let graph = buildGraph(1, 1, false, measure);
    let hover: GraphNode | null = null, held: GraphNode | null = null, dragging = false;

    const neighbours = (n: GraphNode) => new Set(graph.links.filter((l) => l.source === n || l.target === n).flatMap((l) => [l.source.id, l.target.id]));
    const at = (n: GraphNode, t: number) => {
      const wobble = calm.matches || n === held ? 0 : n.kind === "project" ? 2 : 4;
      return { x: n.x! + Math.sin(t * 0.35 + n.phase) * wobble, y: n.y! + Math.cos(t * 0.3 + n.phase * 1.3) * wobble };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const focus = hover ?? held;
      const near = focus ? neighbours(focus) : null;
      const cat = filterRef.current;
      const inFilter = (n: GraphNode) => !cat || (n.kind === "tech" ? n.category === cat : graph.links.some((l) => l.source === n && l.target.category === cat));
      const lit = (n: GraphNode) => (near ? near.has(n.id) : inFilter(n));

      ctx.lineCap = "round";
      for (const l of graph.links) {
        const a = at(l.source, t), b = at(l.target, t);
        const on = near ? near.has(l.source.id) && near.has(l.target.id) && (l.source === focus || l.target === focus) : inFilter(l.target);
        const isGit = l.target.label === "Git";
        ctx.strokeStyle = l.color;
        ctx.globalAlpha = on ? (focus ? 0.85 : isGit ? 0.1 : 0.32) : 0.05;
        ctx.lineWidth = on && focus ? 1.8 : 1;
        const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.08, my = (a.y + b.y) / 2 - (b.x - a.x) * 0.08;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.stroke();
        if (on && focus && !calm.matches) {
          const k = (t * 0.6 + l.target.phase) % 1;
          const px = (1 - k) * (1 - k) * a.x + 2 * (1 - k) * k * mx + k * k * b.x;
          const py = (1 - k) * (1 - k) * a.y + 2 * (1 - k) * k * my + k * k * b.y;
          ctx.globalAlpha = 1;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(px, py, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const labelAll = !portrait;
      for (const n of graph.nodes) {
        const { x, y } = at(n, t);
        const on = lit(n);
        ctx.globalAlpha = on ? 1 : 0.16;
        if (n.kind === "project") {
          const glow = ctx.createRadialGradient(x, y, n.radius * 0.4, x, y, n.radius * 2.6);
          glow.addColorStop(0, n.color + "66");
          glow.addColorStop(1, n.color + "00");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, n.radius * 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = n.color;
          ctx.beginPath();
          ctx.arc(x, y, n.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.55)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.font = `700 ${portrait ? 13 : 15}px "Onest Variable", sans-serif`;
          const w = ctx.measureText(n.label).width + 22;
          const ly = y + n.radius + 10;
          ctx.fillStyle = "rgba(10,16,48,0.88)";
          ctx.strokeStyle = n.color === "#ffffff" ? "rgba(255,255,255,0.6)" : n.color;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(x - w / 2, ly, w, portrait ? 24 : 27, 8);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(n.label, x, ly + (portrait ? 12.5 : 14));
        } else {
          ctx.fillStyle = "#0a1030";
          ctx.strokeStyle = n.color;
          ctx.lineWidth = n === focus ? 2.6 : 1.6;
          ctx.beginPath();
          ctx.arc(x, y, n.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = n.color;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1.5, n.radius * 0.38), 0, Math.PI * 2);
          ctx.fill();
          const shown = labelAll || (near?.has(n.id) ?? false) || (cat ? n.category === cat : n.radius > 7);
          if (shown) {
            ctx.font = `500 ${portrait ? 11 : 12}px "JetBrains Mono Variable", monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = on ? "#dfe4f5" : "#8592c0";
            ctx.fillText(n.label, x, y + n.radius + 5);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const clock = () => (calm.matches ? 0 : performance.now() / 1000);
    const loop = () => {
      if (held && dragging) graph.simulation.tick();
      draw(clock());
      frame = visible && (!calm.matches || dragging) ? requestAnimationFrame(loop) : 0;
    };
    redrawRef.current = () => { if (!frame) draw(clock()); };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      portrait = width < 768;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      graph = buildGraph(width, height, portrait, measure);
      draw(clock());
    };

    const find = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      const px = event.clientX - box.left, py = event.clientY - box.top;
      let best: GraphNode | null = null, reach = 26;
      for (const n of graph.nodes) {
        const d = Math.hypot(n.x! - px, n.y! - py) - n.radius;
        if (d < reach) { reach = d; best = n; }
      }
      return { node: best, px, py };
    };
    const showTip = (n: GraphNode | null, px = 0, py = 0) => {
      if (!n) { tip.hidden = true; return; }
      const uses = n.kind === "project"
        ? TECHS.filter((t) => t.projects.includes(n.id)).length + " technologies"
        : "Used in " + TECHS.find((t) => t.name === n.label)!.projects.map((p) => PROJECT_BY_ID[p].name).join(", ");
      const kind = n.kind === "project" ? n.note! : CATEGORIES.find((c) => c.id === n.category)!.name;
      tip.replaceChildren();
      const title = document.createElement("b");
      title.textContent = n.label;
      const meta = document.createElement("span");
      meta.textContent = kind;
      const body = document.createElement("span");
      body.textContent = n.kind === "project" ? `${uses}. Open the case study.` : uses;
      tip.append(title, meta, body);
      tip.style.setProperty("--tip-x", `${Math.min(Math.max(px, 120), width - 120)}px`);
      tip.style.setProperty("--tip-y", `${py}px`);
      tip.style.borderColor = n.color;
      tip.hidden = false;
    };

    const move = (event: PointerEvent) => {
      if (held && dragging) {
        const box = canvas.getBoundingClientRect();
        held.fx = event.clientX - box.left;
        held.fy = event.clientY - box.top;
        showTip(held, held.fx, held.fy);
        return;
      }
      const { node, px, py } = find(event);
      canvas.style.cursor = node ? (node.kind === "project" ? "pointer" : "grab") : "default";
      if (node !== hover) { hover = node; redrawRef.current(); }
      showTip(node, px, py);
    };
    const down = (event: PointerEvent) => {
      const { node, px, py } = find(event);
      if (event.pointerType !== "mouse") {
        hover = null;
        held = node === held ? null : node;
        showTip(held, px, py);
        redrawRef.current();
        return;
      }
      if (!node) return;
      held = node;
      dragging = false;
      canvas.setPointerCapture(event.pointerId);
      const startX = event.clientX, startY = event.clientY;
      const watch = (e: PointerEvent) => {
        if (!dragging && Math.hypot(e.clientX - startX, e.clientY - startY) > 4) {
          dragging = true;
          canvas.style.cursor = "grabbing";
          graph.simulation.alpha(0.3).alphaTarget(0.12);
          if (!frame) loop();
        }
      };
      canvas.addEventListener("pointermove", watch);
      canvas.addEventListener("pointerup", () => {
        canvas.removeEventListener("pointermove", watch);
        if (!dragging && node.anchor) document.querySelector(node.anchor)?.scrollIntoView({ behavior: calm.matches ? "auto" : "smooth" });
        if (held) { held.fx = null; held.fy = null; }
        graph.simulation.alphaTarget(0);
        held = null;
        dragging = false;
        redrawRef.current();
      }, { once: true });
    };
    const leave = () => { if (!dragging) { hover = null; showTip(null); redrawRef.current(); } };

    const size = new ResizeObserver(resize);
    size.observe(canvas);
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) loop();
    });
    seen.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointerleave", leave);
    document.fonts?.ready.then(resize);
    return () => {
      cancelAnimationFrame(frame);
      size.disconnect();
      seen.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section aria-labelledby="stack-title" className="stack-map relative">
      <div className="wrap flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div className="grid gap-2">
          <h2 id="stack-title" className="text-2xl font-extrabold tracking-tight md:text-3xl">The stack behind the work</h2>
          <p className="text-soft">
            {PROJECTS.length} projects, {TECHS.length} technologies, {LINK_COUNT} connections. Hover or tap a node to trace it, drag to rearrange, or pick a group.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Highlight a group of technologies">
          <button type="button" aria-pressed={filter === null} onClick={() => pick(null)} className="stack-chip">All</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" aria-pressed={filter === c.id} onClick={() => pick(filter === c.id ? null : c.id)} className="stack-chip">
              <i style={{ background: c.color }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-2 h-[54rem] w-full md:h-[42rem]">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full touch-pan-y" />
        <div ref={tipRef} hidden className="stack-tip" role="status" />
      </div>
      <ul className="sr-only">
        {PROJECTS.map((p) => (
          <li key={p.id}>
            <a href={p.anchor}>{p.name}</a>: {TECHS.filter((t) => t.projects.includes(p.id)).map((t) => t.name).join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
