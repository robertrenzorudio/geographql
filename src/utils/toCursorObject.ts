import { Cursor } from '../types/cursor';
import { UserInputError } from 'apollo-server-errors';

const toCursorObject = (cursor: string) => {
  try {
    return JSON.parse(
      Buffer.from(cursor, 'base64').toString('ascii')
    ) as Cursor;
  } catch {
    throw new UserInputError('Invalid cursor.');
  }
};

export default toCursorObject;
