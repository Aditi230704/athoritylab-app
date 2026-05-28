/**
 * GET  /api/investors  — search & filter investor database
 *
 * Query params (all optional):
 *   q           full-text search
 *   stages      comma-separated Stage enum values
 *   industries  comma-separated strings
 *   geographies comma-separated strings
 *   checkMin    number (USD)
 *   checkMax    number (USD)
 *   sortBy      warmthScore | portfolioCount | checkSizeMin | name
 *   order       asc | desc
 *   page        number (default 1)
 *   pageSize    number (default 20, max 100)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { InvestorSearchSchema } from '@/lib/validators';
import { meili, INVESTOR_INDEX } from '@/lib/search/meilisearch';
import type { Stage } from '@/app/generated/prisma/client';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const raw = {
      q: url.searchParams.get('q') ?? undefined,
      stages: url.searchParams.get('stages')?.split(',').filter(Boolean),
      industries: url.searchParams.get('industries')?.split(',').filter(Boolean),
      geographies: url.searchParams.get('geographies')?.split(',').filter(Boolean),
      checkMin: url.searchParams.get('checkMin') ? Number(url.searchParams.get('checkMin')) : undefined,
      checkMax: url.searchParams.get('checkMax') ? Number(url.searchParams.get('checkMax')) : undefined,
      sortBy: url.searchParams.get('sortBy') ?? undefined,
      order: url.searchParams.get('order') ?? undefined,
      page: url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1,
      pageSize: url.searchParams.get('pageSize') ? Number(url.searchParams.get('pageSize')) : 20,
    };

    const parsed = InvestorSearchSchema.safeParse(raw);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid query parameters', details: parsed.error.flatten() }, { status: 400 });
    }

    const { q, stages, industries, geographies, checkMin, checkMax, sortBy, order, page, pageSize } = parsed.data;
    const skip = (page - 1) * pageSize;

    // Use Meilisearch if available and there's a text query
    if (meili && q) {
      const index = meili.index(INVESTOR_INDEX);
      const filters: string[] = [];
      if (stages?.length) filters.push(`stages IN [${stages.map((s) => `"${s}"`).join(', ')}]`);
      if (geographies?.length) filters.push(`geographies IN [${geographies.map((g) => `"${g}"`).join(', ')}]`);
      if (industries?.length) filters.push(`industries IN [${industries.map((i) => `"${i}"`).join(', ')}]`);
      if (checkMin !== undefined) filters.push(`checkSizeMin >= ${checkMin}`);
      if (checkMax !== undefined) filters.push(`checkSizeMax <= ${checkMax}`);
      filters.push('isActive = true');

      const result = await index.search(q, {
        filter: filters.join(' AND ') || undefined,
        limit: pageSize,
        offset: skip,
        sort: [`${sortBy}:${order}`],
      });

      return Response.json({
        data: result.hits,
        total: result.estimatedTotalHits,
        page,
        pageSize,
        source: 'meilisearch',
      });
    }

    // Fallback: Prisma query
    const where = {
      isActive: true,
      ...(stages?.length ? { stages: { hasSome: stages as Stage[] } } : {}),
      ...(geographies?.length ? { geographies: { hasSome: geographies } } : {}),
      ...(industries?.length ? { industries: { hasSome: industries } } : {}),
      ...(checkMin !== undefined ? { checkSizeMin: { gte: checkMin } } : {}),
      ...(checkMax !== undefined ? { checkSizeMax: { lte: checkMax } } : {}),
      ...(q ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { bio: { contains: q, mode: 'insensitive' as const } },
          { thesisText: { contains: q, mode: 'insensitive' as const } },
          { firm: { name: { contains: q, mode: 'insensitive' as const } } },
        ],
      } : {}),
    };

    const [investors, total] = await Promise.all([
      prisma.investor.findMany({
        where,
        include: { firm: { select: { name: true, logoUrl: true, website: true } } },
        orderBy: { [sortBy ?? 'warmthScore']: order ?? 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.investor.count({ where }),
    ]);

    return Response.json({
      data: investors,
      total,
      page,
      pageSize,
      pages: Math.ceil(total / pageSize),
      source: 'prisma',
    });
  } catch (err) {
    console.error('[GET /api/investors]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
