'use client';

import { useRef, useState } from 'react';
import { strengths } from '@/content/portfolio';

/* Each camera's screen sits in a different spot on its body, so the panel is
   placed per camera — measured off the rotated artwork, as a share of it. */
const cameras = [
  { src: '/cameras/blue.webp',   left: 8.6, top: 15.8, width: 58.3, height: 68.2 },
  { src: '/cameras/silver.webp', left: 7.3, top: 28.1, width: 50.3, height: 57.6 },
  { src: '/cameras/green.webp',  left: 4.4, top: 28.1, width: 51.5, height: 57.0 },
  { src: '/cameras/gold.webp',   left: 7.2, top: 17.6, width: 56.8, height: 72.5 },
  { src: '/cameras/red.webp',    left: 6.6, top: 18.9, width: 60.8, height: 73.4 },
  { src: '/cameras/pink.webp',   left: 8.3, top: 22.1, width: 58.3, height: 66.3 },
] as const;

export function Strengths() {
  const strip = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  // Trackpads and touch scroll this sideways on their own; this adds
  // click-and-pull for anyone on a plain mouse.
  const onPointerDown = (e: React.PointerEvent) => {
    const el = strip.current;
    if (!el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = strip.current;
    if (!el || !drag.current) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = (e: React.PointerEvent) => {
    drag.current = null;
    setDragging(false);
    strip.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={strip}
      role="region"
      aria-label="Core strengths"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`flex snap-x gap-4 overflow-x-auto pb-4 ${
        dragging ? 'cursor-grabbing select-none' : 'cursor-grab'
      }`}
    >
      {strengths.map((s, i) => {
        const cam = cameras[i % cameras.length];
        return (
          <figure key={s} className="relative m-0 w-[300px] flex-none snap-center md:w-[340px]">
            <img
              src={cam.src}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-auto w-full"
            />
            <figcaption
              className="absolute grid place-items-center px-2 text-center"
              style={{
                left: `${cam.left}%`,
                top: `${cam.top}%`,
                width: `${cam.width}%`,
                height: `${cam.height}%`,
              }}
            >
              <span className="text-[.7rem] font-bold uppercase leading-tight tracking-[0.1em] text-warm-darker">
                {s}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
