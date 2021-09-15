import { UserInputError } from 'apollo-server-errors';
import { Resolvers } from 'src/types/graphql';
import {
  prismaPage,
  prismaWhere,
  getCacheKey,
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

      const states = await ctx.db.state.findMany({
        where,
        ...pagination,
        orderBy: { id: 'asc' },
      });

      if (where && states.length !== 0) {
        const cacheKeys = getCacheKey('Country', 'states');
        return createConnectionObject({
          data: states,
          ctx,
          cacheKeys,
          parentId: states[0].country_id,
        });
      }

      const cacheKeys = getCacheKey('State');
      return createConnectionObject({ data: states, ctx, cacheKeys });
    },
  },

  State: {
    cities: async (parent, { page }, ctx) => {
      const pagination = prismaPage(page);

      const cities = await ctx.db.state
        .findUnique({ where: { id: parent.id } })
        .cities({ ...pagination, orderBy: { id: 'asc' } });

      const cacheKeys = getCacheKey('State', 'cities');
      return createConnectionObject({
        data: cities,
        ctx,
        cacheKeys,
        parentId: parent.id,
      });
    },
  },
};

export default resolvers;
