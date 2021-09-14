import type { Cursor } from '../types/cursor';

type BaseType = {
  id: number;
};

export const createEdges = <DataElementType extends BaseType>(
  nodes: DataElementType[]
) => {
  return nodes.map((node) => {
    return {
      cursor: Buffer.from(
        JSON.stringify({ cursor: node.id } as Cursor)
      ).toString('base64'),
      node,
    };
  });
};
