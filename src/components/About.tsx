import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations();

  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8">
            <h2 className="section-heading">{t('about.heading')}</h2>
            <p className="text-lg md:text-body-lg text-neutral-700 leading-relaxed mb-6">
              {t('about.bio')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
