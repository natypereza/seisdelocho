import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/auth-guard';

export const dynamic = 'force-dynamic';

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
