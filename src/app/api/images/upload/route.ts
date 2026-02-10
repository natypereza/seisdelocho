import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/auth-guard';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: Request) {
  try {
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const title = formData.get('title') as string;
    const altText = formData.get('altText') as string;
    const locale = (formData.get('locale') as string) || 'en';
    const widthStr = formData.get('width') as string;
    const heightStr = formData.get('height') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!category || !title || !altText) {
      return NextResponse.json(
        { error: 'Missing required fields: category, title, altText' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Create images directory if it doesn't exist
    const imagesDir = join(process.cwd(), 'public', 'images');
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }

    // Sanitize filename: remove path components, non-ASCII, and special chars
    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .replace(/\.{2,}/g, '.')
      .substring(0, 100);
    const filename = `${Date.now()}-${safeName}`;
    const filePath = join(imagesDir, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const image = await prisma.image.create({
      data: {
        category,
        title,
        altText,
        url: `/images/${filename}`,
        width: widthStr ? parseInt(widthStr) : 1920,
        height: heightStr ? parseInt(heightStr) : 1080,
        locale,
      },
    });

    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
