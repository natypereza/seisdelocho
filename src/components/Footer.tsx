import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-neutral-200 py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-light uppercase tracking-widest text-neutral-600 mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${t('contact.email')}`}
                  className="inline-flex items-center gap-3 text-base text-neutral-700 hover:text-accent transition-colors py-2 min-h-[44px]"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  {t('contact.email')}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t('contact.phone')}`}
                  className="inline-flex items-center gap-3 text-base text-neutral-700 hover:text-accent transition-colors py-2 min-h-[44px]"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  {t('contact.phone')}
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-base text-neutral-700 py-2">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                {t('contact.location')}
              </li>
            </ul>
          </div>

          {/* Social Media - Only Instagram + Email */}
          <div>
            <h3 className="text-sm font-light uppercase tracking-widest text-neutral-600 mb-6">
              Social
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://instagram.com/natapereza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base text-neutral-700 hover:text-accent transition-colors py-2 min-h-[44px]"
                >
                  <Instagram className="w-5 h-5 flex-shrink-0" />
                  @natapereza
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/seisdelocho_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base text-neutral-700 hover:text-accent transition-colors py-2 min-h-[44px]"
                >
                  <Instagram className="w-5 h-5 flex-shrink-0" />
                  @seisdelocho_
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-light uppercase tracking-widest text-neutral-600 mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-base text-neutral-700 hover:text-accent transition-colors py-2 min-h-[44px] inline-block"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-base text-neutral-700 hover:text-accent transition-colors py-2 min-h-[44px] inline-block"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-base text-neutral-700 hover:text-accent transition-colors py-2 min-h-[44px] inline-block"
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
