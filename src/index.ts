require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { authRouter } from './routes/auth';
import { buildSchema } from './schema';
import { cacheDbExtrema } from './utils';
import { CalculateQueryComplexity } from './apolloPlugins/CalculateQueryComplexity';
import connectRedis from 'connect-redis';
import express from 'express';
import passport from 'passport';
import prisma from './prisma';
import redis from './redis';
import schedule from 'node-schedule';
import session from 'express-session';

declare module 'express-session' {
  interface Session {
    userId: string;
  }
}

const main = async () => {
  const app = express();
  const RedisStore = connectRedis(session);

  app.set('trust proxy', 1);
  app.use(
    session({
      name: process.env.SESSION_NAME!,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET!,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        domain:
          process.env.NODE_ENV === 'production'
            ? process.env.SESSION_DOMAIN!
            : undefined,
      },
      saveUninitialized: false,
      resave: false,
    })
  );
  app.use(passport.initialize());

  app.use('/auth', authRouter);

  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
      db: prisma,
      cache: redis,
    }),
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      CalculateQueryComplexity(schema, 1000),
    ],
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
