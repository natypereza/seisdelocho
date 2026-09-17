'use client';

import { education, experience, tools, languages, certifications } from '@/content/portfolio';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-warm-light bg-bg-elevated p-6 md:p-7">
      <h2 className="mb-5 font-decorative text-2xl font-bold italic tracking-tight text-warm-darker">
        {title}
      </h2>
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

/* Three columns, each stacking its own cards, so a short card never leaves a
   gap under it the way row alignment would. */
export function CvGrid() {
  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div className="grid content-start gap-5">
        <Card title="education">
          {education.map((e) => (
            <Entry key={e.what} {...e} />
          ))}
        </Card>
        <Card title="languages">
          {languages.map((l) => (
            <div
              key={l.name}
              className="flex items-center justify-between gap-4 border-t border-warm-light py-3 first:border-t-0 first:pt-0"
            >
              <span>
                <span className="block text-[.95rem] font-bold text-warm-darker">{l.name}</span>
                <span className="block text-[.72rem] italic text-greige">{l.note}</span>
              </span>
              <Dots level={l.level} />
            </div>
          ))}
        </Card>
      </div>

      <div className="grid content-start gap-5">
        <Card title="experience">
          {experience.map((e) => (
            <Entry key={`${e.what}-${e.where}`} {...e} />
          ))}
        </Card>
      </div>

      <div className="grid content-start gap-5">
        <Card title="software &amp; tools">
          {tools.map((t) => (
            <p
              key={t.name}
              className="border-t border-warm-light py-2.5 text-[.95rem] font-bold text-warm-darker first:border-t-0 first:pt-0"
            >
              {t.name}
              {t.note && (
                <span className="text-[.85rem] font-normal italic text-greige"> — {t.note}</span>
              )}
            </p>
          ))}
        </Card>
        <Card title="certifications">
          {certifications.map((c) => (
            <div
              key={c.title}
              className="flex items-baseline justify-between gap-3 border-t border-warm-light py-2.5 text-[.9rem] first:border-t-0 first:pt-0"
            >
              <span className="text-warm-dark">{c.title}</span>
              <span className="flex-none text-[.78rem] text-greige tabular-nums">{c.year}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
