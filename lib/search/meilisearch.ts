import { Meilisearch } from 'meilisearch';

// Meilisearch is optional — if MEILISEARCH_HOST is not set, all search calls
// fall through to Prisma full-text queries automatically.
export const meili = process.env.MEILISEARCH_HOST
  ? new Meilisearch({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_API_KEY,
    })
  : null;

export const INVESTOR_INDEX = 'investors';
export const OPPORTUNITY_INDEX = 'opportunities';

// ─── Index Setup ─────────────────────────────────────────────────────────────

/** Run once during setup / seed to configure Meilisearch index settings */
export async function setupInvestorIndex() {
  if (!meili) return;
  const index = meili.index(INVESTOR_INDEX);
  await index.updateSettings({
    searchableAttributes: ['name', 'bio', 'thesisText', 'industries', 'firm.name'],
    filterableAttributes: ['stages', 'geographies', 'industries', 'isActive', 'role', 'checkSizeMin', 'checkSizeMax'],
    sortableAttributes: ['warmthScore', 'portfolioCount', 'checkSizeMin'],
    rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
  });
}

/** Sync a batch of investors into Meilisearch */
export async function indexInvestors(
  investors: Array<{
    id: string;
    name: string;
    bio: string | null;
    thesisText: string | null;
    industries: string[];
    stages: string[];
    geographies: string[];
    isActive: boolean;
    role: string;
    warmthScore: number;
    portfolioCount: number | null;
    checkSizeMin: number | null;
    checkSizeMax: number | null;
    firm: { name: string } | null;
  }>,
) {
  if (!meili) return;
  const index = meili.index(INVESTOR_INDEX);
  await index.addDocuments(investors, { primaryKey: 'id' });
}
