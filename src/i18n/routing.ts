import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Spanish and Dutch are paused; their messages files are kept in
  // src/messages so they can be switched back on by listing them here.
  locales: ['en'],
  defaultLocale: 'en',
  // Single locale, so URLs carry no /en prefix.
  localePrefix: 'never',
});

export type Locale = (typeof routing.locales)[number];

export const { usePathname, useRouter } = createSharedPathnamesNavigation(routing);
