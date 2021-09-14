require('dotenv').config();
import { MyContext } from 'src/types/context';
import { Schema } from '../types/schema';
import { createEdges } from './createEdges';

const _setGetExtremaId = async (
  entity: Schema,
  ctx: MyContext
): Promise<{ max: number; min: number }> => {
  let data: [{ max: number; min: number }];
  switch (entity) {
    case Schema.City:
      data = await ctx.db.$queryRaw<
        [{ max: number; min: number }]
      >`SELECT MAX(id), MIN(id) FROM "City"`;
      break;

    case Schema.Country:
      data = await ctx.db.$queryRaw<
        [{ max: number; min: number }]
      >`SELECT MAX(id), MIN(id) FROM "Country"`;
      break;

    case Schema.State:
      data = await ctx.db.$queryRaw<
        [{ max: number; min: number }]
      >`SELECT MAX(id), MIN(id) FROM "State"`;
      break;
  }

  const [{ max, min }] = data;
  const exp = +process.env.MAX_MIN_ID_EXP! || 3600;
  ctx.cache.setex(`MAX_ID:${entity}`, exp, max);
  ctx.cache.setex(`MIN_ID:${entity}`, exp, min);
  return { max, min };
};

const _hasNextPage = async (
  dataMaxId: number,
  entity: Schema,
  ctx: MyContext
) => {
  const maxId = await ctx.cache.get(`MAX_ID:${entity}`);

  if (maxId) {
    return dataMaxId < +maxId;
  }
  const { max } = await _setGetExtremaId(entity, ctx);
  return dataMaxId < max;
};

const _hasPreviousPage = async (
  dataMinId: number,
  entity: Schema,
  ctx: MyContext
): Promise<boolean> => {
  const minId = await ctx.cache.get(`MIN_ID:${entity}`);

  if (minId) {
    return dataMinId > +minId;
  }

  const { min } = await _setGetExtremaId(entity, ctx);
  return dataMinId > min;
};

type baseDataType = {
  id: number;
};

const connectionObject = async <DataElementType extends baseDataType>(
  data: DataElementType[],
  entity: Schema,
  ctx: MyContext
): Promise<any> => {
  if (data.length === 0) {
    return {
      totalCount: data.length,
      edges: [],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
        hasPreviousPage: false,
        startCursor: null,
      },
    };
  }

  const dataMaxId = data.slice(-1)[0].id;
  const dataMinId = data[0].id;

  const hasNextPage = await _hasNextPage(dataMaxId, entity, ctx);
  const hasPreviousPage = await _hasPreviousPage(dataMinId, entity, ctx);

  const edges = createEdges<DataElementType>(data);

  const endCursor = edges.slice(-1)[0].cursor;
  const startCursor = edges[0].cursor;

  const connectionData = {
    totalCount: data.length,
    edges,
    pageInfo: {
      hasNextPage,
      endCursor,
      hasPreviousPage,
      startCursor,
    },
  };
  return connectionData;
};

export default connectionObject;
