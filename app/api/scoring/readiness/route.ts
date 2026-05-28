/**
 * POST /api/scoring/readiness
 * Body: ReadinessInput
 * Returns: ReadinessResult
 */

import { NextRequest } from 'next/server';
import { computeReadinessScore } from '@/lib/engines/readiness-scorer';
import { ReadinessInputSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ReadinessInputSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await computeReadinessScore(parsed.data);
    return Response.json({ data: result });
  } catch (err) {
    console.error('[POST /api/scoring/readiness]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/scoring/readiness?founderId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const founderId = new URL(request.url).searchParams.get('founderId');
    if (!founderId) {
      return Response.json({ error: 'founderId is required' }, { status: 400 });
    }

    const { prisma } = await import('@/lib/db/prisma');
    const score = await prisma.readinessScore.findFirst({
      where: { founderId },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json({ data: score ?? null });
  } catch (err) {
    console.error('[GET /api/scoring/readiness]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
