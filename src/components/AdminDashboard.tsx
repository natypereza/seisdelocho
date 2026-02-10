'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
  locale: string;
  order: number;
  featured: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    websiteUrl: '',
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
    document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin/login');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setFormData({ ...formData, imageUrl: file.name });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setFormData({ ...formData, imageUrl: file.name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('locale', formData.locale);
    form.append('featured', formData.featured ? 'true' : 'false');
    form.append('websiteUrl', formData.websiteUrl || '');

    // If new file was selected, upload it first
    if (imageFile) {
      const imageForm = new FormData();
      imageForm.append('file', imageFile);
      imageForm.append('category', 'project');
      imageForm.append('title', formData.title);
      imageForm.append('altText', formData.title);
      imageForm.append('locale', formData.locale);

      try {
        const uploadResponse = await fetch('/api/images/upload', {
          method: 'POST',
          body: imageForm,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          form.set('imageUrl', uploadData.image.url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        form.set('imageUrl', formData.imageUrl);
      }
    } else {
      form.append('imageUrl', formData.imageUrl);
    }

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
          websiteUrl: '',
          locale: 'en',
          featured: false,
        });
        setImageFile(null);
        setPreviewUrl('');
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
      websiteUrl: project.websiteUrl || '',
      locale: project.locale,
      featured: project.featured,
    });
    setPreviewUrl(project.imageUrl);
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

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      websiteUrl: '',
      locale: 'en',
      featured: false,
    });
    setImageFile(null);
    setPreviewUrl('');
  };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-bg-elevated border-b-2 border-warm-light shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="heading-creative text-3xl mb-1">Portfolio Manager</h1>
            <p className="text-sm text-warm-dark">Manage your projects and portfolio content</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 bg-warm-darker text-white rounded-xl hover:bg-warm-base transition-all font-medium"
          >
            Logout
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-bg-elevated rounded-2xl p-8 border-2 border-warm-accent shadow-lg sticky top-28">
              <h2 className="heading-creative mb-8 text-2xl">
                {editingId ? '✏️ Edit Project' : '➕ New Project'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Drag & Drop Image Upload */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-3 border-dashed border-warm-light rounded-xl p-8 text-center cursor-pointer hover:border-warm-darker hover:bg-warm-light/20 transition-all"
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setPreviewUrl('');
                          setFormData({ ...formData, imageUrl: '' });
                        }}
                        className="text-sm text-warm-dark hover:text-warm-darker underline"
                      >
                        Change image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="block cursor-pointer">
                        <p className="text-4xl mb-2">🖼️</p>
                        <p className="text-warm-darker font-semibold mb-1">
                          Drag & drop image here
                        </p>
                        <p className="text-sm text-warm-dark">or click to browse</p>
                      </label>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-warm-darker mb-2 uppercase tracking-wide">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="E.g. E-commerce Platform"
                    className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker bg-bg-base transition-all"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-warm-darker mb-2 uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Tell us about this project..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker bg-bg-base transition-all resize-none"
                    required
                  />
                </div>

                {/* Website URL */}
                <div>
                  <label className="block text-sm font-semibold text-warm-darker mb-2 uppercase tracking-wide">
                    Website / Portfolio Link
                  </label>
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, websiteUrl: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker bg-bg-base transition-all"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold text-warm-darker mb-2 uppercase tracking-wide">
                    Language
                  </label>
                  <select
                    value={formData.locale}
                    onChange={(e) =>
                      setFormData({ ...formData, locale: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker text-warm-darker bg-bg-base transition-all"
                  >
                    <option value="en">🇬🇧 English</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="nl">🇳🇱 Nederlands</option>
                  </select>
                </div>

                {/* Featured */}
                <label className="flex items-center gap-3 p-3 rounded-xl bg-warm-light/20 cursor-pointer hover:bg-warm-light/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-2 border-warm-darker cursor-pointer accent-warm-darker"
                  />
                  <span className="text-sm font-semibold text-warm-darker">
                    ⭐ Featured Project
                  </span>
                </label>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-warm-darker to-warm-base text-white font-semibold rounded-xl hover:shadow-lg transition-all uppercase text-sm tracking-wide"
                  >
                    {editingId ? '💾 Update' : '✨ Create'}
                  </motion.button>
                  {editingId && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-6 py-3 border-2 border-warm-light text-warm-darker font-semibold rounded-xl hover:bg-warm-light transition-all uppercase text-sm tracking-wide"
                    >
                      ✕ Cancel
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Projects List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="space-y-4">
              <h2 className="heading-creative text-2xl mb-6">📚 Your Projects</h2>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-warm-dark animate-pulse">Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-bg-elevated rounded-2xl border-2 border-dashed border-warm-light"
                >
                  <p className="text-4xl mb-4">🚀</p>
                  <p className="text-warm-dark text-lg">No projects yet</p>
                  <p className="text-sm text-warm-light mt-2">
                    Create your first project to get started
                  </p>
                </motion.div>
              ) : (
                projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-bg-elevated rounded-xl border-2 border-warm-light hover:border-warm-darker hover:shadow-lg transition-all overflow-hidden group"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-5">
                      {/* Image */}
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-warm-darker mb-1">
                              {project.title}
                              {project.featured && <span className="text-lg ml-2">⭐</span>}
                            </h3>
                            <p className="text-sm text-warm-dark line-clamp-2 mb-3">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Website Link */}
                        {project.websiteUrl && (
                          <div className="mb-3">
                            <a
                              href={project.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-warm-base hover:text-warm-darker underline flex items-center gap-1"
                            >
                              🔗 Visit
                            </a>
                          </div>
                        )}

                        {/* Meta */}
                        <div className="flex items-center gap-2 mb-4 text-xs text-warm-light">
                          <span>
                            {project.locale === 'en'
                              ? '🇬🇧'
                              : project.locale === 'es'
                                ? '🇪🇸'
                                : '🇳🇱'}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(project)}
                            className="text-xs px-4 py-2 bg-warm-light text-warm-darker font-semibold rounded-lg hover:bg-warm-base transition-colors"
                          >
                            ✏️ Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(project.id)}
                            className="text-xs px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition-colors"
                          >
                            🗑️ Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
