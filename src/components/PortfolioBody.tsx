'use client';

import { motion } from 'framer-motion';
import { Strengths } from '@/components/Strengths';
import { TableMenu } from '@/components/TableMenu';
import { useEffect, useRef } from 'react';
import { intro } from '@/content/portfolio';

const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function Section({
  id,
  className = '',
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      animate="visible"
      variants={rise}
      className={`container-custom scroll-mt-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[.72rem] font-bold uppercase tracking-[0.26em] text-greige">{children}</p>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-warm-light bg-bg-elevated p-6 md:p-7">
      <h3 className="mb-5 font-decorative text-2xl font-bold italic tracking-tight text-warm-darker">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Entry({ when, what, where }: { when: string; what: string; where: string }) {
  return (
    <div className="border-t border-warm-light py-3 first:border-t-0 first:pt-0">
      <p className="text-[.7rem] font-bold uppercase tracking-[0.16em] text-greige tabular-nums">
        {when}
      </p>
      <p className="text-[1.02rem] font-bold leading-snug text-warm-darker">{what}</p>
      <p className="text-[.86rem] leading-snug text-warm-dark">{where}</p>
    </div>
  );
}

function Dots({ level }: { level: number }) {
  return (
    <span className="flex flex-none gap-[5px]" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`block h-[9px] w-[9px] rounded-full ${n <= level ? 'bg-black' : 'bg-black/15'}`}
        />
      ))}
    </span>
  );
}

export function PortfolioBody() {
  const reelRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = reelRef.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.removeAttribute('autoplay');
      v.pause();
      v.controls = true;
    }
  }, []);

  return (
    <>
      {/* ---------------- intro ---------------- */}
      <Section id="about" className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,286px)_1fr] md:gap-16">
          <div className="border-[9px] border-black bg-black leading-[0]">
            <video
              ref={reelRef}
              className="aspect-[9/16] w-full object-cover"
              src="/reel.mp4"
              /* Last frame of the clip, so the frame is never a black hole while it loads. */
              poster="/reel-poster.jpg"
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              aria-label="6del8 reel"
            />
          </div>

          <div>
            <p
              className="font-script text-warm-darker"
              style={{ fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)', lineHeight: 0.95 }}
            >
              {intro.greeting}
            </p>
            <h2 className="mt-2 font-decorative text-2xl font-extrabold uppercase leading-tight tracking-tight text-warm-darker md:text-3xl">
              {intro.name}
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-relaxed text-warm-dark">
              {intro.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- strengths ---------------- */}
      <Section className="pt-12 md:pt-16">
        <Eyebrow>Core strengths</Eyebrow>
        <div className="mt-5">
          <Strengths />
        </div>
      </Section>

      {/* ---------------- the menu ---------------- */}
      <Section className="pt-12 pb-16 md:pt-16 md:pb-20">
        {/* The greeting's hand, a size down: a section title, not a second hello. */}
        <p
          className="font-script text-warm-darker"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1 }}
        >
          What I bring to the table
        </p>
        <div className="mt-5">
          <TableMenu />
        </div>
      </Section>

    </>
  );
}
