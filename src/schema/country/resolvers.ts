import { Resolvers } from '../../types/graphql';
import { UserInputError } from 'apollo-server-errors';
import {
  prismaWhere,
  prismaPage,
  createConnectionObject,
  getCacheKeys,
} from '../../utils';
import { SubregionEnumToString } from './util';

const resolvers: Resolvers = {
  Query: {
    country: async (_, args, ctx) => {
      const where = await prismaWhere.unique(args);

      if (!where) {
        throw new UserInputError(
          'You must provide id, iso2, iso3 or numeric_code'
        );
      }

      return ctx.db.country.findUnique({ where });
    },

    countries: async (_, { filter, page }, ctx, info) => {
      const where = prismaWhere.many({
        subregion: filter?.subregion
          ? SubregionEnumToString[filter.subregion]
          : undefined,
        region: filter?.region,
      });

      const pagination = prismaPage(page);

      const countries = await ctx.db.country.findMany({
        where,
        ...pagination,
        orderBy: { id: 'asc' },
      });

      if (where && countries.length !== 0) {
        let cacheField: string;
        let cacheKeys: { minKey: string; maxKey: string };
        if (filter?.subregion) {
          cacheKeys = getCacheKeys('Subregion', 'countries');
          cacheField = countries[0].subregion;
        } else {
          cacheKeys = getCacheKeys('Region', 'countries');
          cacheField = countries[0].region;
        }
        return createConnectionObject({
          data: countries,
          ctx,
          info,
          cacheKeys,
          cacheField,
        });
      }

      const cacheKeys = getCacheKeys('Country');
      return createConnectionObject({ data: countries, ctx, info, cacheKeys });
    },
  },

  Country: {
    timezones: async (parent, _, ctx) => {
      return ctx.db.country
        .findUnique({ where: { id: parent.id } })
        .timezones();
    },

    states: async (parent, { page }, ctx, info) => {
      const pagination = prismaPage(page);

      const states = await ctx.db.country
        .findUnique({ where: { id: parent.id } })
        .states({ ...pagination, orderBy: { id: 'asc' } });

      const cacheKeys = getCacheKeys('Country', 'states');

      return createConnectionObject({
        data: states,
        ctx,
        info,
        cacheKeys,

        cacheField: parent.id,
      });
    },

    cities: async (parent, { filter, page }, ctx, info) => {
      const citiesWhere = prismaWhere.unique({
        state_id: filter?.sid,
        state_code: filter?.siso,
      });

      const pagination = prismaPage(page);

      const cities = await ctx.db.country
        .findUnique({ where: { id: parent.id } })
        .cities({ where: citiesWhere, ...pagination });

      if (citiesWhere && cities.length !== 0) {
        const cacheKeys = getCacheKeys('State', 'cities');

        return createConnectionObject({
          data: cities,
          ctx,
          info,
          cacheKeys,
          cacheField: cities[0].state_id,
        });
      }
      const cacheKeys = getCacheKeys('Country', 'cities');

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
