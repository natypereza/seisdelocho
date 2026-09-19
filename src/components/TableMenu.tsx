'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* Cue points read off the clip itself (6.59s, 1280×720):
   the lid clears the plate at 4.0s and has left the frame by 5.6s. */
const ON_PLATE = 4.0;
const FULLY_OPEN = 5.6;

/* Where the menu stands on the platter, as a share of the video box —
   measured against the frame at 4.4s, its foot on the plate's surface. */
const PLATE = { left: 40.8, top: 27.4, width: 16.6 };

type Phase = 'closed' | 'plate' | 'left';
type Rect = { left: number; top: number; width: number };

export function TableMenu() {
  const reduceMotion = useReducedMotion();
  const section = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const perch = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const [phase, setPhase] = useState<Phase>('closed');
  const [slotAt, setSlotAt] = useState<Rect | null>(null);
  const [perchAt, setPerchAt] = useState<Rect | null>(null);

  /* Both resting places are measured off the laid-out page rather than
     guessed, so the menu lands exactly in its column at any width. */
  const measure = useCallback(() => {
    const s = section.current;
    const a = slot.current;
    const b = perch.current;
    if (!s || !a || !b) return;
    const base = s.getBoundingClientRect();
    const one = a.getBoundingClientRect();
    const two = b.getBoundingClientRect();
    setSlotAt({ left: one.left - base.left, top: one.top - base.top, width: one.width });
    setPerchAt({ left: two.left - base.left, top: two.top - base.top, width: two.width });
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  /* The lid lifts when the section comes into view, once. */
  useEffect(() => {
    if (reduceMotion) {
      setPhase('left');
      return;
    }
    const s = section.current;
    const v = video.current;
    if (!s || !v) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        // A browser that refuses to autoplay still gets the menu.
        v.play().catch(() => setPhase('left'));
      },
      { threshold: 0.35 }
    );
    io.observe(s);
    return () => io.disconnect();
  }, [reduceMotion]);

  const onTime = () => {
    const t = video.current?.currentTime ?? 0;
    if (t >= FULLY_OPEN) setPhase('left');
    else if (t >= ON_PLATE) setPhase((p) => (p === 'closed' ? 'plate' : p));
  };

  const target = phase === 'left' ? slotAt : perchAt;

  return (
    <div ref={section} className="relative">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12">
        {/* On a phone the platter opens first and the menu settles below it. */}
        <div className="order-2 md:order-1">
          <div ref={slot} className="mx-auto aspect-[1414/2000] w-full max-w-[380px]" />
        </div>

        <div className="relative order-1 md:order-2">
          <video
            ref={video}
            src="/menu-reveal.mp4"
            poster="/menu-reveal-poster.webp"
            muted
            playsInline
            preload="metadata"
            controls={!!reduceMotion}
            onTimeUpdate={onTime}
            onEnded={() => setPhase('left')}
            className="w-full"
          />
          {/* The spot on the platter the menu is standing on. */}
          <div
            ref={perch}
            className="pointer-events-none absolute"
            style={{ left: `${PLATE.left}%`, top: `${PLATE.top}%`, width: `${PLATE.width}%` }}
          />
        </div>
      </div>

      {/* One menu the whole way: it fades in on the platter and then flies
          into its column, growing as it goes. */}
      {slotAt && target && (
        <motion.img
          src="/menu.webp"
          alt="The menu — what I bring to the table: brand thinking, creative direction, marketing mindset, from idea to execution."
          aria-hidden={phase === 'closed'}
          initial={false}
          animate={{
            x: target.left,
            y: target.top,
            scale: target.width / slotAt.width,
            opacity: phase === 'closed' ? 0 : 1,
          }}
          transition={
            phase === 'left'
              ? { type: 'spring', stiffness: 90, damping: 18 }
              : { duration: 0.6, ease: 'easeOut' }
          }
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: slotAt.width,
            transformOrigin: 'top left',
            /* It reads as paper on the page, not as part of the film. */
            filter: 'drop-shadow(0 14px 34px rgba(60,44,30,0.28))',
          }}
        />
      )}
    </div>
  );
}
