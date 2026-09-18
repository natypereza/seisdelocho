'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function ContactBlock() {
  const t = useTranslations('contact');

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    // The birds frame carries the closing block. It is a high-key photo, so the
    // type is black and a light veil keeps it legible over the darker wires.
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-bg-base py-16 text-warm-darker md:py-24"
    >
      <img
        src="/pajaritos.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-bg-base/[0.55]" />

      <div className="container-custom relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid items-end gap-10 md:grid-cols-[1fr_auto]"
        >
          <div>
            <motion.h2
              variants={item}
              className="font-script"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)', lineHeight: 1 }}
            >
              {t('heading')}
            </motion.h2>

            <motion.div variants={item} className="mt-6 grid gap-2.5 text-base md:text-lg">
              <a
                href={`mailto:${t('email')}`}
                className="w-fit border-b border-warm-darker/40 transition-colors hover:border-warm-darker"
              >
                {t('email')}
              </a>
              <a
                href="https://wa.me/50256968292"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit border-b border-warm-darker/40 transition-colors hover:border-warm-darker"
              >
                {t('whatsapp')}
              </a>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href="https://www.instagram.com/seisdelocho_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-warm-darker/40 transition-colors hover:border-warm-darker"
                >
                  @seisdelocho_
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="https://www.instagram.com/natapereza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-warm-darker/40 transition-colors hover:border-warm-darker"
                >
                  @natapereza
                </a>
              </div>
              <p className="mt-2 text-sm text-warm-dark">Guatemala City, Guatemala</p>
            </motion.div>
          </div>

          <motion.img
            variants={item}
            src="/logo-6del8.png"
            alt="6del8"
            /* Black artwork on transparency — no invert now the ground is light. */
            className="h-auto w-44 justify-self-start opacity-90 md:w-52 md:justify-self-end"
          />
        </motion.div>
      </div>
    </section>
  );
}
