import { UserInputError } from 'apollo-server-errors';
import { PaginationInput } from '../types/graphql';
import { toCursorObject } from '../utils';

const prismaPage = (
  page: PaginationInput | undefined | null
): { take: number; cursor: { id: number } | undefined } => {
  if (!page || Object.keys(page).length === 0) {
    return {
      take: 100,
      cursor: undefined,
    };
  }

  const { first, after, last, before } = page;
  if (first && last) {
    throw new UserInputError('providing both first and last is not supported');
  }
  if (first && before) {
    throw new UserInputError('using first with before is not supported');
  }
  if (last && after) {
    throw new UserInputError('using last with after is not supported');
  }
  if (last && !before) {
    throw new UserInputError('using last without before is not supported');
  }
  let take: number;
  if (first) {
    take = first;
  } else {
    take = -1 * last!;
  }

  let cursor: { id: number } | undefined = undefined;
  if (after) {
    cursor = { id: toCursorObject(after).cursor + 1 };
  } else if (before) {
    cursor = { id: toCursorObject(before).cursor - 1 };
  }

  return { take, cursor };
};

export default prismaPage;
