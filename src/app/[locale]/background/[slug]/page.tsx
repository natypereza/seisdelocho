'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { bySlug } from '@/content/experience';

/* One template for all five roles. Each carries a different number of projects
   and images, so every part below renders only when there is something in it. */
export default function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const e = bySlug(slug);
  if (!e) notFound();

  return (
    <div className="bg-bg-base pt-5 pb-24 md:pt-7 md:pb-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/background#experience"
            className="mb-10 inline-flex items-center gap-2 text-sm text-warm-dark transition-colors hover:text-warm-darker md:mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to experience
          </Link>

          {/* header */}
          <p className="text-[.7rem] font-bold uppercase tracking-[0.18em] text-greige tabular-nums">
            {e.when}
          </p>
          <h1 className="mt-2 font-decorative text-3xl font-bold leading-tight text-warm-darker md:text-5xl">
            {e.pageTitle ?? e.org.split(' · ')[0]}
          </h1>
          <p className="mt-2 text-base text-warm-dark md:text-lg">{e.role}</p>
        </motion.div>

        {/* about + what I do */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-12 grid gap-8 border-t border-warm-accent pt-10 md:mt-16 lg:grid-cols-2 lg:gap-12"
        >
          {e.about && (
            <div>
              <p className="text-[.68rem] font-bold uppercase tracking-[0.22em] text-greige">About</p>
              <p className="mt-2 text-[.95rem] leading-relaxed text-warm-dark">{e.about}</p>
            </div>
          )}
          <div>
            <p className="text-[.68rem] font-bold uppercase tracking-[0.22em] text-greige">
              {e.didLabel}
            </p>
            <p className="mt-2 text-[.95rem] leading-relaxed text-warm-dark">{e.did}</p>
          </div>
        </motion.div>

        {/* projects */}
        <section className="mt-16 border-t border-warm-accent pt-10 md:mt-20 md:pt-14">
          <div className="grid gap-6 md:grid-cols-[minmax(0,200px)_1fr] md:gap-10">
            <h2 className="font-decorative text-2xl font-bold italic text-warm-darker md:text-[1.75rem]">
              projects
            </h2>

            <div className="grid gap-10 md:gap-14">
              {e.projects?.map((p) => (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-decorative text-xl font-bold text-warm-darker md:text-2xl">
                    {p.title}
                  </h3>
                  {p.meta && (
                    <p className="mt-1 text-[.7rem] font-bold uppercase tracking-[0.18em] text-greige">
                      {p.meta}
                    </p>
                  )}
                  <p className="mt-3 max-w-[70ch] text-[.95rem] leading-relaxed text-warm-dark">
                    {p.body}
                  </p>

                  {p.bullets && (
                    <ul className="mt-4 grid gap-1.5">
                      {p.bullets.map((b) => (
                        <li
                          key={b}
                          className="border-t border-warm-light pt-1.5 text-[.9rem] text-warm-dark"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Placeholders name what each slot is for, so the page reads
                      as unfinished on purpose rather than broken. */}
                  {p.awaiting && (
                    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                      {p.awaiting.map((a) => (
                        <div
                          key={a}
                          className="grid aspect-[4/3] place-items-center border border-warm-light bg-bg-elevated px-3 text-center"
                          role="img"
                          aria-label={`${a} — image to come`}
                        >
                          <span className="font-decorative text-[.85rem] italic text-greige">
                            {a}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.article>
              ))}

              {e.projectsNote && (
                <p className="max-w-[70ch] border-t border-warm-light pt-5 text-[.9rem] italic leading-relaxed text-greige">
                  {e.projectsNote}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
