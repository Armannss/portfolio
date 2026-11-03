import { useState } from "react";
import { MevoDiagram } from "./components/MevoDiagram";
import { ProjectGraph } from "./components/ProjectGraph";
import { STATUS_BARS } from "./statusBars";

const base = import.meta.env.BASE_URL;
const GITHUB = "https://github.com/Armannss";
const LINKEDIN = "https://www.linkedin.com/in/arman-naseri-far-5773b3341/";

function StatusBar({ light, background }: { light: boolean; background: string }) {
  return (
    <div className={`iphone-status ${light ? "text-white" : "text-black"}`} style={{ background }} aria-hidden="true">
      <span>9:41</span>
      <svg viewBox="0 0 68 13" fill="currentColor">
        <rect x="0" y="9" width="3" height="4" rx="1" />
        <rect x="5" y="6" width="3" height="7" rx="1" />
        <rect x="10" y="3" width="3" height="10" rx="1" />
        <rect x="15" y="0" width="3" height="13" rx="1" />
        <path d="M33 2.2c2.5 0 4.8 1 6.5 2.6l1.1-1.2A11 11 0 0 0 33 .5a11 11 0 0 0-7.6 3.1l1.1 1.2A9.300 9.300 0 0 1 33 2.200Z" />
        <path d="M33 6.200c1.400 0 2.700.5 3.700 1.500l1.100-1.200A7 7 0 0 0 33 4.500a7 7 0 0 0-4.800 2l1.100 1.200a5.300 5.300 0 0 1 3.700-1.500Z" />
        <path d="M33 8.500c-.9 0-1.700.4-2.300.9L33 12l2.300-2.600c-.6-.5-1.400-.9-2.300-.9Z" />
        <rect x="46.500" y=".5" width="18" height="12" rx="3.500" fill="none" stroke="currentColor" strokeOpacity=".4" />
        <rect x="48" y="2" width="15" height="9" rx="2.200" />
        <path d="M66 4.500v4c.8-.3 1.500-1.100 1.500-2s-.7-1.700-1.500-2Z" fillOpacity=".5" />
      </svg>
    </div>
  );
}

type PhoneProps = { src: string; alt: string; className?: string; bar: string; light?: boolean };

