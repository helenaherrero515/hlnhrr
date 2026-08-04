import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { ReactElement } from "react";
import type { Profile } from "@/types";
import { FloatingCursor, GridDots, PrototypeConnector, SelectionBox, Sparkles as SparkleAsset } from "@/components/assets";
import { GridBackground } from "@/components/ui";

interface ShowcaseHeroProps {
  profile: Profile;
}

export function ShowcaseHero({ profile }: ShowcaseHeroProps): ReactElement {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden rounded-b-[2rem] px-4 pb-16 pt-14 sm:px-8 lg:px-16" aria-labelledby="hero-title">
      <GridBackground className="-z-20 opacity-45" />
      <div aria-hidden="true" className="absolute right-0 top-0 -z-10 h-[38rem] w-[34rem] rounded-bl-[18rem] bg-[linear-gradient(135deg,rgb(113_134_255_/_28%),rgb(139_124_255_/_38%),rgb(255_114_184_/_10%))] blur-2xl" />
      <GridDots className="motion-pulse-soft absolute right-52 top-20 -z-10 hidden h-36 w-36 text-[var(--color-lavender)] lg:block" />

      <div className="mx-auto mt-20 grid max-w-[92rem] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="motion-settle motion-delay-1 relative z-10">
          <SparkleAsset className="motion-pulse-soft absolute right-4 top-8 hidden h-12 w-12 sm:block" />
          <h1 id="hero-title" className="group relative max-w-5xl pb-[clamp(3.8rem,8vw,6.2rem)] leading-none">
            <span className="relative z-0 block text-[clamp(5.3rem,13vw,10rem)] font-black uppercase tracking-normal text-[#3b3b3b] drop-shadow-sm">Helena</span>
            <span className="pointer-events-none absolute -left-2 top-[43%] z-20 block rotate-[-10deg] bg-[linear-gradient(90deg,#2f80ff_0%,#6674ff_24%,#9b5cf6_48%,#d85bd7_70%,#ff72b8_100%)] bg-[length:140%_100%] bg-clip-text pl-1 font-[family-name:var(--font-parisienne)] text-[clamp(5.7rem,13.5vw,10.25rem)] font-normal leading-none tracking-[-0.055em] text-transparent opacity-95 drop-shadow-[0_0_14px_rgb(47_128_255_/_28%)] transition-[filter,opacity,background-position,transform] duration-300 ease-[var(--ease-emphasized)] [filter:drop-shadow(0_0_18px_rgb(139_92_246_/_38%))_drop-shadow(0_0_30px_rgb(255_114_184_/_22%))] group-hover:translate-y-[-2px] group-hover:rotate-[-12deg] group-hover:bg-[position:100%_0] group-hover:opacity-100 group-hover:drop-shadow-[0_0_28px_rgb(155_92_246_/_80%)] group-hover:[filter:drop-shadow(0_0_25px_rgb(47_128_255_/_60%))_drop-shadow(0_0_45px_rgb(155_92_246_/_55%))_drop-shadow(0_0_65px_rgb(255_114_184_/_50%))] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 sm:-left-4 sm:top-[42%] sm:pl-2">
              Herrero
            </span>
          </h1>
          <div className="mt-5 flex flex-wrap gap-4">
            <span className="rounded-[var(--radius-pill)] bg-[rgb(113_134_255_/_10%)] px-6 py-2 text-base font-bold uppercase text-[var(--color-periwinkle)]">UI/UX Designer</span>
            <span className="rounded-[var(--radius-pill)] bg-[rgb(255_201_174_/_22%)] px-6 py-2 text-base font-bold uppercase text-[var(--color-pink)]">Frontend Developer</span>
          </div>
          <p className="mt-8 max-w-xl text-xl leading-[1.5] text-[var(--color-ink-muted)]">
            Designing experiences where creativity meets engineering. I craft intuitive, user-centered interfaces and bring them to life with clean, responsive code.
          </p>
          <nav aria-label="Home sections" className="hero-role-card mt-9 flex max-w-2xl flex-wrap items-center gap-x-8 gap-y-3 rounded-[var(--radius-md)] border border-[var(--color-line)] px-6 py-4 text-sm font-semibold shadow-[var(--shadow-card)] backdrop-blur-[var(--blur-glass)]">
            <a href="#experience" className="relative z-10 inline-flex items-center gap-3 text-[var(--color-ink)] hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"><Sparkles aria-hidden="true" className="text-[var(--color-pink)]" size={21} /> Student Developer</a>
            <span aria-hidden="true" className="relative z-10 text-[var(--color-periwinkle)]">•</span>
            <a href="#skills" className="relative z-10 hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]">Product Designer</a>
            <span aria-hidden="true" className="relative z-10 text-[var(--color-periwinkle)]">•</span>
            <a href="#about" className="relative z-10 hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]">Researcher</a>
          </nav>
        </div>

        <div className="relative min-h-[470px] lg:min-h-[560px]">
          <PrototypeConnector className="motion-settle motion-delay-3 absolute left-0 top-48 hidden h-28 w-56 rotate-[-18deg] lg:block" />
          <FloatingCursor className="motion-float absolute bottom-20 left-16 hidden h-16 w-16 -rotate-12 lg:block [--float-rotate:-12deg]" />
          <SelectionBox className="motion-float-slow absolute bottom-0 right-8 h-24 w-28 rotate-6 text-[var(--color-periwinkle)] [--float-rotate:6deg]" />

          <div className="motion-float absolute left-[12%] top-16 z-10 grid size-24 place-items-center rounded-[var(--radius-md)] bg-white shadow-[var(--shadow-float)] [--float-rotate:0deg]">
            <span className="text-4xl font-black text-[var(--color-pink)]">F</span>
          </div>

          <div className="motion-settle motion-delay-2 surface-shine absolute left-[22%] top-6 w-[min(25rem,68vw)] rotate-[6deg] overflow-hidden rounded-[2.2rem] border-[8px] border-white bg-[linear-gradient(135deg,rgb(255_114_184_/_38%),rgb(139_124_255_/_24%))] shadow-[var(--shadow-float)]">
            <Image src={profile.avatar} alt="Portrait crop of Helena R. Herrero" width={360} height={490} priority className="h-[31rem] w-full object-cover object-center" />
          </div>

          <div className="motion-float-slow surface-shine absolute right-0 top-28 z-20 w-56 rotate-[7deg] rounded-[1.4rem] bg-white p-5 shadow-[var(--shadow-float)] [--float-rotate:7deg]">
            <p className="text-sm font-bold leading-snug text-[var(--color-ink)]">Designing meaningful experiences</p>
            <div className="mt-4 h-2 rounded-full bg-[rgb(29_29_31_/_10%)]"><div className="h-full w-3/4 rounded-full bg-[linear-gradient(90deg,var(--color-pink),var(--color-periwinkle))]" /></div>
          </div>

          <div className="motion-float surface-shine absolute bottom-8 right-0 z-20 w-72 rotate-[7deg] rounded-[1.4rem] bg-white p-6 shadow-[var(--shadow-float)] [--float-rotate:7deg]">
            <p className="text-base font-semibold text-[var(--color-ink)]">Prototype</p>
            <svg aria-hidden="true" className="mt-6 h-20 w-full" viewBox="0 0 220 70" fill="none">
              <path className="draw-path" d="M6 46C42 16 58 62 91 37C118 17 128 9 153 35C172 55 188 58 213 35" stroke="url(#line)" strokeWidth="7" strokeLinecap="round" />
              <circle cx="121" cy="24" r="7" fill="#315CFF" />
              <defs><linearGradient id="line" x1="6" x2="213" y1="35" y2="35"><stop stopColor="#DCCBFF"/><stop offset="0.5" stopColor="#315CFF"/><stop offset="1" stopColor="#FF4FA8"/></linearGradient></defs>
            </svg>
            <div className="mt-3 flex items-center gap-2"><span className="size-7 rounded-full bg-[var(--color-peach)]" /><span className="size-7 rounded-full bg-[var(--color-lavender)]" /><span className="size-7 rounded-full bg-[var(--color-sky)]" /><span className="grid size-7 place-items-center rounded-full border border-[var(--color-line)] text-xs">+</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}


