import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

export const buildSchema = async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return schema;
};
