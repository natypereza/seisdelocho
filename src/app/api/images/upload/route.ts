import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
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

    // Create images directory if it doesn't exist
    const imagesDir = join(process.cwd(), 'public', 'images');
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }

    // Save file to public/images
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = join(imagesDir, filename);

    await writeFile(filePath, buffer);

    // Save metadata to database
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
