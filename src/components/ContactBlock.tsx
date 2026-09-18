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

export function ContactBlock() {
  const t = useTranslations('contact');

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  /* 48px keeps each a comfortable tap target even though the mark is 30px. */
  const dot =
    'grid h-14 w-14 place-items-center text-peach transition-transform duration-300 hover:scale-110';
  const glyph = 'h-[34px] w-[34px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]';

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

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="col-start-1 row-start-1 flex flex-col justify-between py-9 md:py-12"
      >
        {/* Peach on the blue sky: warm against cool, and the same hue as the
            birds. The shadow carries it across the white clouds. */}
        <motion.h2
          variants={item}
          className="w-full container-custom font-script text-peach"
          style={{
            fontSize: 'clamp(3.5rem, 11vw, 8.5rem)',
            lineHeight: 1,
            textShadow: '0 2px 24px rgba(0,0,0,0.45)',
          }}
        >
          {t('heading')}
        </motion.h2>

        <motion.div variants={item} className="w-full container-custom">
          <div className="-ml-3 flex items-center gap-1">
            <a href={`mailto:${t('email')}`} className={dot} aria-label={`Email ${t('email')}`}>
              <Mail className={glyph} strokeWidth={1.75} />
            </a>
            <a
              href="https://wa.me/50256968292"
              target="_blank"
              rel="noopener noreferrer"
              className={dot}
              aria-label={`WhatsApp ${t('whatsapp')}`}
            >
              <WhatsApp className={glyph} />
            </a>
            <a
              href="https://www.instagram.com/natapereza/"
              target="_blank"
              rel="noopener noreferrer"
              className={dot}
              aria-label="Instagram @natapereza"
            >
              <Instagram className={glyph} strokeWidth={1.75} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
