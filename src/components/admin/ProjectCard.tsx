'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
  Star,
  Image as ImageIcon,
} from 'lucide-react';

export interface Project {
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
  createdAt: string;
  updatedAt?: string;
  _count?: { images: number };
}

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  isReordering: boolean;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

const localeLabels: Record<string, string> = {
  en: 'EN',
  es: 'ES',
  nl: 'NL',
};

export default function ProjectCard({
  project,
  index,
  total,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isReordering,
}: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="bg-bg-elevated rounded-2xl border-2 border-warm-accent/50 hover:border-warm-base hover:shadow-md transition-all overflow-hidden"
    >
      <div className="flex gap-4 p-4 sm:p-5">
        {/* Thumbnail */}
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-warm-light/40 to-warm-accent/40 flex items-center justify-center flex-shrink-0">
            <ImageIcon className="w-8 h-8 text-warm-dark" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-warm-darker truncate text-sm sm:text-base">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-warm-dark line-clamp-2 mt-1">
                {project.description}
              </p>
            </div>

            {/* Actions area */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Order controls */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0 || isReordering}
                  className="p-1 rounded-lg text-warm-dark hover:bg-warm-light/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onMoveDown(index)}
                  disabled={index === total - 1 || isReordering}
                  className="p-1 rounded-lg text-warm-dark hover:bg-warm-light/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Three-dot menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1.5 rounded-lg text-warm-dark hover:bg-warm-light/30 transition-colors"
                  aria-label="Actions"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 top-full mt-1 w-36 bg-bg-elevated rounded-xl border-2 border-warm-accent shadow-lg z-10 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit(project);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-warm-darker hover:bg-warm-light/20 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete(project.id);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-warm-light/30 text-warm-darker">
                <Star className="w-3 h-3 fill-warm-base text-warm-base" />
                Featured
              </span>
            )}
            {project.category && (
              <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-warm-light/20 text-warm-dark">
                {project.category}
              </span>
            )}
            <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-warm-light/20 text-warm-dark">
              {localeLabels[project.locale] || project.locale}
            </span>
            {project._count && project._count.images > 0 && (
              <span className="text-[11px] text-warm-base">
                {project._count.images} images
              </span>
            )}
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-warm-base hover:text-warm-darker transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Visit site
              </a>
            )}
            <span className="text-[11px] text-warm-base ml-auto">
              {timeAgo(project.updatedAt || project.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
