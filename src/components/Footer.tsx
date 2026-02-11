'use client';

import { useTranslations } from 'next-intl';
import { Instagram } from 'lucide-react';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-warm-light py-12 md:py-16 bg-bg-base">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <a href="#" className="font-script text-3xl text-warm-darker hover:text-warm-base transition-colors">
            6del8
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {(['work', 'services', 'about', 'contact'] as const).map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-sm uppercase tracking-[0.15em] text-warm-dark hover:text-warm-darker transition-colors font-medium"
              >
                {t(`footer.${key}`)}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/seisdelocho_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-dark hover:text-warm-darker transition-colors"
              aria-label="Instagram @seisdelocho_"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/natapereza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-dark hover:text-warm-darker transition-colors"
              aria-label="Instagram @natapereza"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-warm-light pt-8 text-center">
          <p className="text-sm text-warm-base">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
