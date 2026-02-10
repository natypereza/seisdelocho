'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  locale: string;
  order: number;
  featured: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'images'>('projects');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    locale: 'en',
    featured: false,
  });
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects?locale=en');
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
  };

  const handleLogout = () => {
    document.cookie = 'admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'admin-auth-secure=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('imageUrl', formData.imageUrl);
    form.append('locale', formData.locale);
    form.append('featured', formData.featured ? 'true' : 'false');

    try {
      const response = await fetch(
        editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects',
        {
          method: editingId ? 'PUT' : 'POST',
          body: form,
        }
      );

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          imageUrl: '',
          locale: 'en',
          featured: false,
        });
        setEditingId(null);
        fetchProjects();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      locale: project.locale,
      featured: project.featured,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="bg-bg-elevated border-b border-warm-light shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="heading-creative text-2xl">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-warm-darker text-white rounded-lg hover:bg-warm-base transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6 border-b border-warm-light">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'projects'
                ? 'border-b-2 border-warm-darker text-warm-darker'
                : 'text-warm-dark hover:text-warm-darker'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'images'
                ? 'border-b-2 border-warm-darker text-warm-darker'
                : 'text-warm-dark hover:text-warm-darker'
            }`}
          >
            Images
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-bg-elevated rounded-lg p-6 shadow-sm border border-warm-light">
                <h2 className="heading-creative mb-6">
                  {editingId ? 'Edit Project' : 'Add Project'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-warm-darker mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Project title"
                      className="w-full px-3 py-2 border border-warm-light rounded-lg focus:outline-none focus:border-warm-base text-warm-darker"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warm-darker mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Project description"
                      rows={4}
                      className="w-full px-3 py-2 border border-warm-light rounded-lg focus:outline-none focus:border-warm-base text-warm-darker"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warm-darker mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      placeholder="/images/project.jpg"
                      className="w-full px-3 py-2 border border-warm-light rounded-lg focus:outline-none focus:border-warm-base text-warm-darker"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warm-darker mb-1">
                      Language
                    </label>
                    <select
                      value={formData.locale}
                      onChange={(e) =>
                        setFormData({ ...formData, locale: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-warm-light rounded-lg focus:outline-none focus:border-warm-base text-warm-darker"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="nl">Nederlands</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-warm-light"
                    />
                    <span className="text-sm text-warm-darker">Featured</span>
                  </label>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-warm-darker text-white rounded-lg hover:bg-warm-base transition-colors"
                    >
                      {editingId ? 'Update' : 'Add'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setFormData({
                            title: '',
                            description: '',
                            imageUrl: '',
                            locale: 'en',
                            featured: false,
                          });
                        }}
                        className="flex-1 px-4 py-2 border border-warm-light text-warm-darker rounded-lg hover:bg-warm-light transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Project List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {loading ? (
                  <div className="text-warm-dark">Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className="text-warm-dark">No projects yet. Create one!</div>
                ) : (
                  projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-bg-elevated rounded-lg p-4 border border-warm-light hover:border-warm-base transition-colors"
                    >
                      <div className="flex gap-4">
                        {project.imageUrl && (
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-warm-darker mb-1">
                            {project.title}
                          </h3>
                          <p className="text-sm text-warm-dark mb-2 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(project)}
                              className="text-sm px-3 py-1 bg-warm-light text-warm-darker rounded hover:bg-warm-base transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="bg-bg-elevated rounded-lg p-6 border border-warm-light">
            <h2 className="heading-creative mb-4">Image Management</h2>
            <div className="border-2 border-dashed border-warm-light rounded-lg p-8 text-center">
              <p className="text-warm-dark mb-4">
                Image upload interface coming soon. You can currently use the upload API at:
              </p>
              <code className="bg-warm-light text-warm-darker px-4 py-2 rounded block text-sm overflow-x-auto">
                POST /api/images/upload
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
