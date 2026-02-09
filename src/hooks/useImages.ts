'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

export interface Image {
  id: string;
  category: string;
  title: string;
  description?: string;
  url: string;
  altText: string;
  width: number;
  height: number;
  priority: boolean;
  order: number;
  locale: string;
}

export function useImages(category?: string) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ locale });
        if (category) params.append('category', category);

        const response = await fetch(`/api/images?${params}`);
        if (!response.ok) throw new Error('Failed to fetch images');

        const data = await response.json();
        setImages(data.images || []);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category, locale]);

  return { images, loading, error };
}
