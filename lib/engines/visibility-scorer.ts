/**
 * Founder Visibility Score Engine
 *
 * Scores founders 0–100 across 5 axes:
 *   Findability   (20) — Google/SEO presence, profile completeness
 *   Credibility   (20) — Verified signals, website, media mentions
 *   Consistency   (20) — Posting cadence across platforms
 *   Reach         (20) — Audience size + engagement rate
 *   Sentiment     (20) — Content quality + community reception
 */

import { complete } from '@/lib/ai/openai';
import { prisma } from '@/lib/db/prisma';

// ─── Input types ─────────────────────────────────────────────────────────────

export interface VisibilityInput {
  founderId: string;
  // Identity
  name: string;
  bio?: string;
  website?: string;
  // LinkedIn
  linkedinFollowers?: number;
  linkedinPosts?: number;
  linkedinEngagementRate?: number; // %
  linkedinPostsPerWeek?: number;
  // Twitter / X
  twitterFollowers?: number;
  twitterTweets?: number;
  twitterEngagementRate?: number;
  twitterPostsPerWeek?: number;
  // Reddit
  redditKarma?: number;
  redditPostsPerMonth?: number;
  // Press / authority signals
  pressHits?: number;       // # of media mentions
  podcastAppearances?: number;
  speakingGigs?: number;
  googleFirstPage?: boolean; // Do they appear on page 1 for their name?
}

