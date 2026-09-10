'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  featured: boolean;
  _count?: { images: number };
}

export function WorkShowcase() {
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

  const displayProjects = projects.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-bg-base">
      <div className="container-custom">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-greige/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {displayProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                }}
              >
                <Link
                  href={`/${locale}/project/${project.slug}`}
                  className="group block relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-warm-darker/0 group-hover:bg-warm-darker/15 transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
