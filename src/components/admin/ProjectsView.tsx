'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import DeleteModal from './DeleteModal';
import { useToast } from './ToastProvider';
import type { Project } from './ProjectCard';

const locales = [
  { id: 'en', label: 'EN' },
  { id: 'es', label: 'ES' },
  { id: 'nl', label: 'NL' },
] as const;

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocale, setSelectedLocale] = useState('en');
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);
  const [localeCounts, setLocaleCounts] = useState<Record<string, number>>({});
  const { showToast } = useToast();
  const router = useRouter();

  const fetchProjects = useCallback(async (locale: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/projects?locale=${locale}`);
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchCounts = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setLocaleCounts(data.perLocale || {});
      }
    } catch {
      // Non-critical, silently fail
    }
  }, []);

  useEffect(() => {
    fetchProjects(selectedLocale);
    fetchCounts();
  }, [selectedLocale, fetchProjects, fetchCounts]);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingProject(null);
  };

  const handleFormSaved = () => {
    setFormOpen(false);
    setEditingProject(null);
    fetchProjects(selectedLocale);
    fetchCounts();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        showToast('Project deleted', 'success');
        fetchProjects(selectedLocale);
        fetchCounts();
      } else {
        showToast('Failed to delete project', 'error');
      }
    } catch {
      showToast('Failed to delete project', 'error');
    }
    setDeleteConfirm(null);
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0 || isReordering) return;
    const newProjects = [...projects];
    [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
    setProjects(newProjects);
    setIsReordering(true);

    try {
      await fetch('/api/admin/projects/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: selectedLocale,
          projectIds: newProjects.map((p) => p.id),
        }),
      });
    } catch {
      // Revert on error
      fetchProjects(selectedLocale);
      showToast('Failed to reorder', 'error');
    } finally {
      setIsReordering(false);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === projects.length - 1 || isReordering) return;
    const newProjects = [...projects];
    [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];
    setProjects(newProjects);
    setIsReordering(true);

    try {
      await fetch('/api/admin/projects/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: selectedLocale,
          projectIds: newProjects.map((p) => p.id),
        }),
      });
    } catch {
      fetchProjects(selectedLocale);
      showToast('Failed to reorder', 'error');
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="heading-creative text-2xl">Your Projects</h2>

        <div className="flex items-center gap-3">
          {/* Locale filter */}
          <div className="flex gap-1 bg-warm-light/30 rounded-full p-1">
            {locales.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocale(loc.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedLocale === loc.id
                    ? 'bg-bg-elevated shadow-sm text-warm-darker'
                    : 'text-warm-dark hover:text-warm-darker'
                }`}
              >
                {loc.label}
                {localeCounts[loc.id] !== undefined && (
                  <span className="ml-1 opacity-60">({localeCounts[loc.id]})</span>
                )}
              </button>
            ))}
          </div>

          {/* Add button */}
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-warm-darker to-warm-base text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Project</span>
          </button>
        </div>
      </div>

      {/* Project List */}
      <ProjectList
        projects={projects}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteConfirm(id)}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onAddProject={handleAddNew}
        isReordering={isReordering}
        selectedLocale={selectedLocale}
      />

      {/* Slide-over Form */}
      <AnimatePresence>
        {formOpen && (
          <ProjectForm
            editingId={editingProject?.id || null}
            initialData={
              editingProject
                ? {
                    title: editingProject.title,
                    description: editingProject.description,
                    imageUrl: editingProject.imageUrl,
                    websiteUrl: editingProject.websiteUrl || '',
                    locale: editingProject.locale,
                    featured: editingProject.featured,
                  }
                : null
            }
            defaultLocale={selectedLocale}
            onClose={handleFormClose}
            onSaved={handleFormSaved}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <DeleteModal
            onConfirm={() => handleDelete(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
