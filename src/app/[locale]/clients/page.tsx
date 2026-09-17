'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { clients } from '@/content/portfolio';

export default function ClientsPage() {
  const locale = useLocale();

  return (
    <section className="section bg-bg-base">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href={`/${locale}`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-warm-dark transition-colors hover:text-warm-darker"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

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

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
          }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-3"
        >
          {clients.map((c) => (
            <motion.figure
              key={c.name}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="m-0"
            >
              {c.cover ? (
                // The card is a designed piece with its own edges and shadow,
                // so it sits on the page rather than inside a frame.
                <img
                  src={c.cover}
                  alt={`${c.name} — client cover`}
                  className="h-auto w-full"
                  loading="lazy"
                />
              ) : (
                <div className="flex aspect-[1414/2000] items-center justify-center border border-warm-light bg-bg-elevated p-6">
                  <span className="text-center font-decorative text-xl font-bold text-warm-darker">
                    {c.name}
                  </span>
                </div>
              )}
              {/* The covers carry the name and dates; this keeps them available
                  to screen readers and to anyone the images fail to load for. */}
              <figcaption className="sr-only">
                {c.name} · {c.when}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <p className="mt-14 text-center text-sm text-greige">
          {clients.length} brands · 2019 to today
        </p>
      </div>
    </section>
  );
}
