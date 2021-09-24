import { Request, Response } from 'express';
import type { PrismaClient } from '@prisma/client';
import type { Redis } from 'ioredis';

export type MyRequest = Request & { queryCost: number };

export type MyContext = {
  req: MyRequest;
  res: Response;
  db: PrismaClient;
  cache: Redis;
};
