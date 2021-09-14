import db from '../db';
import cache from '../cache';

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

  cache.set('Min:Country', countryMin);
  cache.set('Max:Country', countryMax);
};

const cacheState = async () => {
  // Cache Min and Max id of State.
  const [{ min: stateMin, max: stateMax }] = await db.$queryRaw<
    {
      min: number;
      max: number;
    }[]
  >`SELECT MIN(id), MAX(id) FROM "State"`;

  cache.set('StateMin', stateMin);
  cache.set('StateMax', stateMax);

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

  cache.hset('Min:State[country_id]', stateMinByCountryId);
  cache.hset('Max:State[country_id]', stateMaxByCountryId);
};

const cacheCity = async () => {
  // Cache Min and Max id of City.
  const [{ min: cityMin, max: cityMax }] = await db.$queryRaw<
    {
      min: number;
      max: number;
    }[]
  >`SELECT MIN(id), MAX(id) FROM "State"`;

  cache.set('CityMin', cityMin);
  cache.set('CityMax', cityMax);

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

  await cache.hset('Min:City[country_id]', cityMinByCountryId);
  await cache.hset('Max:City[country_id]', cityMaxByCountryId);

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

  await cache.hset('Min:City[state_id]', cityMinByStateId);
  await cache.hset('Max:City[state_id]', cityMaxByStateId);
};

export default cacheDbExtrema;
