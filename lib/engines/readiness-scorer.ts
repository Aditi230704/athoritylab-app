/**
 * Startup Readiness Score Engine
 *
 * Scores a startup's investor-readiness 0–100 across 5 axes:
 *   Team Strength     (20) — team size, co-founders, advisors, domain expertise
 *   Product Maturity  (20) — live product, user count, NPS, v2 shipped
 *   Market Clarity    (20) — TAM/SAM/SOM, ICP definition, competition awareness
 *   Traction Evidence (20) — revenue, growth rate, retention, letters of intent
 *   Narrative Quality (20) — one-liner clarity, pitch deck, story coherence
 */

import { complete } from '@/lib/ai/openai';
import { prisma } from '@/lib/db/prisma';

// ─── Input types ─────────────────────────────────────────────────────────────

export interface ReadinessInput {
  founderId: string;
  // Team
  teamSize: number;
  hasCoFounder: boolean;
  domainExpertiseYears: number;
  advisorCount: number;
  hasIndustryAdvisors: boolean;
  // Product
  hasLiveProduct: boolean;
  userCount: number;
  npsScore?: number;       // -100 to 100
  hasV2Shipped: boolean;
  weeklyActiveUsers?: number;
  // Market
  hasDefinedTAM: boolean;
  tamSizeUSD?: number;     // Total Addressable Market USD M
  hasICPDefined: boolean;  // Ideal Customer Profile
  hasCompetitorAnalysis: boolean;
  hasUnfairAdvantage: boolean;
  // Traction
  mrr: number;             // Monthly Recurring Revenue USD
  mrrGrowthRate?: number;  // % month-over-month
  hasRevenue: boolean;
  hasRetentionData: boolean;
  retentionRate?: number;  // % at 90 days
  hasLOI: boolean;         // Letters of Intent
  hasPayingCustomers: boolean;
  // Narrative
  hasOneLiner: boolean;
  oneLiner?: string;
  hasPitchDeck: boolean;
  pitchDeckSlides?: number;
  hasFounderStory: boolean;
  pitchedInvestorsBefore: boolean;
}

export interface ReadinessResult {
  total: number;
  teamStrength: number;
  productMaturity: number;
  marketClarity: number;
  tractionEvidence: number;
  narrativeQuality: number;
  fixList: FixItem[];
  aiInsights: string;
  signals: ReadinessInput;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  raiseReadyIn?: string; // e.g. "3–4 weeks" or "Already ready"
}

interface FixItem {
  week: 1 | 2 | 3;
  axis: string;
  task: string;
  why: string;
  effort: 'low' | 'medium' | 'high';
}

// ─── Main scorer ─────────────────────────────────────────────────────────────

export async function computeReadinessScore(
  input: ReadinessInput,
): Promise<ReadinessResult> {
  const teamStrength = scoreTeam(input);
  const productMaturity = scoreProduct(input);
  const marketClarity = scoreMarket(input);
  const tractionEvidence = scoreTraction(input);
  const narrativeQuality = scoreNarrative(input);

  const total = Math.round(
    teamStrength + productMaturity + marketClarity + tractionEvidence + narrativeQuality,
  );

  const [fixList, aiInsights] = await Promise.all([
    buildFixList(input, { teamStrength, productMaturity, marketClarity, tractionEvidence, narrativeQuality }),
    generateAIInsights(input, total),
  ]);

  // Persist
  await prisma.readinessScore.create({
    data: {
      founderId: input.founderId,
      total,
      teamStrength,
      productMaturity,
      marketClarity,
      tractionEvidence,
      narrativeQuality,
      signals: input as object,
      fixList: fixList as object,
      aiInsights,
    },
  });

  await prisma.founder.update({
    where: { id: input.founderId },
    data: { readinessScore: total, lastScoredAt: new Date() },
  });

  return {
    total,
    teamStrength,
    productMaturity,
    marketClarity,
    tractionEvidence,
    narrativeQuality,
    fixList,
    aiInsights,
    signals: input,
    grade: getGrade(total),
    raiseReadyIn: getRaiseTimeline(total),
  };
}

