import merge from 'lodash/merge';
import person from './person/resolvers';

const resolvers = merge(person);

export default resolvers;
