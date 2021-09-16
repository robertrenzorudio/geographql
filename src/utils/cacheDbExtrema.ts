import db from '../db';
import cache from '../cache';
import { getCacheKey } from '.';

const cacheDbExtrema = async () => {
  await cacheCity();
  await cacheCountry();
  await cacheState();
};

const cacheCountry = async () => {
  // Cache Min and Max id of Country.
  const [{ min: countryMin, max: countryMax }] = await db.$queryRaw<
    {
      min: number;
      max: number;
    }[]
  >`SELECT MIN(id), MAX(id) FROM "Country"`;

  const { minKey: countryMinKey, maxKey: countryMaxKey } =
    getCacheKey('Country');

  await cache
    .multi()
    .set(countryMinKey, countryMin)
    .set(countryMaxKey, countryMax)
    .exec();

  // Cache Min and Max id's of City by Country.
  const cityExtremaByCountryId = await db.$queryRaw<
    { country_id: number; min: number; max: number }[]
  >`SELECT "country_id", MIN(id), MAX(id) FROM "City" GROUP BY country_id`;

  let cityMinByCountryId: Record<number, number> = {};
  let cityMaxByCountryId: Record<number, number> = {};
  cityExtremaByCountryId.forEach(({ country_id, min, max }) => {
    cityMinByCountryId[country_id] = min;
    cityMaxByCountryId[country_id] = max;
  });

  const { minKey: cityInCountryMinId, maxKey: cityInCountryMaxId } =
    getCacheKey('Country', 'cities');

  await cache
    .multi()
    .hset(cityInCountryMinId, cityMinByCountryId)
    .hset(cityInCountryMaxId, cityMaxByCountryId)
    .exec();

  // Cache Min and Max id's of State by Country.
  const stateExtremaByCountryId = await db.$queryRaw<
    { country_id: number; min: number; max: number }[]
  >`SELECT "country_id", MIN(id), MAX(id) FROM "State" GROUP BY country_id`;

  let stateMinByCountryId: Record<number, number> = {};
  let stateMaxByCountryId: Record<number, number> = {};
  stateExtremaByCountryId.forEach(({ country_id, min, max }) => {
    stateMinByCountryId[country_id] = min;
    stateMaxByCountryId[country_id] = max;
  });

  const { minKey: stateInCountryMinId, maxKey: stateInCountryMaxId } =
    getCacheKey('Country', 'states');

  await cache
    .multi()
    .hset(stateInCountryMinId, stateMinByCountryId)
    .hset(stateInCountryMaxId, stateMaxByCountryId)
    .exec();
};

const cacheState = async () => {
  // Cache Min and Max id of State.
  const [{ min: stateMin, max: stateMax }] = await db.$queryRaw<
    {
      min: number;
      max: number;
    }[]
  >`SELECT MIN(id), MAX(id) FROM "State"`;

  const { minKey: stateMinKey, maxKey: stateMaxKey } = getCacheKey('State');

  await cache
    .multi()
    .set(stateMinKey, stateMin)
    .set(stateMaxKey, stateMax)
    .exec();

  // Cache Min and Max id's of City by State.
  const cityExtremaByStateId = await db.$queryRaw<
    { state_id: number; min: number; max: number }[]
  >`SELECT "state_id", MIN(id), MAX(id) FROM "City" GROUP BY state_id`;

  let cityMinByStateId: Record<number, number> = {};
  let cityMaxByStateId: Record<number, number> = {};
  cityExtremaByStateId.forEach(({ state_id, min, max }) => {
    cityMinByStateId[state_id] = min;
    cityMaxByStateId[state_id] = max;
  });

  const { minKey: stateInCityMinId, maxKey: stateInCityMaxId } = getCacheKey(
    'State',
    'cities'
  );

  await cache
    .multi()
    .hset(stateInCityMinId, cityMinByStateId)
    .hset(stateInCityMaxId, cityMaxByStateId)
    .exec();
};

const cacheCity = async () => {
  // Cache Min and Max id of City.
  const [{ min: cityMin, max: cityMax }] = await db.$queryRaw<
    {
      min: number;
      max: number;
    }[]
  >`SELECT MIN(id), MAX(id) FROM "City"`;

  const { minKey: cityMinKey, maxKey: cityMaxKey } = getCacheKey('City');

  await cache.multi().set(cityMinKey, cityMin).set(cityMaxKey, cityMax).exec();
};

export default cacheDbExtrema;
