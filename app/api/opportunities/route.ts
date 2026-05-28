/**
 * GET /api/opportunities
 * Query params: type, stages, industries, geographies, isPremium, page, pageSize
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import type { OpportunityType, Stage } from '@/app/generated/prisma/client';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') as OpportunityType | null;
    const stages = url.searchParams.get('stages')?.split(',').filter(Boolean) as Stage[] | undefined;
    const industries = url.searchParams.get('industries')?.split(',').filter(Boolean);
    const geographies = url.searchParams.get('geographies')?.split(',').filter(Boolean);
    const isPremium = url.searchParams.get('isPremium');
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const pageSize = Math.min(50, Math.max(1, Number(url.searchParams.get('pageSize') ?? '20')));

    const where = {
      isLive: true,
      ...(type ? { type } : {}),
      ...(stages?.length ? { stages: { hasSome: stages } } : {}),
      ...(industries?.length ? { industries: { hasSome: industries } } : {}),
      ...(geographies?.length ? { geographies: { hasSome: geographies } } : {}),
      ...(isPremium !== null ? { isPremium: isPremium === 'true' } : {}),
    };

    const [opportunities, total] = await Promise.all([
      prisma.opportunity.findMany({
        where,
        orderBy: [{ isPremium: 'desc' }, { postedAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.opportunity.count({ where }),
    ]);

    return Response.json({
      data: opportunities,
      total,
      page,
      pageSize,
      pages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error('[GET /api/opportunities]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
