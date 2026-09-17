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
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
          className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map((c) => (
            <motion.div
              key={c.name}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              className="flex flex-col border border-warm-light bg-bg-elevated"
            >
              {/* Fixed-ratio plate so every tile lines up whether it holds a
                  logo or the name standing in for one. */}
              <div className="flex aspect-[4/3] items-center justify-center p-6">
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-center font-decorative text-lg font-bold leading-tight text-warm-darker md:text-xl">
                    {c.name}
                  </span>
                )}
              </div>
              <div className="border-t border-warm-light px-4 py-3">
                <p className="text-[.8rem] font-bold uppercase tracking-[0.12em] text-warm-darker">
                  {c.name}
                </p>
                <p className="text-[.78rem] text-greige tabular-nums">{c.when}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-12 text-center text-sm text-greige">
          {clients.length} brands · 2019 to today
        </p>
      </div>
    </section>
  );
}
