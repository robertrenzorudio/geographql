type ParentType = 'City' | 'Country' | 'Region' | 'State' | 'Subregion';

type FieldType = 'cities' | 'countries' | 'states';

const getCacheKeys = (
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
export default getCacheKeys;
