'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useImages } from '@/hooks/useImages';

interface DynamicImageProps {
  category: string;
  className?: string;
  animated?: boolean;
  fallbackSrc?: string;
  priority?: boolean;
}

export function DynamicImage({
  category,
  className = '',
  animated = true,
  fallbackSrc,
  priority = false,
}: DynamicImageProps) {
  const { images, loading } = useImages(category);

  if (loading) {
    return (
      <div
        className={`animate-pulse bg-warm-light ${className}`}
        role="status"
        aria-label="Loading image"
      />
    );
  }

  const image = images[0];

  // Fallback to static image if no database image found
  if (!image && fallbackSrc) {
    const MotionImage = animated ? motion(Image) : Image;

    return (
      <MotionImage
        src={fallbackSrc}
        alt="Fallback image"
        width={320}
        height={320}
        priority={priority}
        className={className}
        {...(animated && {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          transition: { duration: 0.6 },
          viewport: { once: true },
        })}
      />
    );
  }

  if (!image) return null;

  const MotionImage = animated ? motion(Image) : Image;

  return (
    <MotionImage
      src={image.url}
      alt={image.altText}
      width={image.width}
      height={image.height}
      priority={image.priority || priority}
      className={className}
      {...(animated && {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        transition: { duration: 0.6 },
        viewport: { once: true },
      })}
    />
  );
}
