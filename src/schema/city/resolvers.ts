import { Resolvers } from 'src/types/graphql';
import {
  prismaWhere,
  prismaPage,
  getCacheKeys,
  createConnectionObject,
} from '../../utils';

const resolvers: Resolvers = {
  Query: {
    city: async (_, { id }, ctx) => {
      return ctx.db.city.findUnique({ where: { id } });
    },

    cities: async (_, { filter, page }, ctx, info) => {
      const where = prismaWhere.many(
        {
          country_code: filter?.ciso2,
          state_id: filter?.sid,
          state_code: filter?.sid ? undefined : filter?.siso,
        },
        'AND'
      );

      const pagination = prismaPage(page);

      const cities = await ctx.db.city.findMany({
        where,
        ...pagination,
        orderBy: { id: 'asc' },
      });

      if (filter && cities.length !== 0) {
        let cacheField: number;
        let cacheKeys: { minKey: string; maxKey: string };
        if (filter.sid || filter.siso) {
          cacheField = cities[0].state_id;
          cacheKeys = getCacheKeys('State', 'cities');
        } else {
          cacheField = cities[0].country_id;
          cacheKeys = getCacheKeys('Country', 'cities');
        }
        return createConnectionObject({
          data: cities,
          ctx,
          info,
          cacheKeys,
          cacheField,
        });
      }

      const cacheKeys = getCacheKeys('City');
      return createConnectionObject({ data: cities, ctx, info, cacheKeys });
    },
  },
};

export default resolvers;
