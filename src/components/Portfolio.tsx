'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
  category?: string;
  locale: string;
  order: number;
  featured: boolean;
  _count?: { images: number };
}

const CATEGORIES = [
  'all',
  'branding',
  'product',
  'events',
  'photography',
  'marketing',
] as const;

export function Portfolio() {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

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

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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

        {/* Category Filter Tabs */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-warm-darker text-white'
                    : 'bg-warm-light/30 text-warm-dark hover:text-warm-darker hover:bg-warm-light/50'
                }`}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </motion.div>
        )}

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
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-xl overflow-hidden bg-bg-elevated shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-warm-light/20">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105 p-2"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-darker/80 via-warm-darker/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="text-white text-lg font-medium mb-1">
                          {project.title}
                        </h3>
                        {project._count && project._count.images > 0 ? (
                          <Link
                            href={`/${locale}/project/${project.slug}`}
                            className="inline-flex items-center gap-1.5 text-warm-light text-sm hover:text-white transition-colors"
                          >
                            {t('viewDetails')}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : project.websiteUrl ? (
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-warm-light text-sm hover:text-white transition-colors"
                          >
                            {t('viewProject')}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : null}
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
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}
