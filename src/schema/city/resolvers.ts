import { Resolvers } from 'src/types/graphql';
import { prismaWhere, prismaPage } from '../../utils';

const resolvers: Resolvers = {
  Query: {
    city: async (_, { id }, ctx) => {
      return ctx.db.city.findUnique({ where: { id } });
    },

    cities: async (_, { filter, page }, ctx) => {
      const where = prismaWhere.many(
        {
          country_code: filter?.ciso2,
          state_id: filter?.sid,
          state_code: filter?.sid ? undefined : filter?.siso,
        },
        'AND'
      );

      const pagination = prismaPage(page);

      return ctx.db.city.findMany({
        where,
        ...pagination,
      });
    },
  },
};

export default resolvers;
