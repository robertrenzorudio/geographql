import { UserInputError } from 'apollo-server-errors';
import { PaginationInput } from '../types/graphql';
import { toCursorObject } from '../utils';

const prismaPage = (
  page: PaginationInput | undefined | null,
  defaultCursor = 1,
  defaultSize = 100
) => {
  const pagination = { take: defaultSize, cursor: { id: defaultCursor } };
  if (!page) {
    return pagination;
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

  if (first) {
    pagination.take = first;
  } else {
    pagination.take = -1 * last!;
  }

  if (after) {
    pagination.cursor.id = toCursorObject(after).cursor + 1;
  } else if (before) {
    pagination.cursor.id = toCursorObject(before).cursor - 1;
  }

  return pagination;
};

export default prismaPage;
