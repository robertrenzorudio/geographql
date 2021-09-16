require('dotenv').config();
import { MyContext } from '../types/context';
import { createEdges } from './createEdges';

const _hasNextPage = async (
  dataMaxId: number,
  ctx: MyContext,
  maxKey: string,
  cacheField?: number | string
) => {
  let maxId: string | null;

  if (cacheField) {
    maxId = await ctx.cache.hget(maxKey, cacheField.toString());
  } else {
    maxId = await ctx.cache.get(maxKey);
  }

  return dataMaxId < +maxId!;
};

const _hasPreviousPage = async (
  dataMinId: number,
  ctx: MyContext,
  minKey: string,
  cacheField?: number | string
): Promise<boolean> => {
  let minId: string | null;

  if (cacheField) {
    minId = await ctx.cache.hget(minKey, cacheField.toString());
  } else {
    minId = await ctx.cache.get(minKey);
  }
  return dataMinId > +minId!;
};

const createConnectionObject = async <T extends BaseDataType>(
  input: CreateConnectionObjectInput<T>
): Promise<any> => {
  const { data, ctx, cacheKeys, cacheField } = input;
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

  const hasNextPage = await _hasNextPage(
    dataMaxId,
    ctx,
    cacheKeys.maxKey,
    cacheField
  );
  const hasPreviousPage = await _hasPreviousPage(
    dataMinId,
    ctx,
    cacheKeys.minKey,
    cacheField
  );

  const edges = createEdges(data);

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

interface BaseDataType {
  id: number;
}

interface CreateConnectionObjectInput<T> {
  data: T[];
  ctx: MyContext;
  cacheKeys: { minKey: string; maxKey: string };
  cacheField?: number | string;
}

export default createConnectionObject;
