type WhichId = 'MAX' | 'MIN';

type ParentType = 'City' | 'Country' | 'State';

type FieldType = 'cities' | 'countries' | 'states';

const getCacheKey = (
  whichId: WhichId,
  parent: ParentType,
  field?: FieldType
) => {
  // whichId:parent?.field ==> get max/min cache key of parent?.field
  return `${whichId}:${parent}${field ? '.' + field : ''}`;
};
export default getCacheKey;
