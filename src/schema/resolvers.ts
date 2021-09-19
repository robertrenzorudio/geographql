import merge from 'lodash/merge';
import city from './city/resolvers';
import country from './country/resolvers';
import json from './json/resolvers';
import state from './state/resolvers';
import timezone from './timezone/resolvers';
import user from './user/resolvers';

const resolvers = merge(city, country, json, state, timezone, user);

export default resolvers;
