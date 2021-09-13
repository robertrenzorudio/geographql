import { Request, Response } from 'express';
import type { PrismaClient } from '@prisma/client';
import type { Redis } from 'ioredis';

export type MyContext = {
  req: Request;
  res: Response;
  db: PrismaClient;
  cache: Redis;
};
