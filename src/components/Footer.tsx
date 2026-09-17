'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

// Mirrors the header: sections on the single home page.
const navLinks = [
  { key: 'about', href: '/#about' },
  { key: 'background', href: '/background' },
  { key: 'clients', href: '/clients' },
  { key: 'contact', href: '/contact' },
] as const;

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-greige/40 py-12 md:py-16 bg-bg-base">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/n-logo-2.png" alt="6del8" className="h-10 w-auto" />
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href || "/"}
                className="text-sm uppercase tracking-[0.15em] text-warm-dark hover:text-warm-darker transition-colors font-medium"
              >
                {t(`header.nav.${key}`)}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/seisdelocho"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-dark hover:text-warm-darker transition-colors"
              aria-label="Instagram @seisdelocho"
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

        <div className="border-t border-greige/40 pt-8 text-center">
          <p className="text-sm text-greige">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
