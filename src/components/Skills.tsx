import { Palette, Code, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Skills() {
  const t = useTranslations('skills');
  const categories = t.raw('categories');
  const items = t.raw('items');

  const iconMap = {
    languages: Palette,
    design: Code,
    strengths: Sparkles,
  };

  return (
    <section id="skills" className="section bg-white">
      <div className="container-custom">
        <h2 className="section-heading">{t('heading')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Languages */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-accent" />
              <h3 className="text-lg md:text-xl font-medium text-neutral-900">
                {categories.languages}
              </h3>
            </div>
            <ul className="space-y-3">
              {(items.languages as string[]).map((skill, index) => (
                <li key={index} className="text-base text-neutral-700 hover:text-accent transition-colors">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Design Tools */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-accent" />
              <h3 className="text-lg md:text-xl font-medium text-neutral-900">
                {categories.design}
              </h3>
            </div>
            <ul className="space-y-3">
              {(items.design as string[]).map((skill, index) => (
                <li key={index} className="text-base text-neutral-700 hover:text-accent transition-colors">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Strengths */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-accent" />
              <h3 className="text-lg md:text-xl font-medium text-neutral-900">
                {categories.strengths}
              </h3>
            </div>
            <ul className="space-y-3">
              {(items.strengths as string[]).map((skill, index) => (
                <li key={index} className="text-base text-neutral-700 hover:text-accent transition-colors">
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
