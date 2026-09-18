'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ExperienceList } from '@/components/ExperienceList';
import { education, languages, tools, certifications } from '@/content/portfolio';

const jump = [
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Languages', href: '#languages' },
  { label: 'Tools', href: '#tools' },
  { label: 'Certifications', href: '#certifications' },
] as const;

/* Section title in the left rail, content on the right — the same rhythm the
   experience entries use, so the page reads as one piece. */
function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24 border-t border-warm-accent pt-10 md:pt-14"
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,200px)_1fr] md:gap-10">
        <h2 className="font-decorative text-2xl font-bold italic text-warm-darker md:text-[1.75rem]">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </motion.section>
  );
}

/* The rating is Natalia's own row of star patches, cut into five. A level of
   one shows one star, not one filled dot out of five. */
function Stars({ level, label }: { level: number; label: string }) {
  return (
    <span
      className="flex flex-none items-center gap-1.5"
      role="img"
      aria-label={`${label}: ${level} of 5`}
    >
      {Array.from({ length: level }, (_, i) => (
        <img key={i} src={`/stars/${i + 1}.webp`} alt="" className="h-6 w-auto md:h-7" />
      ))}
    </span>
  );
}

export default function BackgroundPage() {
  return (
    <div className="bg-bg-base pt-5 pb-24 md:pt-7 md:pb-32">
      <div className="container-custom">
        {/* ---------------- hero ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-warm-dark transition-colors hover:text-warm-darker md:mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h1
            className="text-center font-script text-warm-darker"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
          >
            Background
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-warm-dark">
            The roles, projects and experiences that shaped how I work today.
          </p>

          <nav
            aria-label="On this page"
            className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[.8rem] uppercase tracking-[0.14em] text-warm-dark"
          >
            {jump.map((j, i) => (
              <span key={j.href} className="flex items-center gap-x-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-greige">
                    &middot;
                  </span>
                )}
                <a
                  href={j.href}
                  className="border-b border-transparent pb-0.5 transition-colors hover:border-warm-darker hover:text-warm-darker"
                >
                  {j.label}
                </a>
              </span>
            ))}
          </nav>
        </motion.div>

        {/* ---------------- experience ---------------- */}
        {/* The photo is pinned to the section's own box, so it grows and
            shrinks as the accordions open and close. The veil keeps the black
            type readable over the darker birds and wires. */}
        <section id="experience" className="mt-16 scroll-mt-24 md:mt-24">
          <h2 className="mb-6 font-decorative text-2xl font-bold italic text-warm-darker md:mb-8 md:text-[1.75rem]">
            experience
          </h2>
          <ExperienceList />
        </section>

        {/* ------- education, languages, tools, certifications ------- */}
        <div className="mt-16 grid gap-12 md:mt-20 md:gap-16">
          <Block id="education" title="education">
            {/* One clipped note per entry, the text sitting on the paper — the
                clip takes the top fifth, so the copy starts below it. */}
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              {education.map((e) => (
                <div key={e.what} className="relative">
                  <img src="/education-note.webp" alt="" aria-hidden="true" className="w-full" />
                  <div className="absolute inset-x-[13%] bottom-[10%] top-[24%] flex flex-col justify-center text-center">
                    <p className="text-[.66rem] font-bold uppercase tracking-[0.18em] text-greige">
                      {e.when}
                    </p>
                    <p className="mt-1.5 font-decorative text-base font-bold leading-snug text-warm-darker md:text-lg">
                      {e.what}
                    </p>
                    <p className="mt-1 text-[.8rem] leading-snug text-warm-dark">{e.where}</p>
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <Block id="languages" title="languages">
            <div className="max-w-md">
              {languages.map((l) => (
                <div
                  key={l.name}
                  className="flex items-center justify-between gap-4 border-t border-warm-light py-3 first:border-t-0 first:pt-0"
                >
                  <span>
                    <span className="block text-[.95rem] font-bold text-warm-darker">{l.name}</span>
                    <span className="block text-[.72rem] italic text-greige">{l.note}</span>
                  </span>
                  <Stars level={l.level} label={l.name} />
                </div>
              ))}
            </div>
          </Block>

          <Block id="tools" title="software &amp; tools">
            <div className="grid gap-x-10 sm:grid-cols-2">
              {tools.map((t) => (
                <p
                  key={t.name}
                  className="border-t border-warm-light py-2.5 text-[.95rem] font-bold text-warm-darker"
                >
                  {t.name}
                  {t.note && (
                    <span className="text-[.85rem] font-normal italic text-greige"> — {t.note}</span>
                  )}
                </p>
              ))}
            </div>
          </Block>

          <Block id="certifications" title="certifications">
            {/* One column: in two, a row-filled grid reads in zigzag and the
                newest-first order stops being obvious. */}
            <div className="grid">
              {certifications.map((c) => (
                <div
                  key={c.title}
                  className="flex items-baseline justify-between gap-3 border-t border-warm-light py-2.5 text-[.9rem]"
                >
                  <span className="text-warm-dark">{c.title}</span>
                  <span className="flex-none text-[.78rem] text-greige tabular-nums">{c.year}</span>
                </div>
              ))}
            </div>
          </Block>
        </div>
      </div>
    </div>
  );
}
