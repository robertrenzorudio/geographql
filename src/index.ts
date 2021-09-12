require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from './schema';
import prisma from './db';

const main = async () => {
  const app = express();

  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
      db: prisma,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const port = parseInt(process.env.PORT as string) || 4000;

  app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}/graphql`);
  });
};

main().catch((err) => console.log(err.message));
