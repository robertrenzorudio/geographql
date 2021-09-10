import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from 'src/types/graphql';
import { prismaWhere } from '../../utils';

const resolvers: Resolvers = {
  Query: {
    state: async (_, { id, locationCode }, ctx) => {
      const where = prismaWhere.unique({
        id,
        state_code_country_code: locationCode,
      });

      if (where) {
        return ctx.db.state.findUnique({ where });
      } else {
        throw new UserInputError('You must provide id or locationCode');
      }
    },

    states: async (_, { page = 0, size = 100 }, ctx) => {
      return ctx.db.state.findMany({ take: size!, skip: page! * size! });
    },
  },
};

export default resolvers;
