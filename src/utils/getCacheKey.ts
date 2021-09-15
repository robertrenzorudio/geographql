type ParentType = 'City' | 'Country' | 'State';

type FieldType = 'cities' | 'countries' | 'states';

const getCacheKey = (
  parent: ParentType,
  field?: FieldType
): { minKey: string; maxKey: string } => {
  // MAX|MIN:parent?.field ==> get max/min cache key of parent?.field
  const key = `${parent}${field ? '.' + field : ''}`;
  return {
    minKey: `MIN:${key}`,
    maxKey: `MAX:${key}`,
  };
};
export default getCacheKey;
