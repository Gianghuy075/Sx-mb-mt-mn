/**
 * Article API - Individual operations
 * GET /api/admin/articles/[id] - Get article by ID
 * PATCH /api/admin/articles/[id] - Update article
 * DELETE /api/admin/articles/[id] - Delete article
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { updateArticleSchema } from '@/lib/validations/article';
import { generateUniqueSlug } from '@/lib/utils/slug';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: { id },
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

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const data = updateArticleSchema.parse(body);

    // Check if article exists
    const existing = await prisma.article.findUnique({
      where: { id },
      select: { slug: true, status: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
      // Regenerate slug if title changed
      updateData.slug = await generateUniqueSlug(data.title, id);
    }

    if (data.content !== undefined) {
      updateData.content = data.content;
    }

    if (data.excerpt !== undefined) {
      updateData.excerpt = data.excerpt || null;
    }

    if (data.featuredImage !== undefined) {
      updateData.featuredImage = data.featuredImage || null;
    }

    if (data.status !== undefined) {
      updateData.status = data.status;
      // Set publishedAt when changing from draft to published
      if (existing.status !== 'published' && data.status === 'published') {
        updateData.publishedAt = new Date();
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json(article);
  } catch (error: any) {
    console.error('Error updating article:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Soft delete: set status to archived
    await prisma.article.update({
      where: { id },
      data: { status: 'archived' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
