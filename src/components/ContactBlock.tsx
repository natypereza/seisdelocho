'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';

/* lucide has no WhatsApp mark, so its glyph is drawn here. */
function WhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/* The window cut into the frame, measured off the artwork. */
const WINDOW = { left: 5.2, top: 5.9, width: 90.3, height: 69.0 };

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

  const row =
    'group inline-flex items-center gap-3 text-warm-dark transition-colors hover:text-warm-darker';
  const glyph = 'h-[18px] w-[18px] flex-none text-greige transition-colors group-hover:text-warm-darker';
  const label = 'border-b border-warm-darker/25 transition-colors group-hover:border-warm-darker';

  return (
    <section id="contact" className="scroll-mt-24 bg-bg-base py-16 md:py-24">
      <div className="container-custom">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid items-center gap-10 md:grid-cols-[1fr_1.3fr] md:gap-12"
        >
          <div>
            <motion.h2
              variants={item}
              className="font-decorative font-medium text-warm-darker"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}
            >
              {t('heading')}
            </motion.h2>

            <motion.div variants={item} className="mt-7 grid gap-3.5 text-base">
              <a href={`mailto:${t('email')}`} className={row}>
                <Mail className={glyph} strokeWidth={1.75} />
                <span className={label}>{t('email')}</span>
              </a>
              <a
                href="https://wa.me/50256968292"
                target="_blank"
                rel="noopener noreferrer"
                className={row}
              >
                <WhatsApp className={glyph} />
                <span className={label}>{t('whatsapp')}</span>
              </a>
              <a
                href="https://www.instagram.com/seisdelocho_/"
                target="_blank"
                rel="noopener noreferrer"
                className={row}
              >
                <Instagram className={glyph} strokeWidth={1.75} />
                <span className={label}>@seisdelocho_</span>
              </a>
              <a
                href="https://www.instagram.com/natapereza/"
                target="_blank"
                rel="noopener noreferrer"
                className={row}
              >
                <Instagram className={glyph} strokeWidth={1.75} />
                <span className={label}>@natapereza</span>
              </a>
            </motion.div>
          </div>

          <motion.div variants={item} className="flex items-center justify-center gap-4 sm:gap-6">
            {/* The photo sits behind the frame and shows through its window. */}
            <div className="relative w-[62%] max-w-[420px] flex-none">
              <img
                src="/pajaritos-color.webp"
                alt="Swallows on the wires"
                className="absolute object-cover"
                style={{
                  left: `${WINDOW.left}%`,
                  top: `${WINDOW.top}%`,
                  width: `${WINDOW.width}%`,
                  height: `${WINDOW.height}%`,
                }}
              />
              <img
                src="/photo-frame.webp"
                alt=""
                aria-hidden="true"
                className="relative w-full drop-shadow-[0_12px_30px_rgba(60,44,30,0.18)]"
              />
            </div>

            {/* Tilted a touch, so the two read as things laid down together
                rather than two pictures in a row. */}
            <img
              src="/creativity-card.webp"
              alt="Creativity without rules — Natalia Pérez"
              className="w-[34%] max-w-[220px] flex-none -rotate-3 drop-shadow-[0_12px_30px_rgba(60,44,30,0.18)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
