import merge from 'lodash/merge';
import country from './country/resolvers';
import json from './json/resolvers';
import state from './state/resolvers';
import timezone from './timezone/resolvers';

const resolvers = merge(country, json, state, timezone);

export default resolvers;