// ─── Axis scorers ─────────────────────────────────────────────────────────────

function scoreTeam(i: ReadinessInput): number {
  let s = 0;
  if (i.hasCoFounder) s += 5;
  if (i.teamSize >= 3) s += 5;
  else if (i.teamSize >= 2) s += 3;
  if (i.domainExpertiseYears >= 5) s += 5;
  else if (i.domainExpertiseYears >= 2) s += 3;
  else if (i.domainExpertiseYears >= 1) s += 1;
  if (i.hasIndustryAdvisors) s += 3;
  if (i.advisorCount >= 3) s += 2;
  return clamp(s, 0, 20);
}

function scoreProduct(i: ReadinessInput): number {
  let s = 0;
  if (i.hasLiveProduct) s += 6;
  if (i.userCount >= 1000) s += 6;
  else if (i.userCount >= 100) s += 4;
  else if (i.userCount >= 10) s += 2;
  if (i.npsScore !== undefined) {
    if (i.npsScore >= 50) s += 4;
    else if (i.npsScore >= 20) s += 2;
    else if (i.npsScore >= 0) s += 1;
  }
  if (i.hasV2Shipped) s += 2;
  if (i.weeklyActiveUsers && i.weeklyActiveUsers >= 100) s += 2;
  return clamp(s, 0, 20);
}

function scoreMarket(i: ReadinessInput): number {
  let s = 0;
  if (i.hasDefinedTAM) s += 4;
  if (i.tamSizeUSD) {
    if (i.tamSizeUSD >= 1000) s += 4;       // $1B+
    else if (i.tamSizeUSD >= 100) s += 3;   // $100M+
    else if (i.tamSizeUSD >= 10) s += 1;    // $10M+
  }
  if (i.hasICPDefined) s += 4;
  if (i.hasCompetitorAnalysis) s += 4;
  if (i.hasUnfairAdvantage) s += 4;
  return clamp(s, 0, 20);
}

function scoreTraction(i: ReadinessInput): number {
  let s = 0;
  if (i.hasRevenue) s += 4;
  if (i.mrr >= 10000) s += 6;
  else if (i.mrr >= 1000) s += 4;
  else if (i.mrr >= 100) s += 2;
  if (i.mrrGrowthRate) {
    if (i.mrrGrowthRate >= 20) s += 4;   // 20% MoM
    else if (i.mrrGrowthRate >= 10) s += 2;
  }
  if (i.hasRetentionData) s += 2;
  if (i.retentionRate && i.retentionRate >= 80) s += 2;
  if (i.hasLOI) s += 1;
  if (i.hasPayingCustomers) s += 1;
  return clamp(s, 0, 20);
}

function scoreNarrative(i: ReadinessInput): number {
  let s = 0;
  if (i.hasOneLiner) s += 4;
  if (i.oneLiner && i.oneLiner.length <= 120 && i.oneLiner.length >= 20) s += 2; // tight one-liner
  if (i.hasPitchDeck) s += 5;
  if (i.pitchDeckSlides && i.pitchDeckSlides >= 8 && i.pitchDeckSlides <= 15) s += 2;
  if (i.hasFounderStory) s += 4;
  if (i.pitchedInvestorsBefore) s += 3;
  return clamp(s, 0, 20);
}

// ─── Fix list (3-week action plan) ──────────────────────────────────────────

