'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale as any });
  };

  return (
    <nav aria-label="Language selection" className="language-switcher">
      <div className="flex gap-2">
        {['en', 'es', 'nl'].map((lang) => (
          <button
            key={lang}
            onClick={() => handleChange(lang)}
            aria-label={`Switch to ${lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : 'Dutch'}`}
            aria-current={locale === lang ? 'page' : undefined}
            className={`text-[11px] font-light tracking-wide transition-colors touch-target ${
              locale === lang
                ? 'text-warm-darker'
                : 'text-greige hover:text-warm-dark'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}
