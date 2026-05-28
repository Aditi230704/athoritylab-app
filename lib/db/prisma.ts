/**
 * Prisma 7 client singleton.
 *
 * Prisma 7 dropped the legacy direct-URL constructor in favour of explicit
 * driver adapters. We use @prisma/adapter-pg (the official pg adapter) so
 * that PrismaClient satisfies its required `adapter` option.
 *
 * DATABASE_URL must be a standard postgresql:// connection string.
 * Set it in .env.local (development) or Vercel environment variables (prod).
 */

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';

function createPrismaClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
