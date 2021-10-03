import { Cursor } from '../types/cursor';

const toCursorObject = (cursor: string) => {
  return JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')) as Cursor;
};

export default toCursorObject;
