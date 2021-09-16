require('dotenv').config();
import { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';
import { PageInfo } from '../types/graphql';
import { MyContext } from '../types/context';
import { createEdges } from './createEdges';
import { toCursorHash } from '.';

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

const _pageInfo = async <T extends BaseDataType>(
  input: CreateConnectionObjectInput<T>,
  pageInfo: any
): Promise<PageInfo> => {
  const { data, ctx, cacheKeys, cacheField } = input;
  const dataMaxId = data.slice(-1)[0].id;
  const dataMinId = data[0].id;

  const hasNextPage =
    'hasNextPage' in pageInfo
      ? await _hasNextPage(dataMaxId, ctx, cacheKeys.maxKey, cacheField)
      : undefined;

  const hasPreviousPage =
    'hasPreviousPage' in pageInfo
      ? await _hasPreviousPage(dataMinId, ctx, cacheKeys.minKey, cacheField)
      : undefined;

  const endCursor = toCursorHash(dataMaxId);
  const startCursor = toCursorHash(dataMinId);

  return {
    hasNextPage,
    endCursor,
    hasPreviousPage,
    startCursor,
  } as PageInfo;
};

const createConnectionObject = async <T extends BaseDataType>(
  input: CreateConnectionObjectInput<T>
): Promise<any> => {
  const { data, info } = input;
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

  const queryFields = graphqlFields(info);

  const edges = createEdges(data);

  const pageInfo =
    'pageInfo' in queryFields
      ? await _pageInfo(input, queryFields.pageInfo)
      : undefined;

  const connectionData = {
    totalCount: data.length,
    edges,
    pageInfo,
  };
  return connectionData;
};

interface BaseDataType {
  id: number;
}

interface CreateConnectionObjectInput<T> {
  data: T[];
  ctx: MyContext;
  info: GraphQLResolveInfo;
  cacheKeys: { minKey: string; maxKey: string };
  cacheField?: number | string;
}

export default createConnectionObject;
