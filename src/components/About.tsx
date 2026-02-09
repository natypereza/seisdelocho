import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations();

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <h2 className="section-heading">{t('about.heading')}</h2>
        <div className="max-w-prose">
          <p className="text-lg md:text-body-lg text-neutral-700 leading-relaxed mb-6">
            {t('about.bio')}
          </p>
        </div>
      </div>
    </section>
  );
}
