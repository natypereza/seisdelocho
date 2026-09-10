import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProjectDetailContent } from '@/components/ProjectDetailContent';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await prisma.project.findFirst({
    where: { slug, locale },
  });
  if (!project) return {};
  return {
    title: `${project.title} — seisdelocho`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = await prisma.project.findFirst({
    where: { slug, locale },
    include: { images: { orderBy: { order: 'asc' } } },
  });

  if (!project) notFound();

  return (
    <ProjectDetailContent
      project={{
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        imageUrl: project.imageUrl,
        category: project.category,
        images: project.images.map((img) => ({
          id: img.id,
          url: img.url,
          altText: img.altText,
          caption: img.caption,
          width: img.width,
          height: img.height,
        })),
      }}
      locale={locale}
    />
  );
}
