import { useTranslations } from 'next-intl';
import type { EducationItem } from '@/types';

export function Education() {
  const t = useTranslations('education');
  const items: EducationItem[] = t.raw('items');

  return (
    <section className="section bg-neutral-50">
      <div className="container-custom">
        <h2 className="section-heading">{t('heading')}</h2>

        <div className="max-w-3xl">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative pl-8 md:pl-10 pb-12 md:pb-16 border-l-2 border-neutral-300"
            >
              <div className="absolute -left-[9px] md:-left-[11px] top-0 w-4 md:w-5 h-4 md:h-5 rounded-full bg-neutral-900" />

              <div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-medium text-neutral-900">
                    {item.degree}
                  </h3>
                  {item.current && (
                    <span className="text-xs font-light uppercase tracking-widest text-neutral-500 md:text-right">
                      {t('current')}
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base text-neutral-600 mb-1">
                  {item.institution}
                </p>
                {item.location && (
                  <p className="text-sm text-neutral-500 mb-2">
                    {item.location}
                  </p>
                )}
                {item.year && (
                  <p className="text-sm text-neutral-500">
                    {item.year}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
