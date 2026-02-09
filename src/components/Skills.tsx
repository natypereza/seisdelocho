import { useTranslations } from 'next-intl';

export function Skills() {
  const t = useTranslations('skills');
  const categories = t.raw('categories');
  const items = t.raw('items');

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <h2 className="section-heading">{t('heading')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Languages */}
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-6 text-neutral-900">
              {categories.languages}
            </h3>
            <ul className="space-y-3">
              {(items.languages as string[]).map((skill, index) => (
                <li key={index} className="text-base text-neutral-700">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Design Tools */}
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-6 text-neutral-900">
              {categories.design}
            </h3>
            <ul className="space-y-3">
              {(items.design as string[]).map((skill, index) => (
                <li key={index} className="text-base text-neutral-700">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-6 text-neutral-900">
              {categories.strengths}
            </h3>
            <ul className="space-y-3">
              {(items.strengths as string[]).map((skill, index) => (
                <li key={index} className="text-base text-neutral-700">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
