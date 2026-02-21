import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/auth-guard';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const websiteUrl = (formData.get('websiteUrl') as string) || null;
    const category = (formData.get('category') as string) || null;
    const featured = formData.get('featured') === 'true';
    const galleryImages = formData.get('galleryImages') as string | null;

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
        category,
        websiteUrl,
        featured,
      },
    });

    // If gallery images provided, replace all existing ones
    if (galleryImages) {
      await prisma.projectImage.deleteMany({ where: { projectId: id } });
      const images = JSON.parse(galleryImages);
      if (images.length > 0) {
        await prisma.projectImage.createMany({
          data: images.map((img: { url: string; altText?: string; width?: number; height?: number }, i: number) => ({
            projectId: id,
            url: img.url,
            altText: img.altText || '',
            width: img.width || 1920,
            height: img.height || 1080,
            order: i,
          })),
        });
      }
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
