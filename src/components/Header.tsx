import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <header className="fixed top-0 w-full bg-bg-base/95 backdrop-blur-sm border-b border-warm-accent z-50">
        <div className="container-custom h-16 md:h-20 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-decorative font-semibold tracking-wider text-warm-darker">
            {t('header.name')}
          </h1>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
}