export interface VisibilityResult {
  total: number;
  findability: number;
  credibility: number;
  consistency: number;
  reach: number;
  sentiment: number;
  recommendations: Recommendation[];
  signals: VisibilityInput;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

interface Recommendation {
  axis: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  impact: string;
  timeframe: string;
}

// ─── Scoring logic ───────────────────────────────────────────────────────────

export async function computeVisibilityScore(
  input: VisibilityInput,
): Promise<VisibilityResult> {
  const findability = scoreFindability(input);
  const credibility = scoreCredibility(input);
  const consistency = scoreConsistency(input);
  const reach = scoreReach(input);
  const sentiment = await scoreSentiment(input);

  const total = Math.round(findability + credibility + consistency + reach + sentiment);

  const recommendations = buildRecommendations(input, {
    findability, credibility, consistency, reach, sentiment,
  });

  // Persist to DB
  await prisma.visibilityScore.create({
    data: {
      founderId: input.founderId,
      total,
      findability,
      credibility,
      consistency,
      reach,
      sentiment,
      signals: input as object,
      recommendations: recommendations as object,
    },
  });

  // Update cached score on founder
  await prisma.founder.update({
    where: { id: input.founderId },
    data: { visibilityScore: total, lastScoredAt: new Date() },
  });

  return {
    total,
    findability,
    credibility,
    consistency,
    reach,
    sentiment,
    recommendations,
    signals: input,
    grade: getGrade(total),
  };
}

// ─── Axis scorers (each returns 0–20) ────────────────────────────────────────

function scoreFindability(i: VisibilityInput): number {
  let score = 0;
  if (i.googleFirstPage) score += 10;
  if (i.website) score += 4;
  if (i.bio && i.bio.length > 100) score += 3;
  if (i.pressHits && i.pressHits >= 3) score += 3;
  else if (i.pressHits && i.pressHits >= 1) score += 1;
  return clamp(score, 0, 20);
}

function scoreCredibility(i: VisibilityInput): number {
  let score = 0;
  if (i.website) score += 3;
  if (i.pressHits && i.pressHits >= 5) score += 5;
  else if (i.pressHits && i.pressHits >= 2) score += 3;
  if (i.podcastAppearances && i.podcastAppearances >= 3) score += 4;
  else if (i.podcastAppearances && i.podcastAppearances >= 1) score += 2;
  if (i.speakingGigs && i.speakingGigs >= 2) score += 4;
  else if (i.speakingGigs && i.speakingGigs >= 1) score += 2;
  if (i.linkedinFollowers && i.linkedinFollowers >= 1000) score += 4;
  else if (i.linkedinFollowers && i.linkedinFollowers >= 300) score += 2;
  return clamp(score, 0, 20);
}

function scoreConsistency(i: VisibilityInput): number {
  let score = 0;
  const liCadence = i.linkedinPostsPerWeek ?? 0;
  const twCadence = i.twitterPostsPerWeek ?? 0;
  const rdCadence = (i.redditPostsPerMonth ?? 0) / 4; // normalize to per week

  // LinkedIn cadence (up to 10 pts)
  if (liCadence >= 4) score += 10;
  else if (liCadence >= 2) score += 7;
  else if (liCadence >= 1) score += 4;
  else if (liCadence > 0) score += 2;

  // Twitter cadence (up to 7 pts)
  if (twCadence >= 7) score += 7;
  else if (twCadence >= 3) score += 5;
  else if (twCadence >= 1) score += 3;
  else if (twCadence > 0) score += 1;

  // Reddit cadence (up to 3 pts)
  if (rdCadence >= 1) score += 3;
  else if (rdCadence >= 0.5) score += 1;

  return clamp(score, 0, 20);
}

function scoreReach(i: VisibilityInput): number {
  let score = 0;
  const li = i.linkedinFollowers ?? 0;
  const tw = i.twitterFollowers ?? 0;

  // LinkedIn followers (up to 10 pts)
  if (li >= 10000) score += 10;
  else if (li >= 5000) score += 8;
  else if (li >= 1000) score += 6;
  else if (li >= 500) score += 4;
  else if (li >= 100) score += 2;

  // Twitter followers (up to 7 pts)
  if (tw >= 10000) score += 7;
  else if (tw >= 5000) score += 5;
  else if (tw >= 1000) score += 4;
  else if (tw >= 500) score += 2;
  else if (tw >= 100) score += 1;

  // Engagement quality (up to 3 pts)
  const liEng = i.linkedinEngagementRate ?? 0;
  if (liEng >= 5) score += 3;
  else if (liEng >= 2) score += 2;
  else if (liEng >= 1) score += 1;

  return clamp(score, 0, 20);
}

async function scoreSentiment(i: VisibilityInput): Promise<number> {
  // If no bio/content to analyse, return a mid baseline
  if (!i.bio || i.bio.length < 50) return 10;

  try {
    const result = await complete<{ score: number; rationale: string }>(
      `You are an expert at evaluating founder personal branding quality.
       Analyse the provided bio/description for tone, clarity, specificity,
       and authority signals. Return JSON: { "score": <0-20>, "rationale": "<one sentence>" }`,
      `Founder bio: "${i.bio}"\n\nBio length: ${i.bio.length} chars.`,
    );
    return clamp(result.score, 0, 20);
  } catch {
    return 10; // fallback if AI call fails
  }
}

// ─── Recommendations ─────────────────────────────────────────────────────────

function buildRecommendations(
  i: VisibilityInput,
  scores: { findability: number; credibility: number; consistency: number; reach: number; sentiment: number },
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (scores.findability < 10) {
    recs.push({
      axis: 'Findability',
      priority: 'high',
      action: 'Set up a personal website with your name as the domain (firstname.com or firstnamelastname.com)',
      impact: '+6–10 findability points',
      timeframe: '1 week',
    });
  }
  if (!i.googleFirstPage) {
    recs.push({
      axis: 'Findability',
      priority: 'high',
      action: 'Publish 3 bylined articles on your topic — Medium, Substack, or your own blog — to surface on page 1 for your name',
      impact: 'Appears in Google for your name within 30–60 days',
      timeframe: '3 weeks',
    });
  }
  if (scores.credibility < 10) {
    recs.push({
      axis: 'Credibility',
      priority: 'high',
      action: 'Pitch 2 podcasts in your category for a guest appearance — use your warm intros network',
      impact: '+4–6 credibility points per appearance',
      timeframe: '4–6 weeks',
    });
  }
  if ((i.linkedinPostsPerWeek ?? 0) < 2) {
    recs.push({
      axis: 'Consistency',
      priority: 'high',
      action: 'Commit to posting on LinkedIn 3× per week — one insight, one story, one opinion',
      impact: '+5–8 consistency points in 30 days',
      timeframe: '30 days',
    });
  }
  if ((i.linkedinFollowers ?? 0) < 1000) {
    recs.push({
      axis: 'Reach',
      priority: 'medium',
      action: 'Leave 10 substantive comments/day on posts by founders 10× your size — this is the fastest organic follower engine on LinkedIn',
      impact: '+200–500 followers per month',
      timeframe: '4 weeks',
    });
  }
  if (scores.sentiment < 12) {
    recs.push({
      axis: 'Credibility & Sentiment',
      priority: 'medium',
      action: 'Rewrite your LinkedIn "About" section to lead with the problem you solve and the specific result you get — not your CV',
      impact: '+3–5 sentiment points, higher profile-to-connection rate',
      timeframe: '1 day',
    });
  }

  return recs;
}

// ─── Utilities ───────────────────────────────────────────────────────────────

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
