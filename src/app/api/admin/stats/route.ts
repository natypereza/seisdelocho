import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/auth-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    const [totalProjects, featuredCount, localeCounts, recentProjects] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.project.groupBy({
        by: ['locale'],
        _count: true,
      }),
      prisma.project.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          locale: true,
          featured: true,
          updatedAt: true,
        },
      }),
    ]);

    const perLocale: Record<string, number> = { en: 0, es: 0, nl: 0 };
    for (const entry of localeCounts) {
      perLocale[entry.locale] = entry._count;
    }

    const latestUpdate = recentProjects.length > 0 ? recentProjects[0].updatedAt : null;

    return NextResponse.json({
      totalProjects,
      featuredCount,
      perLocale,
      latestUpdate,
      recentProjects,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
