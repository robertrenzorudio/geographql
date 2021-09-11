import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from 'src/types/graphql';
import { prismaPage, prismaWhere } from '../../utils';

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

    states: async (_, { filter, page }, ctx) => {
      const where = prismaWhere.many({
        country_id: filter?.cid,
        country_code: filter?.ciso2,
      });

      const pagination = prismaPage(page);

      return ctx.db.state.findMany({ where, ...pagination });
    },
  },

  State: {
    cities: async (parent, { page }, ctx) => {
      const pagination = prismaPage(page);

      return ctx.db.state
        .findUnique({ where: { id: parent.id } })
        .cities(pagination);
    },
  },
};

export default resolvers;
