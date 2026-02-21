import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/auth-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const projects = await prisma.project.findMany({
      where: { locale },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { images: true },
        },
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const websiteUrl = (formData.get('websiteUrl') as string) || null;
    const category = (formData.get('category') as string) || null;
    const locale = (formData.get('locale') as string) || 'en';
    const featured = formData.get('featured') === 'true';
    const galleryImages = formData.get('galleryImages') as string | null;

    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, imageUrl' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const projectSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const project = await prisma.project.create({
      data: {
        title,
        slug: projectSlug,
        description,
        imageUrl,
        websiteUrl,
        category,
        locale,
        featured,
        ...(galleryImages
          ? {
              images: {
                create: JSON.parse(galleryImages).map((img: { url: string; altText?: string; width?: number; height?: number }, i: number) => ({
                  url: img.url,
                  altText: img.altText || title,
                  width: img.width || 1920,
                  height: img.height || 1080,
                  order: i,
                })),
              },
            }
          : {}),
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    const { projectIds } = await request.json();

    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return NextResponse.json(
        { error: 'projectIds must be a non-empty array' },
        { status: 400 }
      );
    }

    const updates = projectIds.map((id: string, index: number) =>
      prisma.project.update({ where: { id }, data: { order: index } })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering projects:', error);
    return NextResponse.json(
      { error: 'Failed to reorder projects' },
      { status: 500 }
    );
  }
}
