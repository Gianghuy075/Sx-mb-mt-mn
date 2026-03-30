/**
 * Articles API - List and Create
 * GET /api/admin/articles - List articles with pagination
 * POST /api/admin/articles - Create new article
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { createArticleSchema, articleListFiltersSchema, articleRegionEnum, articleTypeEnum } from '@/lib/validations/article';
import { generateUniqueSlug } from '@/lib/utils/slug';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filters = articleListFiltersSchema.parse({
      status: searchParams.get('status') || undefined,
      region: searchParams.get('region') || undefined,
      type: searchParams.get('type') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
    });

    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { excerpt: { contains: filters.search } },
      ];
    }

    if (filters.region) {
      where.region = filters.region;
    }

    if (filters.type) {
      where.type = filters.type;
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          excerpt: true,
          featuredImage: true,
          status: true,
          publishedAt: true,
          views: true,
          region: true,
          type: true,
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.article.count({ where }),
    ]);

    return NextResponse.json({
      articles,
      total,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(total / filters.limit),
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = createArticleSchema.parse(body);

    // Generate unique slug
    const slug = await generateUniqueSlug(data.title);

    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt || null,
        featuredImage: data.featuredImage || null,
        status: data.status || 'draft',
        authorId: session.user.id,
        publishedAt: data.status === 'published' ? new Date() : null,
        region: data.region || null,
        type: data.type || null,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error('Error creating article:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
