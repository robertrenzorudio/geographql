require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from './schema';
import prisma from './prisma';
import redis from './redis';
import { MyContext } from './types/context';
import schedule from 'node-schedule';
import { cacheDbExtrema } from './utils';
import { authRouter } from './routes/auth';
import passport from 'passport';

const main = async () => {
  const app = express();

  app.use(passport.initialize());

  app.use('/auth', authRouter);

  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }): MyContext => ({
      req,
      res,
      db: prisma,
      cache: redis,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  if (process.env.NODE_ENV === 'production') {
    await cacheDbExtrema();
  }
  // Refresh cache every midnight.
  schedule.scheduleJob('0 0 * * *', async () => {
    console.log("Caching Max and Min id's");
    await cacheDbExtrema();
  });

  const port = parseInt(process.env.PORT as string) || 4000;

  app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}/graphql`);
  });
};

main().catch((err) => console.log(err.message));
