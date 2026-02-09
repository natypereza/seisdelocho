import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <header className="fixed top-0 w-full bg-white border-b border-neutral-200 z-50">
        <div className="container-custom h-16 md:h-20 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-light tracking-wider">
            {t('header.name')}
          </h1>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
}
