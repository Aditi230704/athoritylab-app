/**
 * POST /api/matching
 * Runs the AI investor-matching engine for a founder.
 * Body: MatchInput
 * Returns: MatchResult[]
 *
 * GET /api/matching?founderId=xxx
 * Returns previously computed matches for a founder.
 */

import { NextRequest } from 'next/server';
import { findInvestorMatches } from '@/lib/engines/investor-matcher';
import { MatchInputSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = MatchInputSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const matches = await findInvestorMatches(parsed.data);
    return Response.json({ data: matches, count: matches.length });
  } catch (err) {
    console.error('[POST /api/matching]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const founderId = new URL(request.url).searchParams.get('founderId');
    if (!founderId) {
      return Response.json({ error: 'founderId is required' }, { status: 400 });
    }

    const { prisma } = await import('@/lib/db/prisma');
    const matches = await prisma.investorMatch.findMany({
      where: { founderId },
      include: {
        investor: {
          include: { firm: { select: { name: true, logoUrl: true } } },
        },
      },
      orderBy: { score: 'desc' },
      take: 20,
    });

    return Response.json({ data: matches, count: matches.length });
  } catch (err) {
    console.error('[GET /api/matching]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
