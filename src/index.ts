require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from './schema';
import db from './db';
import cache from './cache';
import { cacheDbExtrema } from './utils';

const main = async () => {
  const app = express();

  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
      db,
      cache,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await cacheDbExtrema();
  const port = parseInt(process.env.PORT as string) || 4000;

  app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}/graphql`);
  });
};

main().catch((err) => console.log(err.message));
