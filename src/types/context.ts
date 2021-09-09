import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export type MyContext = {
  req: Request;
  res: Response;
  db: PrismaClient;
};
