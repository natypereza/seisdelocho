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
      <div className="flex gap-1 bg-neutral-100 rounded-full p-1">
        {['en', 'es', 'nl'].map((lang) => (
          <button
            key={lang}
            onClick={() => handleChange(lang)}
            aria-label={`Switch to ${lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : 'Dutch'}`}
            aria-current={locale === lang ? 'page' : undefined}
            className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium touch-target ${
              locale === lang
                ? 'bg-white shadow-sm text-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}
