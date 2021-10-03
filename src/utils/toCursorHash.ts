import type { Cursor } from '../types/cursor';

const toCursorHash = (id: number) =>
  Buffer.from(JSON.stringify({ cursor: id } as Cursor)).toString('base64');

export default toCursorHash;
