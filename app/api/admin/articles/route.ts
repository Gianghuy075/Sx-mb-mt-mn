/**
 * Articles API - List and Create
 * GET /api/admin/articles - List articles with pagination
 * POST /api/admin/articles - Create new article
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { ObjectId } from 'mongodb';
import { authConfig } from '@/lib/auth/auth';
import { getDb } from '@/lib/db/mongodb';
import { createArticleSchema, articleListFiltersSchema } from '@/lib/validations/article';
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

    const matchQuery: Record<string, any> = {};

    if (filters.status) matchQuery.status = filters.status;
    if (filters.region) matchQuery.region = filters.region;
    if (filters.type) matchQuery.type = filters.type;
    if (filters.search) {
      matchQuery.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { excerpt: { $regex: filters.search, $options: 'i' } },
      ];
    }

    const db = await getDb();
    const skip = (filters.page - 1) * filters.limit;

    const [rawArticles, total] = await Promise.all([
      db.collection('articles').aggregate([
        { $match: matchQuery },
        { $sort: { created_at: -1 } },
        { $skip: skip },
        { $limit: filters.limit },
        {
          $lookup: {
            from: 'users',
            localField: 'author_id',
            foreignField: '_id',
            as: 'authorArr',
          },
        },
      ]).toArray(),
      db.collection('articles').countDocuments(matchQuery),
    ]);

    const articles = rawArticles.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      content: doc.content,
      excerpt: doc.excerpt ?? null,
      featuredImage: doc.featured_image ?? null,
      status: doc.status,
      publishedAt: doc.published_at ?? null,
      createdAt: doc.created_at ?? null,
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
    }));

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

    const slug = await generateUniqueSlug(data.title);
    const authorId = new ObjectId(session.user.id);

    const db = await getDb();
    const now = new Date();
    const doc = {
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt ?? null,
      featured_image: data.featuredImage ?? null,
      status: data.status ?? 'draft',
      author_id: authorId,
      published_at: data.status === 'published' ? now : null,
      region: data.region ?? null,
      type: data.type ?? null,
      views: 0,
      created_at: now,
      updated_at: now,
    };

    const result = await db.collection('articles').insertOne(doc);

    const author = await db.collection('users').findOne(
      { _id: authorId },
      { projection: { _id: 1, username: 1, name: 1, email: 1 } }
    );

    return NextResponse.json({
      id: result.insertedId.toString(),
      title: doc.title,
      slug: doc.slug,
      content: doc.content,
      excerpt: doc.excerpt,
      featuredImage: doc.featured_image,
      status: doc.status,
      publishedAt: doc.published_at,
      views: doc.views,
      region: doc.region,
      type: doc.type,
      author: author
        ? { id: author._id.toString(), username: author.username, name: author.name ?? null, email: author.email }
        : null,
    }, { status: 201 });
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
