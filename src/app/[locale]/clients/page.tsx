'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { clients } from '@/content/portfolio';

type Offset = { x: number; y: number; r: number };

export default function ClientsPage() {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const [offsets, setOffsets] = useState<Offset[]>([]);
  const [spread, setSpread] = useState(true);

  useLayoutEffect(() => {
    // Once per visit: coming back mid-session lands straight on the grid.
    // Some browsers throw on session storage, so a failure just means the
    // animation plays again rather than the page breaking.
    let seen = false;
    try {
      seen = sessionStorage.getItem('clients-dealt') === '1';
    } catch {}
    if (seen || reduceMotion) return;

    const grid = gridRef.current;
    const first = tiles.current[0];
    if (!grid || !first) return;

    // Measured rather than guessed, so each card knows its own way home
    // whatever the column count at this width.
    const g = grid.getBoundingClientRect();
    const f = first.getBoundingClientRect();
    const stackX = g.left + g.width / 2 - f.width / 2;
    const stackY = f.top;

    setOffsets(
      tiles.current.map((el, i) => {
        if (!el) return { x: 0, y: 0, r: 0 };
        const r = el.getBoundingClientRect();
        // Depth from the top of the pile: Bussola is the cover at zero and
        // VidaFit sits furthest back. Each card behind turns and drops a
        // little further, so the order reads rather than repeating angles.
        const depth = i;
        return {
          x: stackX - r.left + depth * 3,
          y: stackY - r.top + depth * 5,
          r: depth * 1.6,
        };
      })
    );
    setSpread(false);

    const t = setTimeout(() => {
      setSpread(true);
      try {
        sessionStorage.setItem('clients-dealt', '1');
      } catch {}
    }, 1700);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  const stacked = (i: number): Offset => offsets[i] ?? { x: 0, y: 0, r: 0 };

  return (
    <section className="bg-bg-base pt-5 pb-24 md:pt-7 md:pb-32">
      <div className="container-custom">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-warm-dark transition-colors hover:text-warm-darker md:mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Holds its space while the folders are still stacked. */}
        <motion.div
          animate={{ opacity: spread ? 1 : 0 }}
          transition={{ duration: spread ? 0.5 : 0 }}
        >
          <h1
            className="text-center font-script text-warm-darker"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
          >
            Clients
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-warm-dark">
            Brands I&rsquo;ve built, launched and looked after through 6 del 8 — across Guatemala,
            El Salvador and the United States.
          </p>
        </motion.div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:mt-14 md:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map((c, i) => {
            const off = stacked(i);
            return (
              <motion.div
                key={c.name}
                ref={(el) => {
                  tiles.current[i] = el;
                }}
                initial={false}
                /* Bigger while piled, settling to full size as they land. */
                animate={{
                  x: spread ? 0 : off.x,
                  y: spread ? 0 : off.y,
                  rotate: spread ? 0 : off.r,
                  scale: spread ? 1 : 1.55,
                }}
                transition={
                  spread
                    ? {
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                        delay: (clients.length - 1 - i) * 0.06,
                      }
                    : { duration: 0 }
                }
                /* Bussola is the cover of the pile; spread, the hovered card
                   leads. It deals last, so it holds the front while the rest
                   fly out from behind it. */
                style={{ zIndex: spread ? undefined : clients.length - i }}
                data-card=""
                className="relative"
              >
                <motion.figure
                  className="m-0"
                  whileHover={reduceMotion ? undefined : { scale: 1.06, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  {c.cover ? (
                    // Fixed ratio: the grid keeps its shape before the covers load,
                    // so the measured positions are the real ones.
                    <img
                      src={c.cover}
                      alt={`${c.name} — client cover`}
                      className="aspect-[1414/2000] h-auto w-full object-contain"
                      loading="eager"
                    />
                  ) : (
                    <div className="flex aspect-[1414/2000] items-center justify-center border border-warm-light bg-bg-elevated p-6">
                      <span className="text-center font-decorative text-xl font-bold text-warm-darker">
                        {c.name}
                      </span>
                    </div>
                  )}
                  <figcaption className="sr-only">
                    {c.name} · {c.when}
                  </figcaption>
                </motion.figure>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          animate={{ opacity: spread ? 1 : 0 }}
          transition={{ duration: spread ? 0.5 : 0, delay: spread ? 0.6 : 0 }}
          className="mt-14 text-center text-sm text-greige"
        >
          {clients.length} brands · 2019 to today
        </motion.p>
      </div>
    </section>
  );
}
