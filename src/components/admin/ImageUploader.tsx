'use client';

import { useState, useCallback } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  previewUrl: string;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export async function compressImage(file: File, maxWidth = 1920, quality = 0.85): Promise<File> {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
          } else {
            resolve(file);
          }
        },
        'image/webp',
        quality
      );
    };
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageUploader({ previewUrl, onFileSelect, onClear }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
        isDragging
          ? 'border-warm-darker bg-warm-light/30'
          : 'border-warm-light hover:border-warm-darker hover:bg-warm-light/20'
      }`}
    >
      {previewUrl ? (
        <div className="space-y-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-36 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={onClear}
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
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="block cursor-pointer">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-warm-light/30 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-warm-dark" />
            </div>
            <p className="text-warm-darker font-semibold mb-1 text-sm">
              Drag & drop image here
            </p>
            <p className="text-xs text-warm-dark">or click to browse</p>
            <p className="text-[11px] text-warm-base mt-2">Auto-compressed to WebP</p>
          </label>
        </div>
      )}
    </div>
  );
}
