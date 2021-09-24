import {
  AuthenticationError,
  PluginDefinition,
  ApolloError,
} from 'apollo-server-core';
import { GraphQLSchema, separateOperations } from 'graphql';
import {
  directiveEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';
import { apiKeyRateLimit, ipRateLimit, rateLimitTTL } from '../constants';
import { MyContext, MyRequest } from '../types/context';

export const CalculateQueryComplexity = (
  schema: GraphQLSchema,
  maxComplexity: number
): PluginDefinition => {
  return {
    requestDidStart: async (req) => ({
      async didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,

          query: request.operationName
            ? separateOperations(document)[request.operationName]
            : document,

          variables: request.variables,

          estimators: [
            directiveEstimator(),
            simpleEstimator({ defaultComplexity: 0 }),
          ],
        });

        if (complexity >= maxComplexity) {
          throw new UserRequestError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`
          );
        }

        const { ip, apiKey } = getReqCred(req.context.req);
        if (apiKey && typeof apiKey !== 'string') {
          throw new AuthenticationError('Invalid api key.');
        }

        const { isOverLimit, pointsLeft } = await checkRateLimit({
          ip,
          apiKey,
          ctx: req.context as MyContext,
          cost: complexity,
        });

        if (isOverLimit) {
          throw new UserRequestError(
            `Not enough points: estimated query cost: ${complexity}, points left: ${pointsLeft}`
          );
        }
      },
      willSendResponse: async () => {
        const ctx = req.context as MyContext;
        if (ctx.req.queryCost) {
          const { ip, apiKey } = await getReqCred(ctx.req);
          await ctx.cache.decrby(
            `RATELIMIT:${(apiKey as string) || ip}`,
            ctx.req.queryCost
          );
        }
      },
    }),
  };
};

const getReqCred = (req: MyRequest) => {
  const _req = req as MyRequest;
  const [ip, apiKey] = [_req.ip, _req.headers['x-api-key']];

  return { ip, apiKey };
};

type cred = {
  apiKey?: string;
  ip: string;
  ctx: MyContext;
  cost: number;
};
const checkRateLimit = async ({
  apiKey,
  ip,
  ctx,
  cost,
}: cred): Promise<{ isOverLimit: boolean; pointsLeft: number }> => {
  let current: number;
  if (apiKey) {
    current = await getCurrentTotalWithAPIKey(apiKey, ctx);
  } else {
    current = await getCurrentTotalWithIp(ip, ctx);
  }

  const pointsLeft = apiKey ? apiKeyRateLimit - current : ipRateLimit - current;
  const isOverLimit = current + cost > (apiKey ? apiKeyRateLimit : ipRateLimit);
  return {
    pointsLeft,
    isOverLimit,
  };
};

const getCurrentTotalWithAPIKey = async (apiKey: string, ctx: MyContext) => {
  const currentTotal = await ctx.cache.get(`RATELIMIT:${apiKey}`);
  if (!currentTotal) {
    const user = await ctx.db.user.findUnique({ where: { api_key: apiKey } });
    if (user) {
      // Cache api key.
      ctx.cache.setex(`RATELIMIT:${apiKey}`, rateLimitTTL, 0);
      return 0;
    } else {
      throw new AuthenticationError('Invalid API Key.');
    }
  }
  return Math.abs(+currentTotal);
};

const getCurrentTotalWithIp = async (
  ip: string,
  ctx: MyContext
): Promise<number> => {
  const currentTotal = await ctx.cache.get(`RATELIMIT:${ip}`);

  if (!currentTotal) {
    // Cache ip.
    ctx.cache.setex(`RATELIMIT:${ip}`, rateLimitTTL, 0);
    return 0;
  }

  return Math.abs(+currentTotal);
};

class UserRequestError extends ApolloError {
  constructor(message: string) {
    super(message, 'TOO_MANY_REQUESTS');

    Object.defineProperty(this, 'name', { value: 'ExceedLimitError' });
  }
}
