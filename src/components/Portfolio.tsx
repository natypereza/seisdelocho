'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
  locale: string;
  order: number;
  featured: boolean;
}

export function Portfolio() {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/projects?locale=${locale}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('Error fetching projects:', err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [locale]);

  if (!loading && projects.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <AnimatedSection id="work" className="section bg-bg-base">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading-creative gradient-text"
        >
          {t('heading')}
        </motion.h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-xl bg-warm-light/30 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative rounded-xl overflow-hidden bg-bg-elevated shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-darker/80 via-warm-darker/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-white text-lg font-medium mb-1">
                        {project.title}
                      </h3>
                      {project.websiteUrl && (
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-warm-light text-sm hover:text-white transition-colors"
                        >
                          {t('viewProject')}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-warm-darker/80 text-white text-xs uppercase tracking-wider rounded-full backdrop-blur-sm">
                      {t('featured')}
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div className="p-5">
                  <h3 className="text-warm-darker font-medium text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-warm-dark text-sm font-light line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}
