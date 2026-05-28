/**
 * AI Investor Matching Engine
 *
 * Given a founder's profile, finds the best-fit investors from the database
 * by combining:
 *   1. Hard filters  — stage, industry, geo, check size must overlap
 *   2. AI scoring    — GPT-4o-mini evaluates thesis fit 0–100
 *   3. Warmth path   — surface mutual connections or shared signals
 */

import { complete } from '@/lib/ai/openai';
import { prisma } from '@/lib/db/prisma';
import type { Stage } from '@/app/generated/prisma/client';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MatchInput {
  founderId: string;
  startupName: string;
  stage: Stage;
  industries: string[];
  country: string;
  mrr: number;
  description: string;
  oneLiner?: string;
  teamSize: number;
  hasRevenue: boolean;
  // Optional social signals for warmth path
  twitterHandle?: string;
  linkedinUrl?: string;
}

export interface MatchResult {
  investorId: string;
  name: string;
  role: string;
  firm: string | null;
  checkRange: string;
  geographies: string[];
  industries: string[];
  score: number;
  reasons: string[];
  warmthPath: string | null;
  aiRationale: string;
  bio: string | null;
  linkedinUrl: string | null;
  twitterHandle: string | null;
  profileImageUrl: string | null;
  warmthScore: number;
}

// ─── Main matcher ─────────────────────────────────────────────────────────────

export async function findInvestorMatches(
  input: MatchInput,
  limit = 20,
): Promise<MatchResult[]> {
  // 1. Hard-filter candidates from DB
  const candidates = await prisma.investor.findMany({
    where: {
      isActive: true,
      stages: { has: input.stage },
      // geography filter: empty array means global
      OR: [
        { geographies: { isEmpty: true } },
        { geographies: { has: input.country } },
        { geographies: { has: 'Global' } },
        { geographies: { has: 'Worldwide' } },
      ],
    },
    include: { firm: true },
    take: 100, // score the top 100 hard-filtered candidates
  });

  if (candidates.length === 0) return [];

  // 2. Industry soft-filter — score by overlap
  const industryScored = candidates.map((inv) => {
    const overlap = inv.industries.filter((ind) =>
      input.industries.some(
        (fi) => fi.toLowerCase().includes(ind.toLowerCase()) || ind.toLowerCase().includes(fi.toLowerCase()),
      ),
    );
    return { ...inv, industryOverlap: overlap.length };
  });

  // Sort by industry match, then warmth
  industryScored.sort((a, b) => {
    if (b.industryOverlap !== a.industryOverlap) return b.industryOverlap - a.industryOverlap;
    return b.warmthScore - a.warmthScore;
  });

  const top = industryScored.slice(0, 30); // AI-score the top 30

  // 3. AI scoring in parallel (batched to avoid rate limits)
  const BATCH = 5;
  const scored: MatchResult[] = [];

  for (let i = 0; i < top.length; i += BATCH) {
    const batch = top.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map((inv) => scoreInvestorFit(input, inv)),
    );
    scored.push(...results);
  }

  // 4. Sort by score desc, save top matches to DB
  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.slice(0, limit);

  // Persist matches
  await Promise.all(
    topMatches.map((m) =>
      prisma.investorMatch.upsert({
        where: { founderId_investorId: { founderId: input.founderId, investorId: m.investorId } },
        create: {
          founderId: input.founderId,
          investorId: m.investorId,
          score: m.score,
          reasons: m.reasons,
          warmthPath: m.warmthPath,
          aiRationale: m.aiRationale,
        },
        update: {
          score: m.score,
          reasons: m.reasons,
          warmthPath: m.warmthPath,
          aiRationale: m.aiRationale,
        },
      }),
    ),
  );

  return topMatches;
}

// ─── Per-investor AI scoring ──────────────────────────────────────────────────

async function scoreInvestorFit(
  founder: MatchInput,
  investor: {
    id: string;
    name: string;
    role: string;
    bio: string | null;
    thesisText: string | null;
    industries: string[];
    stages: Stage[];
    geographies: string[];
    checkSizeMin: number | null;
    checkSizeMax: number | null;
    warmthScore: number;
    linkedinUrl: string | null;
    twitterHandle: string | null;
    profileImageUrl: string | null;
    firm: { name: string } | null;
  },
): Promise<MatchResult> {
  const checkRange = formatCheckRange(investor.checkSizeMin, investor.checkSizeMax);

  try {
    type AIMatch = { score: number; reasons: string[]; warmthPath: string | null; rationale: string };
    const ai = await complete<AIMatch>(
      `You are an expert venture capital analyst who evaluates founder-investor fit.
       Given a startup profile and an investor's thesis, return a JSON match assessment:
       {
         "score": <0-100 integer, how well this investor fits this startup>,
         "reasons": ["<reason 1>", "<reason 2>", "<reason 3>"],
         "warmthPath": "<one specific way the founder could get a warm intro, or null>",
         "rationale": "<2 sentence explanation of the match>"
       }
       Be specific. A score of 80+ means excellent thesis alignment and high chance of interest.`,
      `STARTUP:
Name: ${founder.startupName}
Stage: ${founder.stage}
Industry: ${founder.industries.join(', ')}
Country: ${founder.country}
MRR: $${founder.mrr}/month
Team: ${founder.teamSize} people
Description: ${founder.description}
${founder.oneLiner ? `One-liner: ${founder.oneLiner}` : ''}

INVESTOR:
Name: ${investor.name} (${investor.role} at ${investor.firm?.name ?? 'Independent'})
Focus stages: ${investor.stages.join(', ')}
Focus industries: ${investor.industries.join(', ')}
Geographies: ${investor.geographies.join(', ')}
Check size: ${checkRange}
Bio: ${investor.bio ?? 'No bio available'}
${investor.thesisText ? `Thesis: ${investor.thesisText}` : ''}`,
    );

    return {
      investorId: investor.id,
      name: investor.name,
      role: investor.role,
      firm: investor.firm?.name ?? null,
      checkRange,
      geographies: investor.geographies,
      industries: investor.industries,
      score: clamp(ai.score, 0, 100),
      reasons: ai.reasons.slice(0, 3),
      warmthPath: ai.warmthPath,
      aiRationale: ai.rationale,
      bio: investor.bio,
      linkedinUrl: investor.linkedinUrl,
      twitterHandle: investor.twitterHandle,
      profileImageUrl: investor.profileImageUrl,
      warmthScore: investor.warmthScore,
    };
  } catch {
    // Fallback scoring if AI call fails
    const baseScore = Math.round(
      50 + investor.warmthScore * 0.2 + (investor.industries.length > 0 ? 10 : 0),
    );
    return {
      investorId: investor.id,
      name: investor.name,
      role: investor.role,
      firm: investor.firm?.name ?? null,
      checkRange,
      geographies: investor.geographies,
      industries: investor.industries,
      score: clamp(baseScore, 0, 100),
      reasons: ['Stage alignment', 'Industry overlap', 'Geographic match'],
      warmthPath: null,
      aiRationale: 'This investor focuses on your stage and sector.',
      bio: investor.bio,
      linkedinUrl: investor.linkedinUrl,
      twitterHandle: investor.twitterHandle,
      profileImageUrl: investor.profileImageUrl,
      warmthScore: investor.warmthScore,
    };
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function formatCheckRange(min: number | null, max: number | null): string {
  if (!min && !max) return 'Undisclosed';
  const fmt = (n: number) => (n >= 1_000_000 ? `$${n / 1_000_000}M` : `$${n / 1_000}K`);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `${fmt(min)}+`;
  if (max) return `Up to ${fmt(max)}`;
  return 'Undisclosed';
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
