'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function ContactBlock() {
  const t = useTranslations('contact');

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    // Black ground with peach type — the closing block of the 6del8 portfolio.
    <section id="contact" className="scroll-mt-24 bg-black py-16 text-peach md:py-24">
      <div className="container-custom">
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
                className="w-fit border-b border-peach/40 transition-colors hover:border-peach"
              >
                {t('email')}
              </a>
              <a
                href="https://wa.me/50256968292"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit border-b border-peach/40 transition-colors hover:border-peach"
              >
                {t('whatsapp')}
              </a>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href="https://instagram.com/seisdelocho_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-peach/40 transition-colors hover:border-peach"
                >
                  @seisdelocho_
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="https://instagram.com/natapereza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-peach/40 transition-colors hover:border-peach"
                >
                  @natapereza
                </a>
              </div>
              <p className="mt-2 text-sm text-peach/70">Guatemala City, Guatemala</p>
            </motion.div>
          </div>

          <motion.img
            variants={item}
            src="/logo-6del8.png"
            alt="6del8"
            /* Black artwork on transparency, inverted to read on the dark ground. */
            className="h-auto w-44 justify-self-start opacity-95 invert md:w-52 md:justify-self-end"
          />
        </motion.div>
      </div>
    </section>
  );
}
