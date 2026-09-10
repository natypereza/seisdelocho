import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ServiceDetailContent } from '@/components/ServiceDetailContent';
import type { Metadata } from 'next';

const serviceConfig: Record<string, { category: string; translationKey: string }> = {
  'event-design': { category: 'events', translationKey: 'eventDesign' },
  'wedding-experience': { category: 'events', translationKey: 'weddingExperience' },
  'brand-design': { category: 'branding', translationKey: 'brandDesign' },
  'creative-support': { category: 'photography', translationKey: 'creativeSupport' },
};

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(serviceConfig).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = serviceConfig[slug];
  if (!config) return {};
  return {
    title: `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} — seisdelocho`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const config = serviceConfig[slug];

  if (!config) notFound();

  const projects = await prisma.project.findMany({
    where: { locale, category: config.category },
    include: { images: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' },
  });

  return (
    <ServiceDetailContent
      translationKey={config.translationKey}
      projects={projects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        imageUrl: p.imageUrl,
        images: p.images.map((img) => ({
          id: img.id,
          url: img.url,
          altText: img.altText,
          caption: img.caption,
        })),
      }))}
      locale={locale}
    />
  );
}
