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
    <div className="flex gap-4">
      {['EN', 'ES', 'NL'].map((lang) => (
        <button
          key={lang}
          onClick={() => handleChange(lang.toLowerCase())}
          className={`text-sm font-light tracking-wider transition-colors ${
            locale === lang.toLowerCase()
              ? 'text-neutral-900'
              : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
