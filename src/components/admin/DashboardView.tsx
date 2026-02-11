'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Star, Globe, Clock, Plus, FolderKanban, Image as ImageIcon } from 'lucide-react';
import StatCard from './StatCard';
import EmptyState from './EmptyState';
import type { AdminView } from './AdminSidebar';

interface Stats {
  totalProjects: number;
  featuredCount: number;
  perLocale: Record<string, number>;
  latestUpdate: string | null;
  recentProjects: {
    id: string;
    title: string;
    imageUrl: string;
    locale: string;
    featured: boolean;
    updatedAt: string;
  }[];
}

interface DashboardViewProps {
  onNavigate: (view: AdminView) => void;
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

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Skeleton stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-bg-elevated rounded-2xl border-2 border-warm-accent p-6 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-warm-light/30 mb-4" />
              <div className="h-7 bg-warm-light/30 rounded-lg w-16 mb-2" />
              <div className="h-4 bg-warm-light/20 rounded-lg w-24" />
            </div>
          ))}
        </div>
        {/* Skeleton recent list */}
        <div className="bg-bg-elevated rounded-2xl border-2 border-warm-accent p-6 animate-pulse">
          <div className="h-5 bg-warm-light/30 rounded-lg w-40 mb-6" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-warm-light/30 flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 bg-warm-light/30 rounded w-48 mb-2" />
                <div className="h-3 bg-warm-light/20 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats || stats.totalProjects === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="Your portfolio is empty"
        description="Start by adding your first project to showcase your work."
        actionLabel="Add Project"
        onAction={() => onNavigate('projects')}
      />
    );
  }

  const activeLanguages = Object.values(stats.perLocale).filter((n) => n > 0).length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="heading-creative text-3xl mb-1">Welcome back</h1>
        <p className="text-warm-dark text-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Layers}
          label="Total Projects"
          value={stats.totalProjects}
          subtitle="Across all languages"
          delay={0}
        />
        <StatCard
          icon={Star}
          label="Featured"
          value={stats.featuredCount}
          subtitle="Highlighted projects"
          delay={0.1}
        />
        <StatCard
          icon={Globe}
          label="Languages"
          value={`${activeLanguages} active`}
          subtitle={Object.entries(stats.perLocale)
            .filter(([, n]) => n > 0)
            .map(([l, n]) => `${l.toUpperCase()}: ${n}`)
            .join(' · ')}
          delay={0.2}
        />
        <StatCard
          icon={Clock}
          label="Latest Update"
          value={stats.latestUpdate ? timeAgo(stats.latestUpdate) : 'Never'}
          subtitle="Most recent change"
          delay={0.3}
        />
      </div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-bg-elevated rounded-2xl border-2 border-warm-accent p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="heading-creative text-lg">Recent Projects</h3>
          <button
            onClick={() => onNavigate('projects')}
            className="text-sm text-warm-base hover:text-warm-darker transition-colors"
          >
            View all
          </button>
        </div>

        <div className="divide-y divide-warm-accent/50">
          {stats.recentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-warm-light/30 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-4 h-4 text-warm-dark" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-warm-darker truncate">
                  {project.title}
                  {project.featured && (
                    <Star className="w-3 h-3 text-warm-base inline ml-1.5 fill-warm-base" />
                  )}
                </p>
                <p className="text-xs text-warm-base">{timeAgo(project.updatedAt)}</p>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full bg-warm-light/20 text-warm-dark flex-shrink-0">
                {localeLabels[project.locale] || project.locale}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onNavigate('projects')}
          className="flex items-center gap-4 p-6 bg-gradient-to-r from-warm-darker to-warm-base text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm uppercase tracking-wide">Add New Project</p>
            <p className="text-xs text-white/70 mt-0.5">Create a new portfolio piece</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onNavigate('projects')}
          className="flex items-center gap-4 p-6 bg-bg-elevated border-2 border-warm-accent rounded-2xl shadow-sm hover:shadow-md hover:border-warm-base transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-warm-light/30 flex items-center justify-center flex-shrink-0">
            <FolderKanban className="w-6 h-6 text-warm-darker" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm uppercase tracking-wide text-warm-darker">Manage Projects</p>
            <p className="text-xs text-warm-base mt-0.5">Edit, reorder, and organize</p>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
