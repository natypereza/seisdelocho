'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { ExpImage, Experience } from '@/content/experience';
import { experiences } from '@/content/experience';

/** Holds the frame's proportions whether or not the artwork has arrived. */
function Frame({ image }: { image: ExpImage }) {
  if (image.src) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="aspect-[4/3] w-full border border-warm-light object-cover"
      />
    );
  }
  return (
    <div
      className="grid aspect-[4/3] w-full place-items-center border border-warm-light bg-bg-elevated px-4"
      role="img"
      aria-label={`${image.alt} — image to come`}
    >
      <span className="font-decorative text-base italic text-greige">{image.alt}</span>
    </div>
  );
}

function Prose({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[.68rem] font-bold uppercase tracking-[0.22em] text-greige">{label}</p>
      <p className="mt-2 text-[.95rem] leading-relaxed text-warm-dark">{children}</p>
    </div>
  );
}

function Entry({ e }: { e: Experience }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  return (
    <article className="border-t border-warm-accent">
      {/* The whole header row is the control, so the arrow is a target hint
          rather than the only thing you can hit. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[1fr_auto] items-start gap-4 py-7 text-left md:py-8"
      >
        <span className="grid gap-2 md:grid-cols-[minmax(0,200px)_1fr] md:gap-10">
          <span className="block">
            <span className="block font-decorative text-2xl italic text-peach-deep md:text-[1.75rem]">
              {e.n}
            </span>
            <span className="mt-1 block text-[.7rem] font-bold uppercase tracking-[0.18em] text-greige tabular-nums">
              {e.when}
            </span>
          </span>

          <span className="block">
            <span className="block font-decorative text-xl font-bold leading-tight text-warm-darker md:text-2xl">
              {e.role}
            </span>
            <span className="mt-1 block text-[.9rem] text-warm-dark">{e.org}</span>
          </span>
        </span>

        <ChevronDown
          aria-hidden="true"
          className={`mt-1 h-5 w-5 flex-none text-greige transition-all duration-300 group-hover:text-warm-darker ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-9 md:grid md:grid-cols-[minmax(0,200px)_1fr] md:gap-10 md:pb-10">
              <div aria-hidden="true" />
              <div>
                <div className={`grid gap-6 ${e.images ? 'lg:grid-cols-2 lg:gap-10' : ''}`}>
                  {e.about && <Prose label="About">{e.about}</Prose>}
                  <Prose label={e.didLabel}>{e.did}</Prose>
                </div>

                {e.images && (
                  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {e.images.map((img, i) => (
                      <Frame key={i} image={img} />
                    ))}
                  </div>
                )}

                {e.slug && (
                  <Link
                    href={`/background/${e.slug}`}
                    className="group/btn mt-7 inline-flex items-center gap-2 border border-warm-darker px-6 py-3 text-[.72rem] font-bold uppercase tracking-[0.18em] text-warm-darker transition-colors duration-300 hover:bg-warm-darker hover:text-peach"
                  >
                    View experience
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function ExperienceList() {
  return (
    <div>
      {experiences.map((e) => (
        <Entry key={e.n} e={e} />
      ))}
    </div>
  );
}
