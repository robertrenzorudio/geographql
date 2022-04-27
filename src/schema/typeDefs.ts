import city from './city/typeDefs';
import country from './country/typeDefs';
import directive from './directive/typeDef';
import json from './json/typeDefs';
import PaginationInput from './pagination/typeDefs';
import state from './state/typeDefs';
import timezone from './timezone/typeDefs';
//import user from './user/typeDefs';

const typeDefs = [
  city,
  country,
  directive,
  json,
  PaginationInput,
  state,
  timezone,
  //user,
];

export default typeDefs;
