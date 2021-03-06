import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from 'src/types/graphql';
import {
  prismaPage,
  prismaWhere,
  getCacheKeys,
  createConnectionObject,
} from '../../utils';

const resolvers: Resolvers = {
  Query: {
    state: async (_, { id, locationCode }, ctx) => {
      const where = prismaWhere.unique({
        id,
        state_code_country_code: locationCode,
      });

      if (where) {
        ctx.req.queryCost = ctx.req.queryCost + 1 || 1;
        return ctx.db.state.findUnique({ where });
      } else {
        throw new UserInputError('You must provide id or locationCode');
      }
    },

    states: async (_, { filter, page }, ctx, info) => {
      const where = prismaWhere.many({
        country_id: filter?.cid,
        country_code: filter?.ciso2,
      });

      const pagination = prismaPage(page);

      const states = await ctx.db.state.findMany({
        where,
        ...pagination,
        orderBy: { id: 'asc' },
      });

      ctx.req.queryCost = ctx.req.queryCost + states.length || states.length;
      if (where && states.length !== 0) {
        const cacheKeys = getCacheKeys('Country', 'states');
        return createConnectionObject({
          data: states,
          ctx,
          info,
          cacheKeys,
          cacheField: states[0].country_id,
        });
      }

      const cacheKeys = getCacheKeys('State');
      return createConnectionObject({ data: states, ctx, info, cacheKeys });
    },
  },

  State: {
    cities: async (parent, { page }, ctx, info) => {
      const pagination = prismaPage(page);

      const cities = await ctx.db.state
        .findUnique({ where: { id: parent.id } })
        .cities({ ...pagination, orderBy: { id: 'asc' } });

      ctx.req.queryCost = ctx.req.queryCost + cities.length || cities.length;

      const cacheKeys = getCacheKeys('State', 'cities');
      return createConnectionObject({
        data: cities,
        ctx,
        info,
        cacheKeys,
        cacheField: parent.id,
      });
    },
  },
};

export default resolvers;
