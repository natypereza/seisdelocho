'use client';

import { useRef, useState } from 'react';
import { strengths } from '@/content/portfolio';

/* One camera per strength, every image on the same canvas so the bodies
   match in scale. Screen rectangles are measured against that canvas. */
const cameras = [
  { src: '/cameras/a.webp', left: 13.5, top: 33.9, width: 39.1, height: 50.0, photo: '/photos/1.webp' },
  { src: '/cameras/b.webp', left: 16.2, top: 13.2, width: 48.4, height: 72.1, photo: '/photos/2.webp' },
  { src: '/cameras/c.webp', left: 15.2, top: 13.2, width: 48.8, height: 72.9, photo: '/photos/3.webp' },
  { src: '/cameras/d.webp', left: 11.3, top: 18.9, width: 51.4, height: 69.3, photo: '/photos/4.webp' },
  { src: '/cameras/e.webp', left: 10.2, top: 23.9, width: 54.9, height: 62.1, photo: '/photos/5.webp' },
  { src: '/cameras/f.webp', left: 7.4,  top: 17.9, width: 55.3, height: 66.1, photo: '/photos/6.webp' },
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
              <span className="absolute inset-0 grid place-items-center px-2 text-center text-[.95rem] font-bold uppercase leading-[1.15] tracking-[0.1em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] md:text-[1.05rem]">
                {/* Two words take a line each, so they read as a pair rather
                    than wrapping wherever the screen happens to end. */}
                <span>
                  {s.split(' ').map((word) => (
                    <span key={word} className="block">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
