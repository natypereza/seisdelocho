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
      className="grid aspect-[4/3] w-full place-items-center border border-warm-light bg-bg-elevated px-3"
      role="img"
      aria-label={`${image.alt} — image to come`}
    >
      <span className="text-center font-decorative text-sm italic text-greige">{image.alt}</span>
    </div>
  );
}

function Prose({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[.68rem] font-bold uppercase tracking-[0.22em] text-greige">{label}</p>
      <p className="mt-2 text-[.92rem] leading-relaxed text-warm-dark">{children}</p>
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
        className="group grid w-full grid-cols-[1fr_auto] items-start gap-4 py-6 text-left"
      >
        <span className="block">
          <span className="block font-decorative text-lg font-bold leading-tight text-warm-darker md:text-xl">
            {e.role}
          </span>
          <span className="mt-1 block text-[.88rem] text-warm-dark">{e.org}</span>
          <span className="mt-1.5 block text-[.7rem] font-bold uppercase tracking-[0.18em] text-greige tabular-nums">
            {e.when}
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
            <div className="grid gap-5 pb-8">
              {e.about && <Prose label="About">{e.about}</Prose>}
              <Prose label={e.didLabel}>{e.did}</Prose>

              {e.images && (
                <div className="grid grid-cols-2 gap-3">
                  {e.images.map((img, i) => (
                    <Frame key={i} image={img} />
                  ))}
                </div>
              )}

              {e.slug && (
                <Link
                  href={`/background/${e.slug}`}
                  className="group/btn inline-flex w-fit items-center gap-2 border border-warm-darker px-5 py-2.5 text-[.7rem] font-bold uppercase tracking-[0.18em] text-warm-darker transition-colors duration-300 hover:bg-warm-darker hover:text-peach"
                >
                  View experience
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function ExperienceList() {
  /* Two independent stacks: opening a role on one side grows only that
     column, leaving the other where it was. */
  const left = experiences.slice(0, 4);
  const right = experiences.slice(4);

  return (
    <div className="grid gap-x-12 md:grid-cols-2 lg:gap-x-16">
      <div className="content-start">
        {left.map((e) => (
          <Entry key={e.role + e.org} e={e} />
        ))}
      </div>
      <div className="content-start">
        {right.map((e) => (
          <Entry key={e.role + e.org} e={e} />
        ))}
      </div>
    </div>
  );
}
