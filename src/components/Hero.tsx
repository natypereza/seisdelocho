import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations();

  return (
    <section className="pt-40 md:pt-48 pb-16 md:pb-32 bg-white">
      <div className="container-custom">
        <div className="max-w-prose">
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6 md:mb-8">
            {t('header.name')}
          </h1>
          <p className="text-2xl md:text-3xl font-light text-neutral-600 mb-8 md:mb-12">
            {t('hero.title')}
          </p>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 md:mb-12 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${t('contact.email')}`}
              className="px-8 py-3 border border-neutral-900 text-neutral-900 text-center hover:bg-neutral-900 hover:text-white transition-colors inline-block"
            >
              {t('hero.cta')}
            </a>
            <a
              href={`tel:${t('contact.phone')}`}
              className="px-8 py-3 text-neutral-600 text-center hover:text-neutral-900 transition-colors inline-block"
            >
              {t('contact.phone')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
