import Image from "next/image";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import type { ReactElement } from "react";
import type { Profile } from "@/types";
import { FloatingCursor, GridDots, PrototypeConnector, SelectionBox, Sparkles as SparkleAsset } from "@/components/assets";
import { Badge, CopyButton, GridBackground } from "@/components/ui";

interface ShowcaseHeroProps {
  profile: Profile;
}

export function ShowcaseHero({ profile }: ShowcaseHeroProps): ReactElement {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden rounded-b-[2rem] px-4 pb-16 pt-8 sm:px-8 lg:px-16" aria-labelledby="hero-title">
      <GridBackground className="-z-20 opacity-45" />
      <div aria-hidden="true" className="absolute right-0 top-0 -z-10 h-[38rem] w-[34rem] rounded-bl-[18rem] bg-[linear-gradient(135deg,rgb(113_134_255_/_28%),rgb(139_124_255_/_38%),rgb(255_114_184_/_10%))] blur-2xl" />
      <GridDots className="motion-pulse-soft absolute right-52 top-20 -z-10 hidden h-36 w-36 text-[var(--color-lavender)] lg:block" />

      <div className="motion-settle mx-auto flex max-w-[92rem] flex-col gap-5 text-sm font-semibold text-[var(--color-ink)] lg:flex-row lg:items-center lg:justify-between">
        <Badge tone="pink" className="w-fit px-5 py-3 text-sm shadow-[var(--shadow-card)]" icon={<span className="size-3 rounded-full bg-[linear-gradient(135deg,var(--color-pink),var(--color-peach))]" />}>
          Available for UI/UX Internship
        </Badge>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" size={18} /> {profile.location}</span>
          {profile.email ? <span className="inline-flex items-center gap-2"><a className="inline-flex items-center gap-2 hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={`mailto:${profile.email}`}><Mail aria-hidden="true" size={18} /> {profile.email}</a><CopyButton value={profile.email} label="email address" /></span> : null}
          {profile.phone ? <a className="inline-flex items-center gap-2 hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={`tel:${profile.phone}`}><Phone aria-hidden="true" size={18} /> {profile.phone}</a> : null}
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-[92rem] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="motion-settle motion-delay-1 relative z-10">
          <SparkleAsset className="motion-pulse-soft absolute right-4 top-8 hidden h-12 w-12 sm:block" />
          <h1 id="hero-title" className="max-w-5xl leading-[0.84] text-[var(--color-ink)]">
            <span className="block text-[clamp(5.3rem,13vw,10rem)] font-black uppercase tracking-normal drop-shadow-sm">Helena</span>
            <span className="-mt-8 block bg-[linear-gradient(105deg,#3678ff_0%,#8b7cff_35%,#ef5ed7_66%,#ff7a86_100%)] bg-clip-text font-[family-name:var(--font-script)] text-[clamp(4.5rem,11vw,8.5rem)] leading-none text-transparent sm:-mt-12">
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
          <nav aria-label="Home sections" className="mt-9 flex max-w-2xl flex-wrap items-center gap-x-8 gap-y-3 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/75 px-6 py-4 text-sm font-semibold shadow-[var(--shadow-card)] backdrop-blur-[var(--blur-glass)]">
            <a href="#skills" className="inline-flex items-center gap-3 text-[var(--color-ink)] hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"><Sparkles aria-hidden="true" className="text-[var(--color-pink)]" size={21} /> Product Design</a>
            <span aria-hidden="true" className="text-[var(--color-periwinkle)]">•</span>
            <a href="#experience" className="hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]">UX Research</a>
            <span aria-hidden="true" className="text-[var(--color-periwinkle)]">•</span>
            <a href="#hackathons" className="hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]">Frontend Development</a>
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



