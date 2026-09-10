'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectImage {
  id: string;
  url: string;
  altText: string | null;
  caption: string | null;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string;
  images: ProjectImage[];
}

interface ServiceDetailContentProps {
  translationKey: string;
  projects: Project[];
  locale: string;
}

export function ServiceDetailContent({ translationKey, projects, locale }: ServiceDetailContentProps) {
  const t = useTranslations('services');

  return (
    <>
      {/* Service header */}
      <section className="py-16 md:py-24 bg-bg-base">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm text-warm-dark hover:text-warm-darker transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToServices')}
            </Link>

            <h1
              className="font-decorative text-warm-darker mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2 }}
            >
              {t(`${translationKey}.title`)}
            </h1>

            <p className="text-lg md:text-xl text-warm-dark font-light leading-relaxed">
              {t(`${translationKey}.description`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work gallery */}
      {projects.length > 0 && (
        <section className="pb-16 md:pb-24 bg-bg-base">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group"
                >
                  <Link href={`/${locale}/project/${project.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-warm-darker/0 group-hover:bg-warm-darker/20 transition-colors duration-300" />
                    </div>
                    <h3 className="mt-3 text-warm-darker font-medium">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-warm-dark font-light mt-1">
                        {project.description}
                      </p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
