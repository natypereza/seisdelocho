import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-neutral-200 py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-light uppercase tracking-widest text-neutral-600 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${t('contact.email')}`}
                  className="text-base text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  {t('contact.email')}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t('contact.phone')}`}
                  className="text-base text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  {t('contact.phone')}
                </a>
              </li>
              <li className="text-base text-neutral-700">
                {t('contact.location')}
              </li>
            </ul>
          </div>

          {/* Social Media - Only Instagram + Email */}
          <div>
            <h3 className="text-sm font-light uppercase tracking-widest text-neutral-600 mb-4">
              Social
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-light uppercase tracking-widest text-neutral-600 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-base text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-base text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-base text-neutral-700 hover:text-neutral-900 transition-colors"
                >
                  Skills
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8 text-center">
          <p className="text-sm text-neutral-500">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
