import { Resolvers } from '../../types/graphql';
import { UserInputError } from 'apollo-server-errors';
import { prismaWhere } from '../../utils';

const resolvers: Resolvers = {
  Query: {
    country: async (_, args, ctx) => {
      const where = prismaWhere.unique(args);
      if (where) {
        return ctx.db.country.findUnique({ where });
      } else {
        throw new UserInputError(
          'You must provide id, iso2, iso3 or numeric_code'
        );
      }
    },

    countries: async (_, { filter, page }, ctx) => {
      const where = prismaWhere.many({
        subregion: filter?.subregion,
        region: filter?.region,
      });
      const pagination = {
        take: page ? page.size : 100,
        skip: page ? page.page * page.size : 0,
      };

      return ctx.db.country.findMany({ where, ...pagination });
    },
  },

  Country: {
    timezones: async (parent, _, ctx) => {
      return ctx.db.country
        .findUnique({ where: { id: parent.id } })
        .timezones();
    },

    states: async (parent, { page }, ctx) => {
      const pagination = {
        take: page ? page.size : 100,
        skip: page ? page.page * page.size : 0,
      };
      return await ctx.db.country
        .findUnique({ where: { id: parent.id } })
        .states(pagination);
    },

    cities: async (parent, { filter, page }, ctx) => {
      const citiesWhere = prismaWhere.unique({
        state_id: filter?.sid,
        state_code: filter?.siso,
      });

      const pagination = {
        take: page ? page.size : 100,
        skip: page ? page.page * page.size : 0,
      };

      return await ctx.db.country
        .findUnique({ where: { id: parent.id } })
        .cities({ where: citiesWhere, ...pagination });
    },
  },
};

export default resolvers;
