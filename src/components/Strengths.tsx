'use client';

import { useRef, useState } from 'react';
import { strengths } from '@/content/portfolio';

/* One camera per strength, with its screen's rectangle measured off that
   camera's own crop — each model wears its screen in a different spot.
   `photo` is what shows in the screen; fotos 1-3 are still to come, so the
   three in hand repeat for now. */
const cameras = [
  { src: '/cameras/a.webp', left: 8.3,  top: 34.1, width: 44.7, height: 50.3, photo: '/photos/4.webp' },
  { src: '/cameras/b.webp', left: 11.6, top: 13.5, width: 55.6, height: 71.6, photo: '/photos/5.webp' },
  { src: '/cameras/c.webp', left: 10.4, top: 13.7, width: 55.4, height: 72.6, photo: '/photos/6.webp' },
  { src: '/cameras/d.webp', left: 7.9,  top: 18.9, width: 56.1, height: 69.2, photo: '/photos/4.webp' },
  { src: '/cameras/e.webp', left: 8.8,  top: 23.9, width: 56.9, height: 62.0, photo: '/photos/5.webp' },
  { src: '/cameras/f.webp', left: 7.2,  top: 17.6, width: 55.7, height: 66.2, photo: '/photos/6.webp' },
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
              className="absolute overflow-hidden"
              style={{
                left: `${cam.left}%`,
                top: `${cam.top}%`,
                width: `${cam.width}%`,
                height: `${cam.height}%`,
              }}
            >
              <img
                src={cam.photo}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* The frames are dark and busy, so the type sits on a wash. */}
              <span aria-hidden="true" className="absolute inset-0 bg-black/35" />
              <span className="absolute inset-0 grid place-items-center px-2 text-center text-[.7rem] font-bold uppercase leading-tight tracking-[0.1em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                {s}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
