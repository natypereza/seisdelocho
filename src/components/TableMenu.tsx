'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* Where the menu stands on the platter, as a share of the video box —
   its foot on the plate's surface, filling the space the cloche held. */
const PLATE = { left: 40.8, top: 27.4, width: 16.6 };

/* The lid's lower rim, tracked through the clip frame by frame and turned
   into how much of the menu it still covers: 1 is hidden, 0 is uncovered.
   The menu is already standing there — the lid is simply in the way. */
const REVEAL: ReadonlyArray<readonly [number, number]> = [
  [2.3, 1],
  [2.45, 0.877],
  [2.5, 0.813],
  [2.6, 0.78],
  [2.7, 0.743],
  [2.8, 0.68],
  [3.0, 0.553],
  [3.2, 0.463],
  [3.3, 0.403],
  [3.5, 0.31],
  [3.7, 0.217],
  [3.9, 0.137],
  [4.1, 0.03],
  [4.3, 0],
];

/* By now the lid is at the top of the frame: the menu leaves the platter. */
const FULLY_OPEN = 5.0;

function hiddenAt(t: number) {
  if (t <= REVEAL[0][0]) return 1;
  for (let i = 1; i < REVEAL.length; i++) {
    const [t1, h1] = REVEAL[i];
    if (t <= t1) {
      const [t0, h0] = REVEAL[i - 1];
      return h0 + ((h1 - h0) * (t - t0)) / (t1 - t0);
    }
  }
  return 0;
}

type Rect = { left: number; top: number; width: number };

export function TableMenu() {
  const reduceMotion = useReducedMotion();
  const section = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const perch = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const sheet = useRef<HTMLImageElement>(null);
  const onPlate = useRef<HTMLImageElement>(null);
  const frame = useRef<number | null>(null);

  const [landed, setLanded] = useState(false);
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

  const stop = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  }, []);

  /* Clipping follows the film, so it has to run every frame rather than on
     the handful of time updates the browser sends. */
  const uncover = useCallback(() => {
    const v = video.current;
    if (v) {
      const h = hiddenAt(v.currentTime);
      const cut = h > 0.002 ? `inset(${(h * 100).toFixed(2)}% 0 0 0)` : 'none';
      // Both cards are the same card until one of them leaves.
      if (sheet.current) sheet.current.style.clipPath = cut;
      if (onPlate.current) onPlate.current.style.clipPath = cut;
      if (v.currentTime >= FULLY_OPEN) setLanded(true);
    }
    frame.current = requestAnimationFrame(uncover);
  }, []);

  /* The lid lifts when the section comes into view, once. */
  useEffect(() => {
    if (reduceMotion) {
      setLanded(true);
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
        v.play().catch(() => setLanded(true));
      },
      { threshold: 0.35 }
    );
    io.observe(s);
    return () => {
      io.disconnect();
      stop();
    };
  }, [reduceMotion, stop]);

  const target = landed ? slotAt : perchAt;
  const clipped = !landed && !reduceMotion;

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
            onPlay={uncover}
            onPause={stop}
            onEnded={() => {
              stop();
              setLanded(true);
            }}
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

      {/* The card that stays: once the lid has uncovered it, it keeps
          standing on the platter for the rest of the clip. */}
      {perchAt && (
        <img
          ref={onPlate}
          src="/menu.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute block"
          style={{
            left: perchAt.left,
            top: perchAt.top,
            width: perchAt.width,
            clipPath: clipped ? 'inset(100% 0 0 0)' : 'none',
          }}
        />
      )}

      {/* And the copy that leaves: it sits exactly on the one above until the
          lid reaches the top, then flies into its column and grows. */}
      {slotAt && target && (
        <motion.div
          initial={false}
          animate={{ x: target.left, y: target.top, scale: target.width / slotAt.width }}
          transition={
            landed
              ? { type: 'spring', stiffness: 90, damping: 18 }
              : { duration: 0.35, ease: 'easeOut' }
          }
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: slotAt.width,
            transformOrigin: 'top left',
          }}
        >
          <img
            ref={sheet}
            src="/menu.webp"
            alt="The menu — what I bring to the table: brand thinking, creative direction, marketing mindset, from idea to execution."
            className="block w-full"
            style={{
              /* Starts behind the lid; the film uncovers it from the foot up. */
              clipPath: clipped ? 'inset(100% 0 0 0)' : 'none',
              /* It reads as paper on the page, not as part of the film. */
              filter: 'drop-shadow(0 14px 34px rgba(60,44,30,0.28))',
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
