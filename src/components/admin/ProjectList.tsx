'use client';

import { FolderKanban } from 'lucide-react';
import ProjectCard, { type Project } from './ProjectCard';
import EmptyState from './EmptyState';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onAddProject: () => void;
  isReordering: boolean;
  selectedLocale: string;
}

const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  nl: 'Nederlands',
};

export default function ProjectList({
  projects,
  loading,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onAddProject,
  isReordering,
  selectedLocale,
}: ProjectListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-bg-elevated rounded-2xl border-2 border-warm-accent/50 p-5 animate-pulse">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-xl bg-warm-light/30 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-warm-light/30 rounded w-48" />
                <div className="h-3 bg-warm-light/20 rounded w-full" />
                <div className="h-3 bg-warm-light/20 rounded w-2/3" />
                <div className="flex gap-2 mt-2">
                  <div className="h-5 w-16 bg-warm-light/20 rounded-full" />
                  <div className="h-5 w-10 bg-warm-light/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        title={`No projects in ${localeNames[selectedLocale] || selectedLocale}`}
        description="Create one or switch languages to see other projects."
        actionLabel="Add Project"
        onAction={onAddProject}
      />
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          onEdit={onEdit}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          isReordering={isReordering}
        />
      ))}
    </div>
  );
}
