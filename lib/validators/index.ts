import { z } from 'zod';

export const StageEnum = z.enum([
  'IDEA', 'PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C_PLUS', 'BOOTSTRAPPED', 'GROWTH',
]);

// ─── Visibility Score ─────────────────────────────────────────────────────────

export const VisibilityInputSchema = z.object({
  founderId: z.string().min(1),
  name: z.string().min(1),
  bio: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  linkedinFollowers: z.number().min(0).optional(),
  linkedinPosts: z.number().min(0).optional(),
  linkedinEngagementRate: z.number().min(0).max(100).optional(),
  linkedinPostsPerWeek: z.number().min(0).optional(),
  twitterFollowers: z.number().min(0).optional(),
  twitterTweets: z.number().min(0).optional(),
  twitterEngagementRate: z.number().min(0).max(100).optional(),
  twitterPostsPerWeek: z.number().min(0).optional(),
  redditKarma: z.number().min(0).optional(),
  redditPostsPerMonth: z.number().min(0).optional(),
  pressHits: z.number().min(0).optional(),
  podcastAppearances: z.number().min(0).optional(),
  speakingGigs: z.number().min(0).optional(),
  googleFirstPage: z.boolean().optional(),
});

// ─── Readiness Score ──────────────────────────────────────────────────────────

export const ReadinessInputSchema = z.object({
  founderId: z.string().min(1),
  teamSize: z.number().min(1).max(500),
  hasCoFounder: z.boolean(),
  domainExpertiseYears: z.number().min(0).max(40),
  advisorCount: z.number().min(0),
  hasIndustryAdvisors: z.boolean(),
  hasLiveProduct: z.boolean(),
  userCount: z.number().min(0),
  npsScore: z.number().min(-100).max(100).optional(),
  hasV2Shipped: z.boolean(),
  weeklyActiveUsers: z.number().min(0).optional(),
  hasDefinedTAM: z.boolean(),
  tamSizeUSD: z.number().min(0).optional(),
  hasICPDefined: z.boolean(),
  hasCompetitorAnalysis: z.boolean(),
  hasUnfairAdvantage: z.boolean(),
  mrr: z.number().min(0),
  mrrGrowthRate: z.number().optional(),
  hasRevenue: z.boolean(),
  hasRetentionData: z.boolean(),
  retentionRate: z.number().min(0).max(100).optional(),
  hasLOI: z.boolean(),
  hasPayingCustomers: z.boolean(),
  hasOneLiner: z.boolean(),
  oneLiner: z.string().max(200).optional(),
  hasPitchDeck: z.boolean(),
  pitchDeckSlides: z.number().min(0).max(50).optional(),
  hasFounderStory: z.boolean(),
  pitchedInvestorsBefore: z.boolean(),
});

// ─── Investor Discovery ───────────────────────────────────────────────────────

export const InvestorSearchSchema = z.object({
  q: z.string().optional(),
  stages: z.array(StageEnum).optional(),
  industries: z.array(z.string()).optional(),
  geographies: z.array(z.string()).optional(),
  checkMin: z.number().optional(),
  checkMax: z.number().optional(),
  sortBy: z.enum(['warmthScore', 'portfolioCount', 'checkSizeMin', 'name']).optional().default('warmthScore'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.number().min(1).optional().default(1),
  pageSize: z.number().min(1).max(100).optional().default(20),
});

// ─── Matching ─────────────────────────────────────────────────────────────────

export const MatchInputSchema = z.object({
  founderId: z.string().min(1),
  startupName: z.string().min(1),
  stage: StageEnum,
  industries: z.array(z.string()).min(1),
  country: z.string().min(1),
  mrr: z.number().min(0),
  description: z.string().min(10).max(1000),
  oneLiner: z.string().max(200).optional(),
  teamSize: z.number().min(1),
  hasRevenue: z.boolean(),
  twitterHandle: z.string().optional(),
  linkedinUrl: z.string().optional(),
});

// ─── Founder ──────────────────────────────────────────────────────────────────

export const CreateFounderSchema = z.object({
  userId: z.string().min(1),
  startupName: z.string().optional(),
  stage: StageEnum.optional(),
  industries: z.array(z.string()).optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().max(2000).optional(),
  website: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  twitterHandle: z.string().optional(),
  redditUsername: z.string().optional(),
});
