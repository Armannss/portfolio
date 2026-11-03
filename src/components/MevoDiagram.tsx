// The MEVO system as it really runs: four programs on three kinds of device.
// Lime dots carry the conductor's movement out; blue dots carry the musicians' state back.

type Box = { x: number; y: number; w: number; h: number; title: string; sub: string; accent?: boolean };

function Node({ x, y, w, h, title, sub, accent }: Box) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={18} fill="#111a45" stroke={accent ? "#86c232" : "#27346a"} strokeWidth={accent ? 2 : 1.5} />
      <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle" className="fill-white text-[17px] font-bold">{title}</text>
      <text x={x + w / 2} y={y + h / 2 + 20} textAnchor="middle" className="fill-soft font-mono text-[12.5px]">{sub}</text>
    </g>
  );
}

function Link({ id, d, label, lx, ly, dashed = false }: { id: string; d: string; label: string; lx: number; ly: number; dashed?: boolean }) {
  return (
    <g>
      <path id={id} d={d} fill="none" stroke="#8592c0" strokeOpacity={0.55} strokeWidth={1.5} strokeDasharray={dashed ? "5 6" : undefined} />
      <text x={lx} y={ly} textAnchor="middle" className="fill-dim font-mono text-[12px]">{label}</text>
    </g>
  );
}

function Flow({ path, color, delay, reverse = false }: { path: string; color: string; delay: number; reverse?: boolean }) {
  return (
    <circle r={5} fill={color} className="mevo-flow">
      <animateMotion dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" keyPoints={reverse ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear">
        <mpath href={`#${path}`} />
      </animateMotion>
    </circle>
  );
}

function Seats({ cx, y }: { cx: number; y: number }) {
  return (
    <g>
      {[-36, -12, 12, 36].map((dx, i) => (
        <circle key={dx} cx={cx + dx} cy={y} r={6} fill={i < 3 ? "#4a72e0" : "none"} stroke="#4a72e0" strokeWidth={1.5} />
      ))}
    </g>
  );
}

export function MevoDiagram() {
  return (
    <figure className="m-0">
      <svg viewBox="0 0 1000 380" className="hidden h-auto w-full md:block" role="img" aria-label="MEVO architecture: the Meta Quest conductor app sends head and hand movement over USB to a streaming device, which sends it to each musician's browser over a WebRTC data channel, with a Fastify server handling signaling.">
        <Link id="w-quest" d="M 250 205 L 400 205" label="USB · TCP" lx={325} ly={192} />
        <Link id="w-rtc" d="M 600 220 C 660 250, 680 285, 720 290" label="WebRTC data channel" lx={628} ly={300} />
        <Link id="w-ws" d="M 600 180 C 650 150, 670 95, 710 85" label="WebSocket" lx={612} ly={128} />
        <Link id="w-sig" d="M 840 125 L 840 235" label="signaling" lx={890} ly={185} dashed />
        <Node x={30} y={150} w={220} h={110} title="Meta Quest" sub="conductor app · Unity" accent />
        <Node x={400} y={150} w={200} h={110} title="Streaming device" sub="bridge · Node.js" />
        <Node x={710} y={40} w={260} h={85} title="Signaling server" sub="web pages, room · Fastify" />
        <Node x={720} y={235} w={250} h={125} title="Musicians' browsers" sub="rehearsal hall · Unity WebGL" />
        <Seats cx={845} y={335} />
        <Flow path="w-quest" color="#86c232" delay={0} />
        <Flow path="w-rtc" color="#86c232" delay={1.1} />
        <Flow path="w-rtc" color="#4a72e0" delay={2.2} reverse />
        <Flow path="w-quest" color="#4a72e0" delay={0.5} reverse />
      </svg>

      <svg viewBox="0 0 360 640" className="h-auto w-full md:hidden" role="img" aria-label="MEVO architecture: the Meta Quest conductor app sends head and hand movement over USB to a streaming device, which sends it to each musician's browser over a WebRTC data channel, with a Fastify server handling signaling.">
        <Link id="m-quest" d="M 120 110 L 120 230" label="USB · TCP" lx={60} ly={175} />
        <Link id="m-rtc" d="M 120 330 L 120 460" label="WebRTC" lx={60} ly={400} />
        <Link id="m-ws" d="M 220 280 C 260 280, 280 300, 280 330" label="WebSocket" lx={300} ly={258} />
        <Link id="m-sig" d="M 280 410 C 280 440, 260 470, 230 480" label="signaling" lx={318} ly={455} dashed />
        <Node x={10} y={10} w={220} h={100} title="Meta Quest" sub="conductor · Unity" accent />
        <Node x={10} y={230} w={210} h={100} title="Streaming device" sub="bridge · Node.js" />
        <Node x={230} y={330} w={125} h={80} title="Server" sub="Fastify" />
        <Node x={10} y={460} w={220} h={150} title="Musicians" sub="browser · Unity WebGL" />
        <Seats cx={120} y={585} />
        <Flow path="m-quest" color="#86c232" delay={0} />
        <Flow path="m-rtc" color="#86c232" delay={1.1} />
        <Flow path="m-rtc" color="#4a72e0" delay={2.2} reverse />
        <Flow path="m-quest" color="#4a72e0" delay={0.5} reverse />
      </svg>

      <figcaption className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-sm text-soft">
        <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-lime" />The conductor's head and hands</span>
        <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-signal" />Musicians' seats, avatars, names and connection quality</span>
      </figcaption>
    </figure>
  );
}
