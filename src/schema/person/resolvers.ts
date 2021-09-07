import { QueryResolvers, Person } from '../../types/graphql';

const persons: Person[] = [
  { id: 0, name: 'hello' },
  { id: 1, name: 'world' },
  { id: 2, name: 'foo' },
  { id: 3, name: 'bar' },
];

const Query: QueryResolvers = {
  person: (_, { id }) => {
    return persons[id];
  },

  persons: (_, { count }) => {
    if (count === 0) {
      return [];
    } else {
      return persons.slice(0, count);
    }
  },
};

export default { Query };
