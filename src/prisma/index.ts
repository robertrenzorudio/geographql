import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : undefined,
});

export default db;
