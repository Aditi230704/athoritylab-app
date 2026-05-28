import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const investor = await prisma.investor.findUnique({
      where: { id },
      include: {
        firm: true,
        portfolioCompanies: { orderBy: { year: 'desc' }, take: 10 },
      },
    });

    if (!investor) {
      return Response.json({ error: 'Investor not found' }, { status: 404 });
    }

    return Response.json({ data: investor });
  } catch (err) {
    console.error('[GET /api/investors/:id]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
