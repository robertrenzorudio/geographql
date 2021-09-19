import city from './city/typeDefs';
import country from './country/typeDefs';
import json from './json/typeDefs';
import PaginationInput from './pagination/typeDefs';
import state from './state/typeDefs';
import timezone from './timezone/typeDefs';
import user from './user/typeDefs';

const typeDefs = [city, country, json, PaginationInput, state, timezone, user];

export default typeDefs;
