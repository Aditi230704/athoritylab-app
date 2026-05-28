/**
 * AthorityLab — Database Seed
 * Run: npx prisma db seed
 *
 * Seeds:
 *  - 12 investor firms
 *  - 60 investors
 *  - 20 opportunities
 *  - 8 community rooms
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../app/generated/prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ─── Firms ────────────────────────────────────────────────────────────────────

const FIRMS = [
  { name: 'Sequoia Capital', website: 'https://sequoiacap.com', aum: 85000, foundedYear: 1972, locations: ['US', 'India', 'China', 'Europe'], focusStages: ['SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C_PLUS'], focusIndustries: ['SaaS', 'AI', 'Fintech', 'Consumer', 'Healthcare'], notablePortfolio: ['Apple', 'Google', 'WhatsApp', 'Airbnb', 'Stripe'] },
  { name: 'Accel', website: 'https://accel.com', aum: 13000, foundedYear: 1983, locations: ['US', 'India', 'Europe'], focusStages: ['SEED', 'SERIES_A', 'SERIES_B'], focusIndustries: ['SaaS', 'Fintech', 'Security', 'Infrastructure'], notablePortfolio: ['Facebook', 'Atlassian', 'Slack', 'Flipkart', 'Freshworks'] },
  { name: 'Andreessen Horowitz', website: 'https://a16z.com', aum: 35000, foundedYear: 2009, locations: ['US'], focusStages: ['SEED', 'SERIES_A', 'SERIES_B', 'SERIES_C_PLUS'], focusIndustries: ['AI', 'Crypto', 'Bio', 'Consumer', 'SaaS', 'Fintech'], notablePortfolio: ['Coinbase', 'GitHub', 'Lyft', 'Roblox', 'Substack'] },
  { name: 'Antler', website: 'https://antler.co', aum: 500, foundedYear: 2017, locations: ['India', 'Southeast Asia', 'Europe', 'Africa', 'US', 'Australia'], focusStages: ['IDEA', 'PRE_SEED'], focusIndustries: ['SaaS', 'AI', 'Fintech', 'Climate', 'Consumer'], notablePortfolio: ['Pattern', 'Juni', 'Rara.ai'] },
  { name: 'Blume Ventures', website: 'https://blume.vc', aum: 350, foundedYear: 2011, locations: ['India'], focusStages: ['PRE_SEED', 'SEED', 'SERIES_A'], focusIndustries: ['SaaS', 'Fintech', 'Consumer', 'Deep Tech', 'Climate'], notablePortfolio: ['Unacademy', 'Dunzo', 'Purplle', 'Slice', 'WebEngage'] },
  { name: 'Lightspeed Venture Partners', website: 'https://lsvp.com', aum: 18000, foundedYear: 2000, locations: ['US', 'India', 'Israel', 'Europe'], focusStages: ['SEED', 'SERIES_A', 'SERIES_B'], focusIndustries: ['AI', 'SaaS', 'Consumer', 'Fintech', 'Health'], notablePortfolio: ['Snap', 'MakeMyTrip', 'OYO', 'Udaan', 'Byju\'s'] },
  { name: 'Peak XV Partners', website: 'https://peakxv.com', aum: 9000, foundedYear: 2006, locations: ['India', 'Southeast Asia'], focusStages: ['SEED', 'SERIES_A', 'SERIES_B', 'GROWTH'], focusIndustries: ['Consumer', 'SaaS', 'Fintech', 'Healthcare', 'EdTech'], notablePortfolio: ['Ola', 'Zomato', 'Meesho', 'CRED', 'Darwinbox'] },
  { name: 'Y Combinator', website: 'https://ycombinator.com', aum: 2000, foundedYear: 2005, locations: ['US', 'Global'], focusStages: ['IDEA', 'PRE_SEED', 'SEED'], focusIndustries: ['SaaS', 'AI', 'Fintech', 'Consumer', 'Healthcare', 'Climate'], notablePortfolio: ['Airbnb', 'Dropbox', 'Stripe', 'Reddit', 'DoorDash'] },
  { name: 'Matrix Partners India', website: 'https://matrixpartners.in', aum: 1200, foundedYear: 2006, locations: ['India'], focusStages: ['SEED', 'SERIES_A', 'SERIES_B'], focusIndustries: ['SaaS', 'Fintech', 'Consumer', 'B2B', 'Retail Tech'], notablePortfolio: ['Dailyhunt', 'Razorpay', 'Ola', 'Treebo', 'Stanza Living'] },
  { name: 'Kalaari Capital', website: 'https://kalaari.com', aum: 650, foundedYear: 2006, locations: ['India'], focusStages: ['SEED', 'SERIES_A'], focusIndustries: ['Consumer', 'SaaS', 'Fintech', 'Healthcare', 'Edtech'], notablePortfolio: ['Dream11', 'Snapdeal', 'Urban Ladder', 'Myntra'] },
  { name: 'General Catalyst', website: 'https://generalcatalyst.com', aum: 25000, foundedYear: 2000, locations: ['US', 'Europe', 'India'], focusStages: ['SEED', 'SERIES_A', 'SERIES_B', 'GROWTH'], focusIndustries: ['AI', 'Health', 'Climate', 'Fintech', 'SaaS'], notablePortfolio: ['Stripe', 'Airbnb', 'Snap', 'HubSpot', 'Livongo'] },
  { name: 'Tiger Global Management', website: 'https://tigerglobal.com', aum: 50000, foundedYear: 2001, locations: ['US', 'Global'], focusStages: ['SERIES_B', 'SERIES_C_PLUS', 'GROWTH'], focusIndustries: ['Consumer Internet', 'SaaS', 'Fintech', 'Edtech'], notablePortfolio: ['Flipkart', 'Ola', 'Byju\'s', 'CRED', 'PhonePe'] },
];

// ─── Investors ────────────────────────────────────────────────────────────────

const INVESTORS = [
  // Sequoia India
  { name: 'Rajan Anandan', firm: 'Peak XV Partners', role: 'MANAGING_PARTNER', stages: ['PRE_SEED', 'SEED', 'SERIES_A'], industries: ['SaaS', 'AI', 'Consumer', 'Edtech'], geographies: ['India', 'Southeast Asia'], checkSizeMin: 500000, checkSizeMax: 5000000, bio: 'MD at Peak XV Partners (formerly Sequoia India/SEA). Ex-Google India MD. Deep interest in AI-first startups and founders building for the next billion users.', thesisText: 'Backing founders who build for India and Southeast Asia at the intersection of AI and consumer.', twitterHandle: 'rajan_anandan', warmthScore: 72 },
  { name: 'Shailendra Singh', firm: 'Peak XV Partners', role: 'MANAGING_PARTNER', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['Consumer', 'Fintech', 'SaaS'], geographies: ['India'], checkSizeMin: 1000000, checkSizeMax: 20000000, bio: 'Managing Director at Peak XV Partners. Has backed Zomato, CRED, Meesho, Darwinbox.', warmthScore: 65 },
  // Accel India
  { name: 'Prashanth Prakash', firm: 'Accel', role: 'PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['SaaS', 'Fintech', 'Consumer', 'Healthcare'], geographies: ['India'], checkSizeMin: 500000, checkSizeMax: 8000000, bio: 'Partner at Accel India. Focused on SaaS and fintech. Has backed Freshworks, Flipkart, Swiggy.', twitterHandle: 'pprakash', warmthScore: 70 },
  { name: 'Anand Daniel', firm: 'Accel', role: 'PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['SaaS', 'AI', 'Deep Tech'], geographies: ['India'], checkSizeMin: 500000, checkSizeMax: 5000000, bio: 'Partner at Accel India focusing on deep tech, AI, and SaaS. Board member at Mfine, Locus.', warmthScore: 68 },
  // a16z
  { name: 'Marc Andreessen', firm: 'Andreessen Horowitz', role: 'GENERAL_PARTNER', stages: ['SERIES_A', 'SERIES_B', 'SERIES_C_PLUS'], industries: ['AI', 'Crypto', 'SaaS', 'Consumer', 'Bio'], geographies: ['US', 'Global'], checkSizeMin: 5000000, checkSizeMax: 100000000, bio: 'Co-founder and General Partner at a16z. Netscape founder. Focuses on transformative technology companies.', twitterHandle: 'pmarca', warmthScore: 42 },
  { name: 'Ben Horowitz', firm: 'Andreessen Horowitz', role: 'GENERAL_PARTNER', stages: ['SERIES_A', 'SERIES_B', 'SERIES_C_PLUS'], industries: ['SaaS', 'AI', 'Crypto', 'Consumer'], geographies: ['US'], checkSizeMin: 5000000, checkSizeMax: 50000000, bio: 'Co-founder and General Partner at a16z. Author of The Hard Thing About Hard Things.', twitterHandle: 'bhorowitz', warmthScore: 40 },
  { name: 'Andrew Chen', firm: 'Andreessen Horowitz', role: 'GENERAL_PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['Consumer', 'Gaming', 'Social', 'Marketplace'], geographies: ['US'], checkSizeMin: 1000000, checkSizeMax: 20000000, bio: 'GP at a16z focusing on consumer, games, and creator economy. Former head of growth at Uber.', twitterHandle: 'andrewchen', warmthScore: 61 },
  // Antler India
  { name: 'Nitin Sharma', firm: 'Antler', role: 'PARTNER', stages: ['IDEA', 'PRE_SEED'], industries: ['SaaS', 'AI', 'Fintech', 'Climate'], geographies: ['India'], checkSizeMin: 100000, checkSizeMax: 500000, bio: 'Partner at Antler India. Ex-Lightbox, Ex-Helion. Passionate about backing exceptional founders at day zero.', twitterHandle: 'nitinsharma', warmthScore: 76 },
  // Blume Ventures
  { name: 'Karthik Reddy', firm: 'Blume Ventures', role: 'MANAGING_PARTNER', stages: ['PRE_SEED', 'SEED', 'SERIES_A'], industries: ['SaaS', 'Fintech', 'Climate', 'Deep Tech'], geographies: ['India'], checkSizeMin: 200000, checkSizeMax: 3000000, bio: 'Co-founder and Managing Partner at Blume Ventures. Focused on enabling India\'s next generation of founders.', twitterHandle: 'kartreddy', warmthScore: 73 },
  { name: 'Sajith Pai', firm: 'Blume Ventures', role: 'PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['Consumer', 'SaaS', 'Edtech', 'Media'], geographies: ['India'], checkSizeMin: 200000, checkSizeMax: 2000000, bio: 'Director at Blume Ventures. Writes the popular "India Internet" newsletter. Focuses on consumer and media.', twitterHandle: 'sajithpai', warmthScore: 78 },
  // Lightspeed India
  { name: 'Bejul Somaia', firm: 'Lightspeed Venture Partners', role: 'PARTNER', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['Consumer', 'Fintech', 'SaaS', 'Healthcare'], geographies: ['India'], checkSizeMin: 1000000, checkSizeMax: 15000000, bio: 'Partner at Lightspeed India. Board at OYO, Udaan, Sharechat. Loves founders who think from first principles.', warmthScore: 66 },
  { name: 'Rahul Taneja', firm: 'Lightspeed Venture Partners', role: 'PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['SaaS', 'B2B', 'AI'], geographies: ['India', 'US'], checkSizeMin: 500000, checkSizeMax: 10000000, bio: 'Partner at Lightspeed India focused on enterprise SaaS and AI. Ex-McKinsey.', twitterHandle: 'rahultaneja', warmthScore: 69 },
  // YC
  { name: 'Garry Tan', firm: 'Y Combinator', role: 'MANAGING_PARTNER', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['AI', 'SaaS', 'Fintech', 'Consumer', 'Healthcare', 'Climate'], geographies: ['US', 'Global'], checkSizeMin: 125000, checkSizeMax: 500000, bio: 'President and CEO of Y Combinator. Co-founder of Posterous and Initialized Capital. Very online.', twitterHandle: 'garrytan', warmthScore: 58 },
  { name: 'Gustaf Alströmer', firm: 'Y Combinator', role: 'PARTNER', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['Consumer', 'SaaS', 'AI', 'Climate'], geographies: ['US', 'Europe', 'India'], checkSizeMin: 125000, checkSizeMax: 500000, bio: 'Partner at YC. Previously Head of Growth at Airbnb. Deep expertise in consumer product growth.', twitterHandle: 'gustaf', warmthScore: 62 },
  // Matrix India
  { name: 'Avnish Bajaj', firm: 'Matrix Partners India', role: 'MANAGING_DIRECTOR', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['Consumer', 'Fintech', 'SaaS', 'B2B'], geographies: ['India'], checkSizeMin: 1000000, checkSizeMax: 20000000, bio: 'Founder MD at Matrix India. Founded Baazee.com (acquired by eBay). Backs founders with strong conviction.', warmthScore: 64 },
  { name: 'Tarun Davda', firm: 'Matrix Partners India', role: 'MANAGING_DIRECTOR', stages: ['SEED', 'SERIES_A'], industries: ['Consumer', 'D2C', 'Retail Tech'], geographies: ['India'], checkSizeMin: 500000, checkSizeMax: 10000000, bio: 'MD at Matrix India focused on consumer internet and D2C. Backed Razorpay early.', twitterHandle: 'tarun_davda', warmthScore: 71 },
  // Kalaari
  { name: 'Vani Kola', firm: 'Kalaari Capital', role: 'MANAGING_DIRECTOR', stages: ['SEED', 'SERIES_A'], industries: ['Consumer', 'Healthcare', 'Edtech', 'SaaS'], geographies: ['India'], checkSizeMin: 500000, checkSizeMax: 8000000, bio: 'Founder and MD of Kalaari Capital. One of India\'s most active early-stage investors. Backed Dream11, Myntra.', twitterHandle: 'vani_kola', warmthScore: 70 },
  // General Catalyst
  { name: 'Hemant Taneja', firm: 'General Catalyst', role: 'MANAGING_DIRECTOR', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['Health', 'AI', 'Climate', 'Fintech'], geographies: ['US', 'India', 'Europe'], checkSizeMin: 2000000, checkSizeMax: 50000000, bio: 'MD at General Catalyst. Author of Intended Consequences. Passionate about AI and healthcare transformation.', twitterHandle: 'htaneja', warmthScore: 55 },
  // Angels
  { name: 'Naval Ravikant', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED'], industries: ['AI', 'Crypto', 'SaaS', 'Consumer'], geographies: ['US', 'Global'], checkSizeMin: 50000, checkSizeMax: 500000, bio: 'Co-founder of AngelList. Philosopher, investor, entrepreneur. Author of How to Get Rich (without getting lucky).', twitterHandle: 'naval', warmthScore: 52 },
  { name: 'Elad Gil', firm: null, role: 'ANGEL', stages: ['SEED', 'SERIES_A'], industries: ['AI', 'SaaS', 'Biotech', 'Fintech'], geographies: ['US'], checkSizeMin: 250000, checkSizeMax: 2000000, bio: 'Serial entrepreneur and investor. Author of High Growth Handbook. Ex-Google, co-founder of Color Genomics.', twitterHandle: 'eladgil', warmthScore: 61 },
  { name: 'Gokul Rajaram', firm: null, role: 'ANGEL', stages: ['SEED', 'SERIES_A'], industries: ['Consumer', 'Marketplace', 'Fintech', 'SaaS'], geographies: ['US', 'India'], checkSizeMin: 50000, checkSizeMax: 500000, bio: 'Product and business leader. Was at Square, DoorDash, Coinbase. Angel investor in 80+ companies.', twitterHandle: 'gokulr', warmthScore: 67 },
  { name: 'Kunal Shah', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED'], industries: ['Fintech', 'Consumer', 'SaaS', 'Healthcare'], geographies: ['India'], checkSizeMin: 50000, checkSizeMax: 300000, bio: 'Founder of CRED. One of India\'s most prolific angel investors with 200+ investments. Creator of Delta 4 framework.', twitterHandle: 'kunalb11', warmthScore: 73 },
  { name: 'Anupam Mittal', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED'], industries: ['Consumer', 'Fintech', 'D2C', 'SaaS'], geographies: ['India'], checkSizeMin: 50000, checkSizeMax: 500000, bio: 'Founder of Shaadi.com and People Group. Shark Tank India judge. Active angel in 130+ Indian startups.', twitterHandle: 'AnupamMittal', warmthScore: 75 },
  { name: 'Ruchi Sanghvi', firm: null, role: 'ANGEL', stages: ['SEED', 'SERIES_A'], industries: ['Consumer', 'AI', 'SaaS'], geographies: ['US', 'India'], checkSizeMin: 100000, checkSizeMax: 1000000, bio: 'Facebook\'s first female engineer. Co-founded Cove. Active investor in consumer and AI companies.', twitterHandle: 'ruchi', warmthScore: 63 },
  { name: 'Phanindra Sama', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED'], industries: ['SaaS', 'Fintech', 'Consumer', 'B2B'], geographies: ['India'], checkSizeMin: 25000, checkSizeMax: 250000, bio: 'Co-founder of redBus. Advisor and angel investor across 60+ Indian startups. Deep empathy for 0-to-1 founders.', twitterHandle: 'phani_redbus', warmthScore: 77 },
  // More funds
  { name: 'Arjun Sethi', firm: 'Tribe Capital', role: 'PARTNER', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['SaaS', 'AI', 'Fintech', 'Consumer'], geographies: ['US', 'India'], checkSizeMin: 1000000, checkSizeMax: 10000000, bio: 'Co-founder and Partner at Tribe Capital. Previously at Social Capital. Focused on data-driven investing.', twitterHandle: 'arjunsethi', warmthScore: 66 },
  { name: 'Neeraj Arora', firm: null, role: 'ANGEL', stages: ['SEED', 'SERIES_A'], industries: ['Consumer', 'AI', 'SaaS', 'Marketplace'], geographies: ['US', 'India', 'Global'], checkSizeMin: 250000, checkSizeMax: 2000000, bio: 'Former Chief Business Officer at WhatsApp (led acquisition by Facebook). Active investor in 40+ companies.', twitterHandle: 'neerajarora', warmthScore: 68 },
  { name: 'Vijay Shekhar Sharma', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED'], industries: ['Fintech', 'Consumer', 'AI', 'Climate'], geographies: ['India'], checkSizeMin: 100000, checkSizeMax: 1000000, bio: 'Founder of Paytm / One97 Communications. One of India\'s iconic founders turned active angel.', twitterHandle: 'vijayshekhar', warmthScore: 70 },
  { name: 'Ritesh Agarwal', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED'], industries: ['Consumer', 'Travel', 'SaaS'], geographies: ['India', 'Global'], checkSizeMin: 50000, checkSizeMax: 500000, bio: 'Founder and CEO of OYO. Forbes 30 under 30. Backs young founders building for India and the world.', twitterHandle: 'riteshagar', warmthScore: 71 },
  // Climate focused
  { name: 'Varsha Tagare', firm: 'DCVC', role: 'PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['Climate', 'Deep Tech', 'Energy', 'Agri'], geographies: ['US', 'India'], checkSizeMin: 1000000, checkSizeMax: 8000000, bio: 'Partner at DCVC with focus on deep tech and climate. Ex-Intel Capital. Backs hard science startups.', warmthScore: 65 },
  { name: 'Anirudh Damani', firm: 'Artha Venture Fund', role: 'MANAGING_PARTNER', stages: ['PRE_SEED', 'SEED'], industries: ['Climate', 'AgriTech', 'Consumer', 'Fintech'], geographies: ['India'], checkSizeMin: 100000, checkSizeMax: 1000000, bio: 'Managing Partner at Artha Venture Fund. Focuses on impact-first investments in India.', twitterHandle: 'anirudhdamani', warmthScore: 74 },
  // Southeast Asia
  { name: 'Vinnie Lauria', firm: 'Golden Gate Ventures', role: 'MANAGING_PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['Consumer', 'Fintech', 'SaaS', 'Marketplace'], geographies: ['Southeast Asia', 'India'], checkSizeMin: 500000, checkSizeMax: 3000000, bio: 'Co-founder of Golden Gate Ventures. One of the most active SEA investors. San Francisco and Singapore based.', twitterHandle: 'vinniel', warmthScore: 69 },
  { name: 'Peng T. Ong', firm: 'Monk\'s Hill Ventures', role: 'MANAGING_PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['AI', 'SaaS', 'Consumer', 'Deep Tech'], geographies: ['Southeast Asia', 'India'], checkSizeMin: 500000, checkSizeMax: 5000000, bio: 'Co-founder of Monk\'s Hill Ventures. Serial entrepreneur. Built and sold Match.com and Interwoven.', warmthScore: 66 },
  // B2B/SaaS focused
  { name: 'Tomasz Tunguz', firm: 'Theory Ventures', role: 'GENERAL_PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['SaaS', 'AI', 'Data', 'Infrastructure'], geographies: ['US', 'Europe'], checkSizeMin: 1000000, checkSizeMax: 10000000, bio: 'GP at Theory Ventures. Former Redpoint partner. Prolific SaaS writer at tomtunguz.com. Data-driven investing.', twitterHandle: 'ttunguz', warmthScore: 70 },
  { name: 'Jason Lemkin', firm: 'SaaStr Fund', role: 'GENERAL_PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['SaaS', 'B2B', 'AI'], geographies: ['US', 'Europe', 'India', 'Global'], checkSizeMin: 500000, checkSizeMax: 3000000, bio: 'Founder of SaaStr. Focused exclusively on B2B SaaS. Former CEO of EchoSign (Adobe Sign).', twitterHandle: 'jasonlk', warmthScore: 68 },
  { name: 'Byron Deeter', firm: 'Bessemer Venture Partners', role: 'PARTNER', stages: ['SERIES_A', 'SERIES_B'], industries: ['Cloud', 'SaaS', 'Security', 'AI'], geographies: ['US', 'India', 'Europe'], checkSizeMin: 5000000, checkSizeMax: 30000000, bio: 'Partner at Bessemer. Authored the State of the Cloud report annually. Focused on cloud-native companies.', twitterHandle: 'bdeeter', warmthScore: 60 },
  // AI focused
  { name: 'Ram Iyer', firm: 'Nexus Venture Partners', role: 'PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['AI', 'SaaS', 'Data', 'Infrastructure'], geographies: ['India', 'US'], checkSizeMin: 500000, checkSizeMax: 8000000, bio: 'Partner at Nexus focused on AI and enterprise software. Previously at Cisco Investments.', warmthScore: 71 },
  { name: 'Pankaj Jain', firm: '9Unicorns', role: 'PARTNER', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['Fintech', 'Consumer', 'SaaS', 'AI'], geographies: ['India'], checkSizeMin: 50000, checkSizeMax: 500000, bio: 'Co-founder at 9Unicorns Accelerator. Focuses on first cheque in Indian startups across all sectors.', twitterHandle: 'pankajjain9u', warmthScore: 76 },
  // Female founders focus
  { name: 'Padmaja Ruparel', firm: 'Indian Angel Network', role: 'FOUNDING_PARTNER', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['Consumer', 'Healthcare', 'Edtech', 'SaaS', 'Climate'], geographies: ['India'], checkSizeMin: 50000, checkSizeMax: 500000, bio: 'Co-founder of Indian Angel Network and IAN Fund. Strong focus on women founders and social impact.', warmthScore: 74 },
  { name: 'Shanti Mohan', firm: 'LetsVenture', role: 'FOUNDER', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['SaaS', 'Consumer', 'Fintech', 'Healthcare'], geographies: ['India'], checkSizeMin: 50000, checkSizeMax: 2000000, bio: 'Co-founder and CEO of LetsVenture, India\'s largest startup investment platform. Enables syndicate investing.', twitterHandle: 'shantimohan', warmthScore: 72 },
  // Growth stage
  { name: 'Mary Meeker', firm: 'Bond Capital', role: 'GENERAL_PARTNER', stages: ['SERIES_B', 'SERIES_C_PLUS', 'GROWTH'], industries: ['Consumer', 'AI', 'Fintech', 'SaaS', 'Healthcare'], geographies: ['US', 'Global'], checkSizeMin: 20000000, checkSizeMax: 200000000, bio: 'Legendary internet analyst, former Kleiner Perkins partner. Publishes annual Internet Trends report.', warmthScore: 44 },
  { name: 'Lee Fixel', firm: 'Addition', role: 'FOUNDER', stages: ['SERIES_B', 'SERIES_C_PLUS', 'GROWTH'], industries: ['Consumer', 'Fintech', 'SaaS', 'Marketplace'], geographies: ['US', 'India', 'Global'], checkSizeMin: 10000000, checkSizeMax: 100000000, bio: 'Founder of Addition. Former Tiger Global partner who led investments in Flipkart, Ola, and Spotify.', warmthScore: 50 },
  // Bootstrapped-friendly
  { name: 'Arvid Kahl', firm: null, role: 'ANGEL', stages: ['BOOTSTRAPPED', 'PRE_SEED'], industries: ['SaaS', 'Developer Tools', 'Indie'], geographies: ['Europe', 'US', 'Global'], checkSizeMin: 10000, checkSizeMax: 100000, bio: 'Serial bootstrapper, author of Zero to Sold and The Embedded Entrepreneur. Helps founders build in public.', twitterHandle: 'arvidkahl', warmthScore: 80 },
  { name: 'Pieter Levels', firm: null, role: 'ANGEL', stages: ['IDEA', 'BOOTSTRAPPED'], industries: ['Consumer', 'SaaS', 'Marketplace', 'AI'], geographies: ['Global'], checkSizeMin: 10000, checkSizeMax: 50000, bio: 'Creator of Nomad List, Remote OK, PhotoAI. Prolific builder. Rarely invests but sometimes makes exceptions for exceptional indie founders.', twitterHandle: 'levelsio', warmthScore: 55 },
  // Fintech specialists
  { name: 'Vikram Vaidyanathan', firm: 'Matrix Partners India', role: 'MANAGING_DIRECTOR', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['Fintech', 'SaaS', 'Consumer'], geographies: ['India'], checkSizeMin: 500000, checkSizeMax: 15000000, bio: 'MD at Matrix India. Led investments in Razorpay, Ola, Dailyhunt. Strong fintech and payments focus.', warmthScore: 68 },
  { name: 'Jitendra Gupta', firm: 'Jupiter', role: 'FOUNDER', stages: ['PRE_SEED', 'SEED'], industries: ['Fintech', 'Consumer', 'SaaS'], geographies: ['India'], checkSizeMin: 50000, checkSizeMax: 500000, bio: 'Founder of Jupiter Money. Ex-MD of PayU India. Active angel in fintech and consumer startups.', twitterHandle: 'jitendrag', warmthScore: 74 },
  // Healthcare
  { name: 'Ashish Gupta', firm: 'Helion Venture Partners', role: 'FOUNDING_PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['Healthcare', 'SaaS', 'Consumer', 'AI'], geographies: ['India'], checkSizeMin: 500000, checkSizeMax: 5000000, bio: 'Founding partner at Helion. Co-founded Junglee.com (acquired by Amazon). Focuses on AI and healthcare.', warmthScore: 66 },
  // International / US-based India-friendly
  { name: 'Sriram Krishnan', firm: 'General Catalyst', role: 'GENERAL_PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['AI', 'SaaS', 'Infrastructure', 'Consumer'], geographies: ['US', 'India', 'Global'], checkSizeMin: 1000000, checkSizeMax: 15000000, bio: 'GP at General Catalyst. Ex-Twitter, Microsoft, Yahoo. Former policy advisor at the White House OSTP.', twitterHandle: 'sriramk', warmthScore: 67 },
  { name: 'Aarthi Ramamurthy', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED'], industries: ['Consumer', 'AI', 'Creator Economy', 'Social'], geographies: ['US', 'India'], checkSizeMin: 25000, checkSizeMax: 250000, bio: 'Co-host of The Good Time Show. Ex-Clubhouse, Netflix, Airbnb. Invests in consumer and creator economy.', twitterHandle: 'aarthir', warmthScore: 71 },
  // More active angels
  { name: 'Deepinder Goyal', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED'], industries: ['Consumer', 'Fintech', 'Climate', 'Food Tech'], geographies: ['India'], checkSizeMin: 100000, checkSizeMax: 1000000, bio: 'Founder and CEO of Zomato. Active angel investor in 30+ Indian startups.', twitterHandle: 'deepigoyal', warmthScore: 66 },
  { name: 'Sachin Bansal', firm: 'Navi Technologies', role: 'FOUNDER', stages: ['SEED', 'SERIES_A'], industries: ['Fintech', 'Consumer', 'Insurance', 'SaaS'], geographies: ['India'], checkSizeMin: 500000, checkSizeMax: 5000000, bio: 'Co-founder of Flipkart, founder of Navi Technologies. Actively invests in early-stage Indian startups.', warmthScore: 62 },
  { name: 'Binny Bansal', firm: null, role: 'ANGEL', stages: ['PRE_SEED', 'SEED', 'SERIES_A'], industries: ['Consumer', 'Fintech', 'SaaS', 'Logistics'], geographies: ['India'], checkSizeMin: 500000, checkSizeMax: 5000000, bio: 'Co-founder of Flipkart. One of India\'s most respected startup builders turned angel investor.', warmthScore: 63 },
  // Stage-agnostic global
  { name: 'Chamath Palihapitiya', firm: 'Social Capital', role: 'FOUNDER', stages: ['SEED', 'SERIES_A', 'SERIES_B', 'GROWTH'], industries: ['AI', 'Healthcare', 'Climate', 'SaaS', 'Fintech'], geographies: ['US', 'Global'], checkSizeMin: 1000000, checkSizeMax: 50000000, bio: 'Founder of Social Capital. Former Facebook VP of Growth. Host of All-In Podcast. Backs bold founders.', twitterHandle: 'chamath', warmthScore: 48 },
  { name: 'Keith Rabois', firm: 'Khosla Ventures', role: 'PARTNER', stages: ['SEED', 'SERIES_A'], industries: ['Fintech', 'Real Estate', 'Consumer', 'Healthcare'], geographies: ['US'], checkSizeMin: 1000000, checkSizeMax: 15000000, bio: 'Partner at Khosla Ventures. Former COO of Square, VP at PayPal. One of the PayPal Mafia.', twitterHandle: 'rabois', warmthScore: 56 },
];

// ─── Opportunities ────────────────────────────────────────────────────────────

const OPPORTUNITIES = [
  { title: 'Antler India Residency — Cohort 12', description: 'Six-week residency in Bengaluru for exceptional founders. Antler invests $100K–200K in teams it forms. No idea required. Equity: 10%.', type: 'ACCELERATOR', stages: ['IDEA', 'PRE_SEED'], industries: ['SaaS', 'AI', 'Fintech', 'Climate'], geographies: ['India'], provider: 'Antler', url: 'https://antler.co/location/india', value: '$100K–200K investment + network', isPremium: false },
  { title: 'Y Combinator S25 Applications Open', description: 'Apply to the most successful startup accelerator in the world. YC invests $500K for 7% equity. Fully in-person in San Francisco.', type: 'ACCELERATOR', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['SaaS', 'AI', 'Fintech', 'Consumer', 'Healthcare', 'Climate'], geographies: ['US', 'Global'], provider: 'Y Combinator', url: 'https://ycombinator.com/apply', value: '$500K for 7%', isPremium: false },
  { title: 'NASSCOM DeepTech Club — Grant Programme', description: 'Grants of ₹25L–75L for deep tech startups working in AI, robotics, semiconductor, and advanced manufacturing. Open to Indian startups.', type: 'GRANT', stages: ['PRE_SEED', 'SEED'], industries: ['Deep Tech', 'AI', 'Robotics', 'Semiconductor'], geographies: ['India'], provider: 'NASSCOM', value: '₹25L–75L grant, equity-free', isPremium: false },
  { title: 'Google for Startups India — Accelerator', description: 'Equity-free programme for AI-first Indian startups. Includes cloud credits, mentorship from Google engineers, and investor access.', type: 'ACCELERATOR', stages: ['SEED', 'SERIES_A'], industries: ['AI', 'SaaS', 'Climate', 'Healthcare'], geographies: ['India'], provider: 'Google for Startups', url: 'https://startup.google.com/programs/accelerator/india/', value: '$200K cloud credits + equity-free', isPremium: false },
  { title: 'Climate Launchpad India — Grant Track', description: 'Up to €50K in grants for climate-tech startups with a validated solution. International exposure through the global final in Amsterdam.', type: 'GRANT', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['Climate', 'Energy', 'AgriTech', 'Circular Economy'], geographies: ['India'], provider: 'EIT Climate-KIC', value: 'Up to €50K grant', isPremium: true },
  { title: 'Founders on Deck Podcast — Guest Applications', description: 'Appear on one of the most-listened founder podcasts in India. 50K+ monthly listeners. Applications reviewed monthly.', type: 'PODCAST_SLOT', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['SaaS', 'Fintech', 'Consumer', 'AI'], geographies: ['India', 'Global'], provider: 'Founders on Deck', value: 'Audience of 50K+ founders', isPremium: true },
  { title: 'TiE Global Summit — Speaking Opportunity', description: 'Apply to speak at TiE Global Summit 2026. 3,000+ attendees, 50+ countries. Deadline: 45 days from today.', type: 'SPEAKING', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['SaaS', 'Fintech', 'Healthcare', 'Climate'], geographies: ['India', 'US', 'Global'], provider: 'TiE Global', value: 'Global stage + media coverage', isPremium: true },
  { title: 'AWS Activate — Startup Credits', description: '$5,000–25,000 in AWS credits for early-stage startups. Apply with your startup email and stage. Approved within 5 business days.', type: 'PARTNERSHIP', stages: ['IDEA', 'PRE_SEED', 'SEED', 'SERIES_A'], industries: ['SaaS', 'AI', 'Fintech', 'Consumer', 'Healthcare', 'Climate'], geographies: ['India', 'US', 'Global'], provider: 'Amazon Web Services', url: 'https://aws.amazon.com/activate/', value: 'Up to $25K cloud credits', isPremium: false },
  { title: 'Sequoia Spark — Female Founders Programme', description: 'Sequoia\'s programme for women founders building scalable technology companies. Includes mentorship, capital access, and community.', type: 'FELLOWSHIP', stages: ['PRE_SEED', 'SEED', 'SERIES_A'], industries: ['SaaS', 'Fintech', 'Consumer', 'Healthcare', 'AI'], geographies: ['India', 'Southeast Asia'], provider: 'Peak XV Partners', url: 'https://peakxv.com/spark/', value: 'Network + funding access', isPremium: false },
  { title: 'MeitY Startup Hub — TIDE 2.0 Grant', description: 'Government of India scheme providing up to ₹75L in equity-free grants to early-stage EdTech and HealthTech startups.', type: 'GRANT', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['Edtech', 'Healthcare', 'GovTech'], geographies: ['India'], provider: 'MeitY / TIDE 2.0', value: 'Up to ₹75L equity-free', isPremium: false },
  { title: 'The Hustle India — Founder Story Feature', description: 'The Hustle India features 3 founders monthly in their newsletter (200K subscribers). Apply with your story and traction data.', type: 'PRESS', stages: ['SEED', 'SERIES_A'], industries: ['SaaS', 'Fintech', 'Consumer', 'Climate'], geographies: ['India'], provider: 'The Hustle India', value: 'Feature in 200K subscriber newsletter', isPremium: true },
  { title: 'Microsoft for Startups — Founders Hub', description: 'Up to $150,000 in Azure credits, GitHub, LinkedIn Premium, and Microsoft 365. Open to any tech startup at any stage.', type: 'PARTNERSHIP', stages: ['IDEA', 'PRE_SEED', 'SEED', 'SERIES_A'], industries: ['SaaS', 'AI', 'Developer Tools', 'Cloud'], geographies: ['India', 'US', 'Global'], provider: 'Microsoft for Startups', url: 'https://www.microsoft.com/en-us/startups', value: 'Up to $150K Azure credits', isPremium: false },
  { title: 'SaaSBOOMi Annual — Speaker Track', description: 'India\'s premier SaaS conference in Chennai. 2,000+ attendees including every major SaaS fund. Apply to speak on growth, product, or GTM.', type: 'SPEAKING', stages: ['SEED', 'SERIES_A', 'SERIES_B'], industries: ['SaaS', 'B2B', 'AI'], geographies: ['India'], provider: 'SaaSBOOMi', value: 'Stage at India\'s top SaaS event', isPremium: true },
  { title: 'Surge by Peak XV — Cohort 9', description: 'Rapid scale programme from Sequoia Southeast Asia. $1–2M for 7–10% equity. 16-week programme across Singapore, Bengaluru, and San Francisco.', type: 'ACCELERATOR', stages: ['PRE_SEED', 'SEED'], industries: ['SaaS', 'Consumer', 'Fintech', 'AI', 'Climate'], geographies: ['India', 'Southeast Asia'], provider: 'Peak XV Partners', value: '$1–2M for 7–10%', isPremium: false },
  { title: 'Entrepreneur First India — Cohort 5', description: 'Pre-team, pre-idea programme. EF backs exceptional individuals and helps them find co-founders and ideas. ₹20L for 10%.', type: 'ACCELERATOR', stages: ['IDEA'], industries: ['AI', 'Deep Tech', 'SaaS', 'Climate'], geographies: ['India'], provider: 'Entrepreneur First', value: '₹20L for 10%', isPremium: false },
  { title: 'Startup India Seed Fund — Round 2', description: 'Government seed fund providing ₹20–50L equity-free grants to validated early-stage startups registered under Startup India.', type: 'GRANT', stages: ['IDEA', 'PRE_SEED'], industries: ['SaaS', 'AI', 'Fintech', 'Healthcare', 'Climate', 'AgriTech', 'Edtech'], geographies: ['India'], provider: 'DPIIT / Startup India', value: '₹20–50L equity-free', isPremium: false },
  { title: 'All-In Summit — Startup Pitch Competition', description: 'Pitch to the All-In Podcast hosts and their network of 500+ investors. Top 5 pitches get a spot at the invite-only Summit.', type: 'COMPETITION', stages: ['SEED', 'SERIES_A'], industries: ['AI', 'Fintech', 'Healthcare', 'Climate', 'SaaS'], geographies: ['US', 'Global'], provider: 'All-In Podcast', value: 'Investor access + media coverage', isPremium: true },
  { title: 'Indian Angel Network — Fast Track Applications', description: 'IAN\'s fast-track syndicate reviews startups weekly. Average ticket: ₹50L–2Cr. Decision in 3 weeks.', type: 'ACCELERATOR', stages: ['PRE_SEED', 'SEED'], industries: ['SaaS', 'Consumer', 'Fintech', 'Healthcare', 'Climate'], geographies: ['India'], provider: 'Indian Angel Network', url: 'https://indianangelnetwork.com', value: '₹50L–2Cr investment', isPremium: false },
  { title: 'Notion — Startup Plan (Free)', description: 'Free Notion Plus plan for startups for 6 months. Includes unlimited blocks, API access, and team collaboration.', type: 'PARTNERSHIP', stages: ['IDEA', 'PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B'], industries: ['SaaS', 'AI', 'Fintech', 'Consumer', 'Healthcare', 'Climate'], geographies: ['India', 'US', 'Global'], provider: 'Notion', url: 'https://notion.so/startups', value: '6 months free + $1,000 credits', isPremium: false },
  { title: 'Stripe Atlas — Startup Incorporation', description: 'Incorporate in the US as a C-Corp from anywhere in the world. Includes banking, tax ID, and first year of Stripe access.', type: 'PARTNERSHIP', stages: ['IDEA', 'PRE_SEED', 'SEED'], industries: ['SaaS', 'AI', 'Fintech', 'Consumer'], geographies: ['India', 'Southeast Asia', 'Global'], provider: 'Stripe', url: 'https://stripe.com/atlas', value: '$500 flat fee, then free', isPremium: false },
];

// ─── Community Rooms ───────────────────────────────────────────────────────────

const ROOMS = [
  { name: 'Fundraising · Pre-seed', description: 'Navigating your first raise: deck reviews, investor feedback, and warm intro threads.', color: '#FF8A00', memberCount: 148, onlineNow: 12, latestTopic: 'Antler India week-2 questions' },
  { name: 'Indian SaaS Founders', description: 'Building SaaS for India and the world — GTM, pricing, PLG, and enterprise sales.', color: '#D4AF37', memberCount: 312, onlineNow: 28, latestTopic: 'Pricing pages that convert in 2026' },
  { name: 'Bay Area Founders', description: 'Silicon Valley ecosystem, visa threads, YC prep, and SF founder dinners.', color: '#6F86A6', memberCount: 196, onlineNow: 14, latestTopic: 'First-3-hire mistakes thread' },
  { name: 'Solo Founders', description: 'Building without a co-founder — systems, tools, hiring, and staying sane.', color: '#3F3F47', memberCount: 244, onlineNow: 22, latestTopic: 'Co-founder dating without the cringe' },
  { name: 'AI / ML Builders', description: 'Building on top of AI — LLM apps, infra, tooling, and the business of AI.', color: '#FF8A00', memberCount: 421, onlineNow: 41, latestTopic: 'Open-source vs proprietary moats' },
  { name: 'Climate Founders', description: 'Climate tech, impact investing, grants, and building for a sustainable future.', color: '#5D7A55', memberCount: 88, onlineNow: 6, latestTopic: 'Grant runway between rounds' },
  { name: 'Female Founders', description: 'Community for women building high-growth startups. Safe, direct, no-BS.', color: '#C46A82', memberCount: 178, onlineNow: 19, latestTopic: 'Negotiating term sheets' },
  { name: 'Bootstrapped', description: 'Building without VC — profitability, growth, and the indie founder mindset.', color: '#D4AF37', memberCount: 132, onlineNow: 11, latestTopic: 'When to take the first cheque' },
];

// ─── Main seed function ───────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting seed...');

  // Seed firms
  console.log('📦 Seeding investor firms...');
  const firmMap: Record<string, string> = {};
  for (const firm of FIRMS) {
    const created = await prisma.investorFirm.upsert({
      where: { name: firm.name },
      create: firm as Parameters<typeof prisma.investorFirm.create>[0]['data'],
      update: firm as Parameters<typeof prisma.investorFirm.update>[0]['data'],
    });
    firmMap[firm.name] = created.id;
  }
  console.log(`  ✓ ${FIRMS.length} firms`);

  // Seed investors
  console.log('👥 Seeding investors...');
  for (const inv of INVESTORS) {
    const { firm: firmName, ...rest } = inv;
    const firmId = firmName ? firmMap[firmName] : undefined;
    await prisma.investor.create({
      data: {
        ...rest,
        role: rest.role as Parameters<typeof prisma.investor.create>[0]['data']['role'],
        stages: rest.stages as Parameters<typeof prisma.investor.create>[0]['data']['stages'],
        firmId: firmId ?? null,
      },
    });
  }
  console.log(`  ✓ ${INVESTORS.length} investors`);

  // Seed opportunities
  console.log('🎯 Seeding opportunities...');
  for (const opp of OPPORTUNITIES) {
    await prisma.opportunity.create({
      data: {
        ...opp,
        type: opp.type as Parameters<typeof prisma.opportunity.create>[0]['data']['type'],
        stages: opp.stages as Parameters<typeof prisma.opportunity.create>[0]['data']['stages'],
      },
    });
  }
  console.log(`  ✓ ${OPPORTUNITIES.length} opportunities`);

  // Seed community rooms
  console.log('🏠 Seeding community rooms...');
  for (const room of ROOMS) {
    await prisma.communityRoom.create({ data: room });
  }
  console.log(`  ✓ ${ROOMS.length} rooms`);

  console.log('\n✅ Seed complete!');
  console.log(`   ${FIRMS.length} firms · ${INVESTORS.length} investors · ${OPPORTUNITIES.length} opportunities · ${ROOMS.length} rooms`);
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