async function buildFixList(
  i: ReadinessInput,
  scores: Record<string, number>,
): Promise<FixItem[]> {
  const items: FixItem[] = [];

  // Week 1 — highest impact, lowest effort
  if (scores.narrativeQuality < 12 && !i.hasOneLiner) {
    items.push({ week: 1, axis: 'Narrative', task: 'Write your one-liner: "We help [ICP] do [outcome] without [pain]." Keep it under 15 words.', why: 'Investors decide in 8 seconds. The one-liner is the door.', effort: 'low' });
  }
  if (scores.marketClarity < 10 && !i.hasICPDefined) {
    items.push({ week: 1, axis: 'Market', task: 'Write a 1-page ICP doc: job title, company size, trigger event, and top 3 pain points of your buyer.', why: 'Undefined ICP = undefined market. Investors can\'t pattern-match you.', effort: 'low' });
  }
  if (!i.hasPitchDeck) {
    items.push({ week: 1, axis: 'Narrative', task: 'Build a 10-slide pitch deck: problem, solution, market, traction, team, ask. Use Figma or Pitch.', why: 'No deck = no credibility in a first meeting.', effort: 'medium' });
  }

  // Week 2 — data gathering
  if (scores.tractionEvidence < 10 && !i.hasLOI) {
    items.push({ week: 2, axis: 'Traction', task: 'Get 3 Letters of Intent from potential customers — even unpaid beta users with a signed email commitment.', why: 'LOIs are the fastest credibility upgrade for pre-revenue startups.', effort: 'medium' });
  }
  if (scores.teamStrength < 10 && i.advisorCount < 2) {
    items.push({ week: 2, axis: 'Team', task: 'Recruit 2 advisors with direct domain expertise. Offer 0.1–0.25% vesting over 2 years.', why: 'Advisors are borrowed credibility — investors trust who\'s backing you.', effort: 'medium' });
  }
  if (!i.hasCompetitorAnalysis) {
    items.push({ week: 2, axis: 'Market', task: 'Build a 2×2 competitor matrix. Plot on price and capability axes. Know why you win in the top-right.', why: 'Investors will ask "what about X?" in the first 5 minutes.', effort: 'low' });
  }

  // Week 3 — polish and outreach prep
  if (scores.tractionEvidence < 15 && !i.hasRetentionData) {
    items.push({ week: 3, axis: 'Traction', task: 'Set up Mixpanel or PostHog and measure D7, D30 retention. One clean chart beats 10 anecdotes.', why: 'Retention data signals product-market fit more than anything else.', effort: 'medium' });
  }
  if (scores.narrativeQuality < 15 && !i.hasFounderStory) {
    items.push({ week: 3, axis: 'Narrative', task: 'Write your founder story: why you, why now, why this problem. Record it as a 90-second Loom for intro emails.', why: 'The best investors invest in founders first. Give them the story.', effort: 'low' });
  }

  return items.slice(0, 9); // max 9 items across 3 weeks
}

async function generateAIInsights(input: ReadinessInput, total: number): Promise<string> {
  try {
    const result = await complete<{ insights: string }>(
      `You are a seasoned venture capital analyst. Given a startup's readiness assessment,
       write a 2-sentence honest and specific insight about their biggest strength and the
       single most important thing they need to fix before their next investor conversation.
       Return JSON: { "insights": "<your 2-sentence insight>" }`,
      `Readiness score: ${total}/100
       Team size: ${input.teamSize}
       Has co-founder: ${input.hasCoFounder}
       Has live product: ${input.hasLiveProduct}
       Users: ${input.userCount}
       MRR: $${input.mrr}
       Has defined ICP: ${input.hasICPDefined}
       Has pitch deck: ${input.hasPitchDeck}
       Domain expertise: ${input.domainExpertiseYears} years`,
    );
    return result.insights;
  } catch {
    return `Your startup scores ${total}/100 on investor readiness. Focus on the highest-priority items in your fix list to make meaningful progress in the next 3 weeks.`;
  }
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 50) return 'C';
  if (score >= 35) return 'D';
  return 'F';
}

function getRaiseTimeline(score: number): string {
  if (score >= 80) return 'Already raise-ready';
  if (score >= 65) return '2–3 weeks of polish';
  if (score >= 50) return '4–6 weeks of focused work';
  if (score >= 35) return '6–10 weeks of foundation-building';
  return '3+ months — focus on product and traction first';
}
