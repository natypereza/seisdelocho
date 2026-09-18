'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function ContactBlock() {
  const t = useTranslations('contact');

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const link =
    'w-fit border-b border-warm-darker/40 text-warm-darker transition-colors hover:border-warm-darker';

  return (
    // Photo and content share one grid cell: the frame shows whole, at its own
    // tone and proportions, and the section is as tall as whichever is taller.
    <section id="contact" className="relative grid scroll-mt-24 overflow-hidden bg-bg-base">
      <img
        src="/pajaritos-color.webp"
        alt=""
        aria-hidden="true"
        className="col-start-1 row-start-1 w-full"
      />

      <div className="col-start-1 row-start-1 flex items-start pt-10 pb-10 md:pt-14 md:pb-14">
        {/* w-full: container-custom carries mx-auto, which would otherwise
            shrink-wrap and centre this inside the flex row. */}
        <div className="w-full container-custom">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Peach on the blue sky: warm against cool, and the same hue as
                the birds. The shadow carries it across the white clouds. */}
            <motion.h2
              variants={item}
              className="font-script text-peach"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 8.5rem)',
                lineHeight: 1,
                textShadow: '0 2px 24px rgba(0,0,0,0.45)',
              }}
            >
              {t('heading')}
            </motion.h2>

            <motion.div
              variants={item}
              className="mt-6 max-w-md border border-warm-light bg-bg-base/90 p-7 backdrop-blur-[2px] md:p-8"
            >
              <div className="grid gap-2.5 text-base">
                <a href={`mailto:${t('email')}`} className={link}>
                  {t('email')}
                </a>
                <a
                  href="https://wa.me/50256968292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  {t('whatsapp')}
                </a>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-warm-darker">
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
