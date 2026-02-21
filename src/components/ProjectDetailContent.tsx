'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const categoryLabels: Record<string, string> = {
  branding: 'Branding',
  product: 'Product Design',
  events: 'Events',
  photography: 'Photography',
  marketing: 'Marketing',
};

interface ProjectImage {
  id: string;
  url: string;
  altText: string;
  caption: string | null;
  width: number;
  height: number;
}

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string | null;
  images: ProjectImage[];
}

export function ProjectDetailContent({
  project,
  locale,
}: {
  project: ProjectData;
  locale: string;
}) {
  const t = useTranslations('portfolio');

  return (
    <>
      {/* Hero */}
      <section className="gradient-warm py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/${locale}/#work`}
              className="inline-flex items-center gap-2 text-sm text-warm-dark hover:text-warm-darker transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToWork')}
            </Link>

            {project.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-warm-light/30 text-warm-darker rounded-full">
                  {categoryLabels[project.category] || project.category}
                </span>
              </div>
            )}

            <h1
              className="font-script text-warm-darker mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h1>
            <p className="text-lg text-warm-dark font-light max-w-prose leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      {project.imageUrl && (
        <section className="container-custom -mt-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </section>
      )}

      {/* Gallery */}
      {project.images.length > 1 && (
        <section className="container-custom mb-16 md:mb-24">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {project.images
              .filter((img) => img.url !== project.imageUrl)
              .map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="break-inside-avoid rounded-xl overflow-hidden"
                >
                  <Image
                    src={img.url}
                    alt={img.altText || `${project.title} - Image ${i + 1}`}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto"
                  />
                  {img.caption && (
                    <p className="text-sm text-warm-dark mt-2 px-1">
                      {img.caption}
                    </p>
                  )}
                </motion.div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
