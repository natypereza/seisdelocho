import { useTranslations } from 'next-intl';
import type { CertificationItem } from '@/types';

export function Certifications() {
  const t = useTranslations('certifications');
  const items: CertificationItem[] = t.raw('items');

  return (
    <section id="certifications" className="section bg-white">
      <div className="container-custom">
        <h2 className="section-heading">{t('heading')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-neutral-200 p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent"
            >
              <h3 className="text-lg md:text-xl font-medium mb-2 text-neutral-900">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-3">
                {item.issuer}
              </p>
              <p className="text-sm text-neutral-500">
                {item.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
