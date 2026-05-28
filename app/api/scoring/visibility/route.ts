/**
 * POST /api/scoring/visibility
 * Body: VisibilityInput
 * Returns: VisibilityResult
 */

import { NextRequest } from 'next/server';
import { computeVisibilityScore } from '@/lib/engines/visibility-scorer';
import { VisibilityInputSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = VisibilityInputSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await computeVisibilityScore(parsed.data);
    return Response.json({ data: result });
  } catch (err) {
    console.error('[POST /api/scoring/visibility]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/scoring/visibility?founderId=xxx
 * Returns the latest cached score for a founder
 */
export async function GET(request: NextRequest) {
  try {
    const founderId = new URL(request.url).searchParams.get('founderId');
    if (!founderId) {
      return Response.json({ error: 'founderId is required' }, { status: 400 });
    }

    const { prisma } = await import('@/lib/db/prisma');
    const score = await prisma.visibilityScore.findFirst({
      where: { founderId },
      orderBy: { createdAt: 'desc' },
    });

    if (!score) {
      return Response.json({ data: null }, { status: 200 });
    }

    return Response.json({ data: score });
  } catch (err) {
    console.error('[GET /api/scoring/visibility]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
