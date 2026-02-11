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
      <div className="flex gap-1 bg-warm-light/30 rounded-full p-1">
        {['en', 'es', 'nl'].map((lang) => (
          <button
            key={lang}
            onClick={() => handleChange(lang)}
            aria-label={`Switch to ${lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : 'Dutch'}`}
            aria-current={locale === lang ? 'page' : undefined}
            className={`px-3 py-1.5 rounded-full transition-all duration-300 text-xs font-medium touch-target ${
              locale === lang
                ? 'bg-bg-elevated shadow-sm text-warm-darker'
                : 'text-warm-dark hover:text-warm-darker'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}
