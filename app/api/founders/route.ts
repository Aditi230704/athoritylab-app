/**
 * POST /api/founders — create founder profile
 * GET  /api/founders?userId=xxx — get founder by user
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { CreateFounderSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateFounderSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { userId, ...data } = parsed.data;

    // Ensure user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const founder = await prisma.founder.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
      include: { startup: true },
    });

    return Response.json({ data: founder }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/founders]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = new URL(request.url).searchParams.get('userId');
    if (!userId) {
      return Response.json({ error: 'userId is required' }, { status: 400 });
    }

    const founder = await prisma.founder.findUnique({
      where: { userId },
      include: {
        startup: true,
        visibilityScores: { orderBy: { createdAt: 'desc' }, take: 1 },
        readinessScores: { orderBy: { createdAt: 'desc' }, take: 1 },
        socialMetrics: true,
      },
    });

    if (!founder) {
      return Response.json({ data: null }, { status: 200 });
    }

    return Response.json({ data: founder });
  } catch (err) {
    console.error('[GET /api/founders]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
