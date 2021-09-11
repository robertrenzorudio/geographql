import { Resolvers } from 'src/types/graphql';
import { prismaWhere } from '../../utils';

const resolvers: Resolvers = {
  Query: {
    city: async (_, { id }, ctx) => {
      return ctx.db.city.findUnique({ where: { id } });
    },

    cities: async (_, { filter, page }, ctx) => {
      const where = prismaWhere.many(
        { country_code: filter?.ciso2, state_code: filter?.siso },
        'AND'
      );

      const pagination = {
        take: page ? page.size : 100,
        skip: page ? page.page * page.size : 0,
      };

      return ctx.db.city.findMany({
        where,
        ...pagination,
      });
    },
  },
};

export default resolvers;
