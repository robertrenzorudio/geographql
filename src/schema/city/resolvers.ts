import { Resolvers } from 'src/types/graphql';
import {
  prismaWhere,
  prismaPage,
  getCacheKey,
  createConnectionObject,
} from '../../utils';

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
          cacheKeys = getCacheKey('State', 'cities');
        } else {
          cacheField = cities[0].country_id;
          cacheKeys = getCacheKey('Country', 'cities');
        }
        return createConnectionObject({
          data: cities,
          ctx,
          cacheKeys,
          cacheField,
        });
      }

      const cacheKeys = getCacheKey('City');
      return createConnectionObject({ data: cities, ctx, cacheKeys });
    },
  },
};

export default resolvers;
