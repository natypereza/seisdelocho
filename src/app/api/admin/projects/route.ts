import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/auth-guard';

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
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const websiteUrl = (formData.get('websiteUrl') as string) || null;
    const locale = (formData.get('locale') as string) || 'en';
    const featured = formData.get('featured') === 'true';

    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, imageUrl' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        websiteUrl,
        locale,
        featured,
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