function Phone({ src, alt, className = "", bar, light = false }: PhoneProps) {
  const image = `${base}assets/${src}`;
  return (
    <div className={`iphone ${className}`}>
      <span className="iphone-key left-[-0.7cqw] top-[17%] h-[3.6%]" />
      <span className="iphone-key left-[-0.7cqw] top-[24%] h-[7%]" />
      <span className="iphone-key left-[-0.7cqw] top-[33%] h-[7%]" />
      <span className="iphone-key right-[-0.7cqw] top-[28%] h-[11%]" />
      <div className="iphone-body shadow-phone">
        <div className="iphone-glass">
          <div className="iphone-screen" style={{ background: bar }}>
            <StatusBar light={light} background={STATUS_BARS[src] ?? bar} />
            <img src={image} alt={alt} width={780} height={1580} loading="lazy" decoding="async" className="iphone-image" />
            <span className="iphone-island" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Point({ title, children, tick }: { title: string; children: string; tick: string }) {
  return (
    <div className="grid content-start gap-2">
      <span className={`mb-1 h-[0.3rem] w-9 rounded-sm ${tick}`} />
      <h4 className="text-[1.1875rem] font-extrabold leading-tight tracking-tight">{title}</h4>
      <p className="opacity-75">{children}</p>
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button type="button" onClick={copy} className="justify-self-start rounded-full border border-navy-line px-3.5 py-1.5 text-sm font-semibold transition-colors hover:border-soft">
      {copied ? "Copied" : label}
    </button>
  );
}

function Opening() {
  return (
    <header className="pt-5">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
          <i className="h-3 w-3 rounded-full bg-lime shadow-[0_0_0_5px_rgba(134,194,50,.22)]" />
          Arman Naseri Far
        </p>
        <span className="eyebrow rounded-full border border-navy-line px-4 py-2 text-[0.6875rem] text-soft">Open to internships</span>
      </div>

      <div className="wrap grid gap-7 pt-14 md:pt-24">
        <h1 className="headline text-[clamp(2.875rem,8vw,6.75rem)]">
          I build web products end to end.
          <span className="headline-sub">From the database to the interface.</span>
        </h1>
        <p className="max-w-[46rem] text-[clamp(1.1875rem,2vw,1.4375rem)] leading-snug text-soft">
          I'm a Computer Engineering student at Politecnico di Torino. I've built a Persian growth platform, an auto parts shop with an AI assistant, and an open-source tool for AI coding agents.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#work" className="rounded-full bg-lime px-6 py-3.5 font-bold text-navy transition-colors hover:bg-white">See my work</a>
          <a href={`${base}Arman_Naseri_Far_CV.pdf`} className="rounded-full border border-navy-line px-6 py-3.5 font-bold transition-colors hover:border-soft">Download CV</a>
          <a href={GITHUB} className="text-link">GitHub</a>
          <a href={LINKEDIN} className="text-link">LinkedIn</a>
        </div>
      </div>

      <div className="pt-6">
        <ProjectGraph />
      </div>
    </header>
  );
}

function Mevo() {
  return (
    <section id="work" className="scroll-mt-8 pt-24 md:pt-40">
      <article id="mevo" className="wrap grid scroll-mt-8 gap-10 md:gap-14">
        <div className="grid gap-5">
          <p className="eyebrow text-soft">Research internship, Politecnico di Torino</p>
          <h2 className="headline text-[clamp(2.375rem,6.4vw,5.25rem)]">
            Conduct an orchestra from a VR headset.
            <span className="headline-sub">Musicians follow in their browser.</span>
          </h2>
          <p className="max-w-[46rem] text-xl leading-snug text-soft">
            MEVO is a networked music performance system from Prof. Cristina Rottondi's group at the Department of Electronics and Telecommunications. Since May 2026 I've worked with Dr. Leonardo Severi and Dr. Matteo Sacchetto, who built the original system, to grow its shared rehearsal hall across the headset, the browser and the services between them.
          </p>
          <dl className="m-0 mt-2 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Role", "Research Intern"],
              ["Where", "SONIC Lab, DET, Politecnico di Torino"],
              ["When", "May 2026 to present"],
              ["Supervisor", "Prof. Cristina Rottondi"],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="text-sm text-dim">{name}</dt>
                <dd className="m-0 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[1.75rem] border border-navy-line bg-navy-up/60 p-5 md:p-9">
          <MevoDiagram />
        </div>

        <div className="grid gap-6 rounded-[1.75rem] bg-white p-6 text-ink md:p-9">
          <p className="eyebrow text-lime-deep">What I built</p>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            <Point title="One hall, two worlds" tick="bg-lime">The rehearsal hall, with paintings, instruments, picture lamps and softer light, looks the same in the headset and in the browser.</Point>
            <Point title="Avatars musicians choose" tick="bg-signal">Six avatars with outfit variants. Musicians pick one on the web page and the conductor sees it in VR.</Point>
            <Point title="A seating plan" tick="bg-amber">Taken seats show on the plan, and a button lets a musician change seat.</Point>
            <Point title="Presence" tick="bg-lime">Name labels over every musician, and heads that turn toward the conductor.</Point>
            <Point title="Musicians who rehearse" tick="bg-signal">Idle motion between pieces. When the rehearsal timer runs, avatars take up their instruments with arm IK.</Point>
            <Point title="Connection quality in the headset" tick="bg-amber">The conductor sees each musician's round-trip time, so a weak link is visible during the rehearsal.</Point>
          </div>
          <div className="h-px bg-rule" />
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p className="max-w-[40rem] text-sm text-ink-soft">Unity, C#, Meta Quest, Unity WebGL, TypeScript, Node.js, Fastify, WebRTC and WebSocket. The project is not public, so this page shows how it works instead of screenshots.</p>
            <a className="text-link" href="https://arxiv.org/abs/2404.09665">Read the group's MEVO paper</a>
          </div>
        </div>
      </article>
    </section>
  );
}

function Nextribe() {
  const screens = [
    ["nextribe-today.jpg", "Today", "#1f182c", "Home screen with a personal greeting, the path logo that fills up through the week and the day's score"],
    ["nextribe-sleep.jpg", "Sleep", "#303674", "Sleep log with a dial for bedtime and wake time and a quality rating"],
    ["nextribe-library.jpg", "Library", "#1d172a", "Library of books, films and podcasts with search, filters and a work of the week"],
    ["nextribe-paths.jpg", "Six paths", "#1e182d", "Six paths screen with the NEXTRIBE logo filling up by path and a level for each one"],
    ["nextribe-flashcards.jpg", "Flashcards", "#1e182b", "English flashcards with levels from A1 to C2"],
    ["nextribe-workout.jpg", "Home workout", "#1e182d", "Home workout with an animated figure and three types of exercise"],
    ["nextribe-journey.jpg", "Journey", "#1e172b", "Yearly journey map with a path up a mountain under the moon"],
    ["nextribe-breathe.jpg", "Breathing", "#512f4e", "Guided breathing with a glowing sphere and a choice of exercises"],
  ];
  return (
    <section className="nx-night mt-28 py-20 md:mt-44 md:py-28">
      <article id="nextribe" className="scroll-mt-8">
        <div className="wrap grid gap-5">
          <p className="flex items-center gap-3 font-grotesk text-sm font-bold tracking-[0.32em] text-white"><img src={`${base}nextribe-mark.svg`} alt="" width={30} height={30} className="rounded-lg" />NEXTRIBE</p>
          <h2 className="headline font-grotesk text-[clamp(2.375rem,6.4vw,5.25rem)]">
            One home for daily growth.
            <span className="nx-gradient-text block">Installed from the browser.</span>
          </h2>
          <p className="max-w-[44rem] text-xl leading-snug text-[#d9c8f7]/85">
            A Persian web app with daily missions across six paths, a planner, sleep and food tracking, flashcards, guided breathing, home workouts, an AI coach and a library of 198 works. Members add it to their phone without an app store.
          </p>
        </div>

        <div className="rail mx-auto mt-12 grid max-w-[100rem] auto-cols-[min(66vw,16rem)] grid-flow-col gap-5 overflow-x-auto px-5 pb-8 md:mt-16 lg:grid-flow-row lg:grid-cols-4 lg:gap-x-7 lg:gap-y-10 lg:overflow-visible lg:px-10">
          {screens.map(([src, name, bar, alt], i) => (
            <figure key={src} className={`m-0 ${i % 2 ? "lg:mt-16" : ""}`}>
              <Phone src={src} alt={alt} bar={bar} light />
              <figcaption className="mt-4 text-center text-sm text-[#bfa3f0]/75">{name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="wrap mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <dl className="m-0 grid grid-cols-3 content-start gap-4">
            {[["71", "pages"], ["24", "API routes"], ["77", "database models"]].map(([value, name]) => (
              <div key={name}>
                <dd className="m-0 text-[clamp(2.5rem,5.4vw,4.25rem)] font-grotesk font-bold leading-none tracking-tighter text-[#bfa3f0] tabular-nums">{value}</dd>
                <dt className="mt-2 text-sm text-[#d9c8f7]/80">{name}</dt>
              </div>
            ))}
          </dl>
          <div className="grid gap-8 sm:grid-cols-3">
            <Point title="Safety before missions" tick="bg-[#34a985]">An onboarding step hides missions that aren't suitable for a member.</Point>
            <Point title="Private answers stay private" tick="bg-[#cf6aad]">The group never sees mood, journal or safety answers.</Point>
            <Point title="A fair leaderboard" tick="bg-[#f2795c]">Members rank by progress toward their own goal, not by raw totals.</Point>
          </div>
        </div>

        <div className="wrap mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 md:mt-14">
          <p className="max-w-[38rem] text-sm text-[#bfa3f0]/70">Still in early validation with club members, so there are no user numbers to report yet. Screens come from a test account with sample data. Source code is private.</p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <a className="text-link decoration-[#a27ce7]" href="https://nextribe.app/welcome">Visit the website</a>
            <a className="text-link decoration-[#a27ce7]" href="https://nextribe.app/welcome#inside-app">Try the app preview</a>
          </p>
        </div>
      </article>
    </section>
  );
}

function Parsilon() {
  return (
    <article id="parsilon" className="mt-28 scroll-mt-8 bg-[#f4f7fc] text-[#0f172a] md:mt-44">
      <div className="wrap grid items-start gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
        <div className="grid gap-5">
          <p className="eyebrow flex items-center gap-2.5 text-[#17479E]"><i className="h-2.5 w-2.5 rounded-sm bg-[#8CC63F]" />Parsilon Part</p>
          <h2 className="headline text-[clamp(2.375rem,5.2vw,4.5rem)] text-[#0E2F6D]">
            The right part for the exact car.
            <span className="block text-[#2F5FB3]">Found by an AI assistant.</span>
          </h2>
          <p className="text-xl leading-snug text-ink-soft">
            A mobile-first auto parts shop with search, compatible cars, checkout, order tracking, wholesale requests and an admin panel with sales reports.
          </p>
          <div className="mt-5 grid gap-8">
            <Point title="Answers come from the catalogue" tick="bg-[#8CC63F]">The assistant uses tools to search live products and check price and stock.</Point>
            <Point title="Read-only by design" tick="bg-[#2F5FB3]">It can't place orders or see customer accounts.</Point>
            <Point title="The shop doesn't depend on AI" tick="bg-[#0E2F6D]">Without an API key, the assistant page says so and everything else keeps working.</Point>
          </div>
          <p className="mt-3"><a className="text-link decoration-[#8CC63F]" href="https://github.com/Armannss/Parsilon-web-application-mobile-shell">View source on GitHub</a></p>
        </div>

        <div className="flex justify-center pb-10 lg:sticky lg:top-8 lg:-mt-44 lg:self-start">
          <Phone src="parsilon-home.jpg" alt="Parsilon home page with brake parts and a part search" bar="#fefefe" className="relative z-0 w-[50%] max-w-[22rem] translate-x-[42%] translate-y-12 -rotate-[4deg]" />
          <Phone src="parsilon-assistant.jpg" alt="The assistant answers a request for a front brake disc and shows the matching part with its price" bar="#fefefe" className="relative z-10 w-[50%] max-w-[22rem]" />
          <Phone src="parsilon-product.jpg" alt="Product page for a crankshaft pulley with price and stock" bar="#fefefe" className="relative z-0 w-[50%] max-w-[22rem] -translate-x-[42%] translate-y-12 rotate-[4deg]" />
        </div>
      </div>
    </article>
  );
}

function Armap() {
  return (
    <article id="armap" className="wrap mt-28 grid scroll-mt-8 gap-10 md:mt-44 md:gap-14">
      <div className="grid gap-5">
        <p className="eyebrow text-soft">armap, a Claude Code plugin</p>
        <h2 className="headline text-[clamp(2.375rem,6.4vw,5.25rem)]">
          Your AI agent is lost in your codebase.
          <span className="headline-sub">Give it a map.</span>
        </h2>
        <p className="max-w-[44rem] text-xl leading-snug text-soft">
          armap ranks files with PageRank over their dependency graph and gives the agent a map of about 700 tokens before it starts. It needs no compiler, no language server and no runtime dependencies.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-7">
        <div className="grid min-w-0 content-between gap-6 rounded-[1.75rem] border border-navy-line bg-navy-up p-6 md:p-8">
          <pre className="m-0 overflow-x-auto font-mono text-[0.8438rem] leading-[1.8]" aria-label="Example of the map armap prints"><span className="text-dim"># Repo map: 108 source files{"\n"}Top-level: app/ 61, lib/ 22, components/ 10</span>{"\n\n"}lib/prisma.ts <span className="text-lime">(used by 27)</span>{"\n"}  L22 export const prisma ={"\n"}lib/auth.ts <span className="text-lime">(used by 16)</span>{"\n"}  L20 export async function hashPassword(…)</pre>
          <pre className="m-0 overflow-x-auto font-mono text-[0.8438rem] leading-[1.8]" aria-label="Two queries the agent can run"><span className="text-dim">$</span> armap deps lib/auth.ts{"\n"}<span className="text-dim">$</span> armap refs hashPassword</pre>
          <p className="text-sm text-dim">Recognizes around 50 file types and resolves imports to real files for 15 languages.</p>
        </div>

        <div className="grid min-w-0 gap-6 rounded-[1.75rem] bg-white p-6 text-ink md:p-9">
          <p className="eyebrow text-lime-deep">Tokens used, same 5 questions</p>
          <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-x-5">
            <span className="font-semibold text-ink-soft">Without</span>
            <div className="flex h-12 items-center rounded-[0.65rem] bg-navy px-4 font-extrabold tabular-nums tracking-tight text-white">496,044</div>
            <span className="mt-2 font-semibold text-ink-soft sm:mt-0">With armap</span>
            <div className="flex h-12">
              <div className="flex w-[80.07%] items-center rounded-[0.65rem] bg-lime px-4 font-extrabold tabular-nums tracking-tight text-navy">397,157</div>
              <div className="flex flex-1 items-center justify-center rounded-r-[0.65rem] border-[1.5px] border-l-0 border-dashed border-[#b9dc8c] font-extrabold tracking-tight text-lime-deep">−20%</div>
            </div>
          </div>
          <div className="h-px bg-rule" />
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              ["−48%", 'on "what breaks if I change this?"', "bg-lime"],
              ["−35%", 'on "how does this part work?"', "bg-signal"],
              ["+2 to 5%", "on simple lookups one search already answers", "bg-amber"],
            ].map(([value, note, tick]) => (
              <div key={value} className="grid content-start gap-1.5">
                <span className={`mb-1 h-[0.3rem] w-9 rounded-sm ${tick}`} />
                <b className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-none tracking-tighter tabular-nums">{value}</b>
                <span className="text-[0.9375rem] leading-snug text-ink-soft">{note}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="text-sm text-ink-soft">Early pilot: 1 project, 5 questions, 2 runs each.</p>
            <a className="text-link" href="https://github.com/Armannss/armap">View source on GitHub</a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Jetaime() {
  const screens = [
    ["jetaime-vitrine.jpg", "Shop window", "Illustrated shop window with cakes and cookies under glass domes", "turn-right"],
    ["jetaime-love.jpg", "Brand story", "Brand story screen with large Persian lettering on blush pink", "turn-right"],
    ["jetaime-gift.jpg", "Gift packaging", "Cookie in a branded paper bag with a section about gifting", "turn-left"],
    ["jetaime-menu.jpg", "Menu", "Menu with illustrated cakes and cookies and short descriptions", "turn-left"],
  ];
  return (
    <article id="jetaime" className="mt-28 scroll-mt-8 bg-wine text-white md:mt-44">
      <div className="awning" aria-hidden="true" />
      <div className="wrap grid gap-5 pt-14 md:pt-20">
        <p className="eyebrow text-peach">Jetaime</p>
        <h2 className="headline text-[clamp(2.375rem,6.4vw,5.25rem)]">
          A shop window for a pastry brand.
          <span className="block text-peach">Its costs stay behind the counter.</span>
        </h2>
        <p className="max-w-[44rem] text-xl leading-snug text-peach/90">
          A Persian website for a pastry brand, plus internal tools for costs, price lists and invoices. Both share one monorepo and one database.
        </p>
      </div>

      <div className="rail shelf mx-auto mt-12 grid max-w-[100rem] auto-cols-[min(66vw,16rem)] grid-flow-col gap-5 overflow-x-auto px-5 md:mt-16 lg:grid-flow-row lg:grid-cols-4 lg:gap-7 lg:overflow-visible lg:px-10">
        {screens.map(([src, name, alt, turn]) => (
          <figure key={src} className={`m-0 ${turn}`}>
            <Phone src={src} alt={alt} bar="#ffffff" className="shelf-phone" />
            <figcaption className="mt-5 text-center text-sm text-peach">{name}</figcaption>
          </figure>
        ))}
      </div>

      <div className="wrap grid gap-8 pb-16 pt-10 sm:grid-cols-3 md:pb-24 md:pt-14">
        <Point title="The website can't reach costs" tick="bg-peach">It connects with a restricted database role that reads published products only.</Point>
        <Point title="Prices that keep up" tick="bg-orchid">Ingredient prices are stored by date, so a new price updates the whole price list.</Point>
        <Point title="Invoices keep their numbers" tick="bg-blush">Each invoice line stores its own price and cost, so old invoices don't change.</Point>
      </div>
      <div className="wrap pb-14">
        <p className="max-w-[40rem] text-sm text-peach/80">Next.js, TypeScript, PostgreSQL, Drizzle and Turborepo. In development and not public yet, so the photos are placeholders from the brand book. Source code is private.</p>
      </div>
    </article>
  );
}

function Armanly() {
  const screens = [
    ["armanly-home.jpg", "Home", "Home screen with the day's plan and the next lesson in a speech bubble"],
    ["armanly-lesson.jpg", "Lesson", "Lesson card teaching the word persuasive with its Persian meaning and a highlighted example"],
    ["armanly-cards.jpg", "Flashcards", "Flashcard for persuasive with buttons for still learning and got it"],
    ["armanly-practice.jpg", "Practice", "Practice menu with Daily 10, grammar drill, fill the blank and more"],
  ];
  const facts = [
    ["151", "expressions"],
    ["29", "lessons"],
    ["13", "topics"],
    ["9", "grammar topics"],
  ];
  return (
    <article id="armanly" className="armanly mt-28 scroll-mt-8 py-20 md:mt-44 md:py-28">
      <div className="wrap grid gap-5">
        <p className="flex items-center gap-3 font-bricolage text-xl font-extrabold tracking-tight text-[#1B2033]">
          <img src={`${base}armanly-mark.png`} alt="" width={36} height={36} className="rounded-[10px]" />
          Armanly
        </p>
        <h2 className="font-bricolage text-[clamp(2.375rem,6.4vw,5.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#1B2033]" style={{ textWrap: "balance" }}>
          Class notes become <mark className="armanly-mark">daily practice.</mark>
        </h2>
        <p className="max-w-[46rem] font-jakarta text-xl leading-snug text-[#565D75]">
          Armanly turns the slides of my English speaking class into short lessons, spaced-repetition flashcards and timed speaking drills. It works offline, needs no account and keeps each learner's progress on their own phone.
        </p>
      </div>

      <div className="rail mx-auto mt-12 grid max-w-[100rem] auto-cols-[min(66vw,16rem)] grid-flow-col gap-5 overflow-x-auto px-5 pb-8 md:mt-16 lg:grid-flow-row lg:grid-cols-4 lg:gap-7 lg:overflow-visible lg:px-10">
        {screens.map(([src, name, alt], i) => (
          <figure key={src} className={`m-0 ${i % 2 ? "lg:mt-16" : ""}`}>
            <Phone src={src} alt={alt} bar="#F3F5FB" />
            <figcaption className="mt-4 text-center font-jakarta text-sm font-semibold text-[#687089]">{name}</figcaption>
          </figure>
        ))}
      </div>

      <div className="wrap mt-8 grid gap-6 md:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-10">
        <div className="armanly-bubble">
          <p className="font-jakarta text-sm font-semibold text-white/80">What the class gets</p>
          <dl className="m-0 mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
            {facts.map(([value, name]) => (
              <div key={name}>
                <dd className="m-0 font-bricolage text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight text-white">{value}</dd>
                <dt className="mt-1 font-jakarta text-sm font-semibold text-white/80">{name}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Spaced repetition", "Words you miss come back sooner, and words you know come back less often."],
            ["Speaking drills that push back", "Timed case discussions where the app interrupts with a challenge mid-answer."],
            ["Works offline", "After the first visit everything runs without a connection, and progress never leaves the phone."],
            ["Progress without an account", "A private link carries a learner's progress to another device. Nothing is stored on a server."],
          ].map(([title, text]) => (
            <div key={title} className="armanly-card">
              <h4 className="font-bricolage text-lg font-extrabold tracking-tight text-[#1B2033]">{title}</h4>
              <p className="mt-1.5 font-jakarta text-[0.9688rem] leading-snug text-[#565D75]">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a className="armanly-button" href="https://armannss.github.io/speak-and-learn/">Try Armanly</a>
        <a className="font-jakarta font-bold text-[#2740C4] underline decoration-[#FFE566] decoration-[3px] underline-offset-[0.25em]" href="https://github.com/Armannss/speak-and-learn">View source on GitHub</a>
        <p className="w-full font-jakarta text-sm text-[#687089] sm:w-auto">HTML, CSS, JavaScript and a service worker. No framework and no build step.</p>
      </div>
    </article>
  );
}

function Belvia() {
  const screens = [
    ["belvia-form.jpg", "Order form", "Order form with the customer, the euro to Rial rate, the shipping rate and product cards"],
    ["belvia-summary.jpg", "Summary", "Receipt-style summary with the final amount in euros, Rial and Toman and the invoice button"],
    ["belvia-dark.jpg", "Dark theme", "The order form in the dark theme"],
    ["belvia-english.jpg", "English mode", "The order form in English with a left-to-right layout"],
  ];
  const lines = [
    ["Live totals", "as you type"],
    ["Product cards", "no sideways tables"],
    ["Summary", "€ · Rial · Toman"],
    ["Private profit", "hidden in one tap"],
    ["Persian digits", "۱۲٫۵ = 12.5"],
    ["English mode", "switches to LTR"],
    ["Light and dark", "follows the phone"],
    ["Refresh", "nothing is lost"],
  ];
  return (
    <article id="belvia" className="mt-28 scroll-mt-8 bg-[#F5F2F0] py-20 text-[#2A221F] md:mt-44 md:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
        <div className="grid gap-5">
          <img src={`${base}belvia-mark.png`} alt="" width={342} height={480} className="w-16 lg:hidden" />
          <p className="font-vazir text-sm font-bold uppercase tracking-[0.2em] text-[#8C756A]">Belvia Order Calculator</p>
          <h2 className="font-vazir text-[clamp(2.375rem,6vw,4.75rem)] font-bold leading-[1.08] tracking-[-0.03em]" style={{ textWrap: "balance" }}>
            From a euro price tag
            <span className="block text-[#8C756A]">to a total in Toman.</span>
          </h2>
          <p className="max-w-[44rem] font-vazir text-xl leading-relaxed text-[#75685F]">
            An internal tool for Belvia Online Shop. It works out an order's final price from euro prices, discounts and shipping by weight, shows it in euros, Rial and Toman, and prints a PDF invoice for the customer. Version 2 is a full redesign with the same formulas, so every order still adds up exactly as before.
          </p>
        </div>
        <img src={`${base}belvia-mark.png`} alt="By Belvia Online Shop logo" width={342} height={480} className="mx-auto hidden w-[13rem] lg:block" />
      </div>

      <div className="rail mx-auto mt-12 grid max-w-[100rem] auto-cols-[min(66vw,16rem)] grid-flow-col gap-5 overflow-x-auto px-5 pb-8 md:mt-16 lg:grid-flow-row lg:grid-cols-4 lg:gap-7 lg:overflow-visible lg:px-10">
        {screens.map(([src, name, alt], i) => (
          <figure key={src} className={`m-0 ${i % 2 ? "lg:mt-16" : ""}`}>
            <Phone src={src} alt={alt} bar="#F5F2F0" light={src === "belvia-dark.jpg"} />
            <figcaption className="mt-4 text-center font-vazir text-sm font-semibold text-[#75685F]">{name}</figcaption>
          </figure>
        ))}
      </div>

      <div className="wrap mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <div className="belvia-receipt" aria-label="What changed in version 2">
          <p className="text-center font-vazir text-sm font-bold uppercase tracking-[0.2em] text-[#8C756A]">Version 2</p>
          <div className="my-4 border-t border-dashed border-[#d9cec6]" />
          <dl className="m-0 grid gap-2.5 font-mono text-[0.84rem]">
            {lines.map(([name, value]) => (
              <div key={name} className="flex items-baseline gap-2">
                <dt className="shrink-0">{name}</dt>
                <span className="mb-1 flex-1 border-b border-dotted border-[#cbbfb6]" />
                <dd className="m-0 shrink-0 text-right text-[#5A473D]">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="my-4 border-t border-dashed border-[#d9cec6]" />
          <p className="flex items-baseline justify-between font-mono text-[0.95rem] font-bold">
            <span>Formulas</span>
            <span>unchanged</span>
          </p>
        </div>
        <div className="grid content-start gap-6">
          <p className="max-w-[40rem] font-vazir text-lg leading-relaxed text-[#2A221F]">
            The shop owner uses it while talking to a customer, so the profit section can be hidden before the screen is shown, and on a phone the final total and the invoice button stay at the bottom of the screen. Colours come from the Belvia logo, in a light and a dark theme.
          </p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a className="belvia-button" href="https://armannss.github.io/">Try the calculator</a>
            <a className="font-vazir font-bold text-[#5A473D] underline decoration-[#8C756A] decoration-2 underline-offset-[0.25em]" href="https://github.com/Armannss/Armannss.github.io">View source on GitHub</a>
          </p>
          <p className="font-vazir text-sm text-[#75685F]">HTML, CSS, JavaScript and a service worker. Screens show a sample order.</p>
        </div>
      </div>
    </article>
  );
}

function Background() {
  const groups = [
    ["Education", [["B.Sc. Computer Engineering", "Politecnico di Torino, 2023 to present"], ["B.Sc. Materials Science and Engineering", "Sharif University of Technology, 2019 to 2023"]]],
    ["Skills", [["Code", "TypeScript, JavaScript, Python, C#, C, SQL"], ["Web and data", "Next.js, React, Node.js, PostgreSQL, Prisma, Drizzle"]]],
    ["Also", [["AI and real-time", "Claude API with tool use, Claude Code plugins, WebRTC, Web Push, Unity"], ["Languages", "Persian (native), English (TOEFL 97), Italian (basic)"]]],
  ] as const;
  return (
    <section aria-label="Background" className="wrap mt-24 md:mt-36">
      <div className="grid gap-10 border-t border-navy-line pt-9 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([title, items]) => (
          <div key={title} className="grid content-start gap-4">
            <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
            <dl className="m-0 grid gap-3">
              {items.map(([name, value]) => (
                <div key={name}>
                  <dt className="font-semibold">{name}</dt>
                  <dd className="m-0 text-[0.9688rem] leading-snug text-soft">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const gmail = "arman.naserfar@gmail.com";
  const yahoo = "arman.naserfar@yahoo.com";
  const phone = "+39 351 332 5832";
  return (
    <footer id="contact" className="wrap mt-24 scroll-mt-8 pb-10 md:mt-36">
      <h2 className="headline text-[clamp(2.375rem,6.4vw,5.25rem)]">
        Let's talk.
        <span className="headline-sub">I'm open to internships.</span>
      </h2>
      <a href={`mailto:${gmail}`} className="mt-10 block break-words text-[clamp(1.4375rem,6.2vw,4.25rem)] font-extrabold leading-tight tracking-tight underline decoration-lime decoration-[3px] underline-offset-[0.18em] md:mt-14">{gmail}</a>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="grid content-start gap-2"><p className="text-sm text-dim">Gmail</p><CopyButton value={gmail} label="Copy email" /></div>
        <div className="grid content-start gap-2"><p className="text-sm text-dim">Yahoo</p><a className="font-semibold" href={`mailto:${yahoo}`}>{yahoo}</a><CopyButton value={yahoo} label="Copy email" /></div>
        <div className="grid gap-2"><p className="text-sm text-dim">Phone</p><a className="font-semibold" href={`tel:${phone.replace(/ /g, "")}`}>{phone}</a><CopyButton value={phone} label="Copy number" /></div>
      </div>
      <div className="mt-14 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-navy-line pt-6">
        <p className="text-sm text-dim">Turin, Italy</p>
        <b className="text-[1.375rem] font-extrabold tracking-tight">Arman Naseri Far</b>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <main className="overflow-x-clip">
      <Opening />
      <Mevo />
      <Nextribe />
      <Parsilon />
      <Armap />
      <Jetaime />
      <Armanly />
      <Belvia />
      <Background />
      <Contact />
    </main>
  );
}
