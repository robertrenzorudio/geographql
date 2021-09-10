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
          'You must provide iso2 or iso3 or numeric_code'
        );
      }
    },

    countries: async (_, { page = 0, size = 100 }, ctx) => {
      return ctx.db.country.findMany({ take: size!, skip: page! * size! });
    },
  },

  Country: {
    timezones: async (parent, _, ctx) => {
      return ctx.db.country
        .findUnique({ where: { id: parent.id } })
        .timezones();
    },

    states: async (parent, { page = 0, size = 100 }, ctx) => {
      return await ctx.db.country
        .findUnique({ where: { id: parent.id } })
        .states({ take: size!, skip: page! * size! });
    },
  },
};

export default resolvers;
