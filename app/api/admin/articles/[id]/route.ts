/**
 * Article API - Individual operations
 * GET /api/admin/articles/[id] - Get article by ID
 * PATCH /api/admin/articles/[id] - Update article
 * DELETE /api/admin/articles/[id] - Delete article
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { ObjectId } from 'mongodb';
import { authConfig } from '@/lib/auth/auth';
import { getDb } from '@/lib/db/mongodb';
import { updateArticleSchema } from '@/lib/validations/article';
import { generateUniqueSlug } from '@/lib/utils/slug';

interface RouteParams {
  params: Promise<{ id: string }>;
}

async function getArticleWithAuthor(db: any, objectId: ObjectId) {
  const docs = await db.collection('articles').aggregate([
    { $match: { _id: objectId } },
    {
      $lookup: {
        from: 'users',
        localField: 'author_id',
        foreignField: '_id',
        as: 'authorArr',
      },
    },
  ]).toArray();

  if (!docs[0]) return null;
  const doc = docs[0];

  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    excerpt: doc.excerpt ?? null,
    featuredImage: doc.featured_image ?? null,
    status: doc.status,
    publishedAt: doc.published_at ?? null,
    views: doc.views ?? 0,
    region: doc.region ?? null,
    type: doc.type ?? null,
    author: doc.authorArr?.[0]
      ? {
          id: doc.authorArr[0]._id.toString(),
          username: doc.authorArr[0].username,
          name: doc.authorArr[0].name ?? null,
          email: doc.authorArr[0].email,
        }
      : null,
  };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    let objectId: ObjectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    const db = await getDb();
    const article = await getArticleWithAuthor(db, objectId);

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

    let objectId: ObjectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    const body = await request.json();
    const data = updateArticleSchema.parse(body);

    const db = await getDb();

    // Check if article exists
    const existing = await db.collection('articles').findOne(
      { _id: objectId },
      { projection: { slug: 1, status: 1 } }
    );

    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const setData: Record<string, any> = { updated_at: new Date() };

    if (data.title !== undefined) {
      setData.title = data.title;
      setData.slug = await generateUniqueSlug(data.title, id);
    }

    if (data.content !== undefined) setData.content = data.content;
    if (data.excerpt !== undefined) setData.excerpt = data.excerpt ?? null;
    if (data.featuredImage !== undefined) setData.featured_image = data.featuredImage ?? null;

    if (data.status !== undefined) {
      setData.status = data.status;
      if (existing.status !== 'published' && data.status === 'published') {
        setData.published_at = new Date();
      }
    }

    if (data.region !== undefined) setData.region = data.region ?? null;
    if (data.type !== undefined) setData.type = data.type ?? null;

    await db.collection('articles').updateOne({ _id: objectId }, { $set: setData });

    const article = await getArticleWithAuthor(db, objectId);
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

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    let objectId: ObjectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    const db = await getDb();

    // Soft delete: set status to archived
    await db.collection('articles').updateOne(
      { _id: objectId },
      { $set: { status: 'archived', updated_at: new Date() } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
