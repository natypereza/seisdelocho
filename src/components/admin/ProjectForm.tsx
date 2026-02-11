'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import ImageUploader, { compressImage } from './ImageUploader';
import { useToast } from './ToastProvider';

interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  locale: string;
  featured: boolean;
}

interface ProjectFormProps {
  editingId: string | null;
  initialData: ProjectFormData | null;
  defaultLocale: string;
  onClose: () => void;
  onSaved: () => void;
}

const emptyForm: ProjectFormData = {
  title: '',
  description: '',
  imageUrl: '',
  websiteUrl: '',
  locale: 'en',
  featured: false,
};

export default function ProjectForm({ editingId, initialData, defaultLocale, onClose, onSaved }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>(
    initialData || { ...emptyForm, locale: defaultLocale }
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreviewUrl(initialData.imageUrl || '');
    } else {
      setFormData({ ...emptyForm, locale: defaultLocale });
      setPreviewUrl('');
    }
    setImageFile(null);
  }, [initialData, defaultLocale]);

  const handleFileSelect = useCallback((file: File) => {
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, imageUrl: file.name }));
  }, []);

  const handleClearImage = useCallback(() => {
    setImageFile(null);
    setPreviewUrl('');
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('locale', formData.locale);
    form.append('featured', formData.featured ? 'true' : 'false');
    form.append('websiteUrl', formData.websiteUrl || '');

    if (imageFile) {
      const compressed = await compressImage(imageFile);
      const imageForm = new FormData();
      imageForm.append('file', compressed);
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
        } else {
          showToast('Failed to upload image', 'error');
          setSubmitting(false);
          return;
        }
      } catch {
        showToast('Failed to upload image', 'error');
        setSubmitting(false);
        return;
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
        showToast(editingId ? 'Project updated' : 'Project created', 'success');
        onSaved();
      } else {
        showToast('Failed to save project', 'error');
      }
    } catch {
      showToast('Failed to save project', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-bg-elevated border-l-2 border-warm-accent shadow-2xl z-50 flex flex-col"
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-warm-accent/50 flex-shrink-0">
          <h2 className="heading-creative text-xl">
            {editingId ? 'Edit Project' : 'New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-warm-dark hover:bg-warm-light/30 hover:text-warm-darker transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Image Upload */}
          <ImageUploader
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onClear={handleClearImage}
          />

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-warm-darker mb-2 uppercase tracking-wide">
              Project Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g. Brand Identity for Café Luna"
              className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker bg-bg-base transition-all text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-warm-darker mb-2 uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about this project..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker bg-bg-base transition-all resize-none text-sm"
              required
            />
            <p className="text-[11px] text-warm-base mt-1 text-right">
              {formData.description.length} characters
            </p>
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-xs font-semibold text-warm-darker mb-2 uppercase tracking-wide">
              Website / Portfolio Link
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker bg-bg-base transition-all text-sm"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-xs font-semibold text-warm-darker mb-2 uppercase tracking-wide">
              Language
            </label>
            <select
              value={formData.locale}
              onChange={(e) => setFormData({ ...formData, locale: e.target.value })}
              className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker text-warm-darker bg-bg-base transition-all text-sm"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="nl">Nederlands</option>
            </select>
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 p-3 rounded-xl bg-warm-light/20 cursor-pointer hover:bg-warm-light/40 transition-colors">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded border-2 border-warm-darker cursor-pointer accent-warm-darker"
            />
            <span className="text-sm font-semibold text-warm-darker">
              Featured Project
            </span>
          </label>

          {/* Spacer for bottom padding */}
          <div className="h-4" />
        </form>

        {/* Submit Buttons (fixed at bottom) */}
        <div className="flex gap-3 p-6 border-t-2 border-warm-accent/50 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            form="project-form"
            disabled={submitting}
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-warm-darker to-warm-base text-white font-semibold rounded-xl hover:shadow-lg transition-all uppercase text-sm tracking-wide disabled:opacity-50"
          >
            {submitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onClose}
            className="px-6 py-3 border-2 border-warm-light text-warm-darker font-semibold rounded-xl hover:bg-warm-light/30 transition-all uppercase text-sm tracking-wide"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
