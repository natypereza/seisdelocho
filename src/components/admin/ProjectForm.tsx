'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import ImageUploader, { compressImage } from './ImageUploader';
import { useToast } from './ToastProvider';

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  category: string;
  locale: string;
  featured: boolean;
}

interface ProjectFormProps {
  editingId: string | null;
  initialData: {
    title: string;
    slug?: string;
    description: string;
    imageUrl: string;
    websiteUrl: string;
    category?: string;
    locale: string;
    featured: boolean;
  } | null;
  defaultLocale: string;
  onClose: () => void;
  onSaved: () => void;
}

const emptyForm: ProjectFormData = {
  title: '',
  slug: '',
  description: '',
  imageUrl: '',
  websiteUrl: '',
  category: '',
  locale: 'en',
  featured: false,
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function ProjectForm({ editingId, initialData, defaultLocale, onClose, onSaved }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>(
    initialData
      ? { ...emptyForm, ...initialData, slug: initialData.slug || '', category: initialData.category || '' }
      : { ...emptyForm, locale: defaultLocale }
  );
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!editingId);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');
  const [galleryFiles, setGalleryFiles] = useState<{ file: File; previewUrl: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...emptyForm,
        ...initialData,
        slug: initialData.slug || '',
        category: initialData.category || '',
      });
      setPreviewUrl(initialData.imageUrl || '');
      setSlugManuallyEdited(true);
    } else {
      setFormData({ ...emptyForm, locale: defaultLocale });
      setPreviewUrl('');
      setSlugManuallyEdited(false);
    }
    setImageFile(null);
    setGalleryFiles([]);
  }, [initialData, defaultLocale]);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      ...(slugManuallyEdited ? {} : { slug: generateSlug(title) }),
    }));
  };

  const handleSlugChange = (slug: string) => {
    setSlugManuallyEdited(true);
    setFormData((prev) => ({ ...prev, slug }));
  };

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

  const handleGalleryFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setGalleryFiles((prev) => [...prev, ...newFiles]);
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('slug', formData.slug || generateSlug(formData.title));
    form.append('description', formData.description);
    form.append('locale', formData.locale);
    form.append('featured', formData.featured ? 'true' : 'false');
    form.append('websiteUrl', formData.websiteUrl || '');
    form.append('category', formData.category || '');

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

    // Upload gallery images
    const galleryImageData: { url: string; altText: string; width: number; height: number }[] = [];

    for (const { file } of galleryFiles) {
      const compressed = await compressImage(file);
      const galleryForm = new FormData();
      galleryForm.append('file', compressed);
      galleryForm.append('category', 'project');
      galleryForm.append('title', `${formData.title} - Gallery`);
      galleryForm.append('altText', formData.title);
      galleryForm.append('locale', formData.locale);

      try {
        const uploadResponse = await fetch('/api/images/upload', {
          method: 'POST',
          body: galleryForm,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          galleryImageData.push({
            url: uploadData.image.url,
            altText: formData.title,
            width: uploadData.image.width,
            height: uploadData.image.height,
          });
        }
      } catch {
        // Continue with other uploads
      }
    }

    if (galleryImageData.length > 0) {
      form.append('galleryImages', JSON.stringify(galleryImageData));
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
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="E.g. Brand Identity for Café Luna"
              className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker bg-bg-base transition-all text-sm"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-warm-darker mb-2 uppercase tracking-wide">
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="auto-generated-from-title"
              className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker focus:ring-2 focus:ring-warm-light/30 text-warm-darker bg-bg-base transition-all text-sm font-mono"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-warm-darker mb-2 uppercase tracking-wide">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-warm-light rounded-xl focus:outline-none focus:border-warm-darker text-warm-darker bg-bg-base transition-all text-sm"
            >
              <option value="">None</option>
              <option value="branding">Branding</option>
              <option value="product">Product Design</option>
              <option value="events">Events</option>
              <option value="photography">Photography</option>
              <option value="marketing">Marketing</option>
            </select>
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

          {/* Gallery Images */}
          <div>
            <label className="block text-xs font-semibold text-warm-darker mb-2 uppercase tracking-wide">
              Gallery Images
            </label>
            {galleryFiles.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {galleryFiles.map((item, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                    <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryFile(i)}
                      className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleGalleryFilesSelect}
              className="w-full text-sm text-warm-dark file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-2 file:border-warm-light file:text-sm file:font-semibold file:bg-bg-base file:text-warm-darker hover:file:bg-warm-light/30 file:transition-all file:cursor-pointer"
            />
          </div>

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
