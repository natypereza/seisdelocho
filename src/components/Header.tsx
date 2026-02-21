'use client';

import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['work', 'services', 'about', 'contact'] as const;

export function Header() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <header className="fixed top-0 w-full bg-bg-base/95 backdrop-blur-sm border-b border-warm-accent/50 z-50">
        <div className="container-custom h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="hover:opacity-80 transition-opacity">
            <img src="/n-logo-2.png" alt="6del8" className="h-10 md:h-14 w-auto" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-sm uppercase tracking-[0.15em] text-warm-dark hover:text-warm-darker transition-colors font-medium"
              >
                {t(`header.nav.${key}`)}
              </a>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-warm-darker touch-target"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-bg-base border-t border-warm-accent/30"
              aria-label="Mobile navigation"
            >
              <div className="container-custom py-4 flex flex-col gap-2">
                {navLinks.map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 text-sm uppercase tracking-[0.15em] text-warm-dark hover:text-warm-darker transition-colors font-medium"
                  >
                    {t(`header.nav.${key}`)}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
