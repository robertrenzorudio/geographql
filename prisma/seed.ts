import { PrismaClient, Country, Timezone, State, City } from '@prisma/client';
import fs from 'fs';
import util from 'util';
import path from 'path';

const readFile = util.promisify(fs.readFile);
const prisma = new PrismaClient();

const seedCountry = async () => {
  const countriesRaw = await readFile(
    path.join(__dirname, '../data/countries.json'),
    'utf-8'
  );

  const countries = JSON.parse(countriesRaw) as Country[];

  for (const country of countries) {
    const {
      name,
      iso2,
      iso3,
      numeric_code,
      phone_code,
      capital,
      currency,
      currency_symbol,
      tld,
      native,
      region,
      subregion,
      translations,
      latitude,
      longitude,
      emoji,
      emojiU,
    } = country;

    await prisma.country.create({
      data: {
        name,
        iso2,
        iso3,
        numeric_code,
        phone_code,
        capital,
        currency,
        currency_symbol,
        tld,
        native,
        region,
        subregion,
        translations: translations!,
        latitude,
        longitude,
        emoji,
        emojiU,
      },
    });
  }
};

const seedTimezone = async () => {
  const timezonesRaw = await readFile(
    path.join(__dirname, '../data/timezones.json'),
    'utf-8'
  );

  const timezones = JSON.parse(timezonesRaw) as Timezone[];

  for (const timezone of timezones) {
    const {
      zone_name,
      gmt_offset,
      gmt_offset_name,
      abbreviation,
      timezone_name,
      country_id,
    } = timezone;

    await prisma.timezone.create({
      data: {
        zone_name,
        gmt_offset,
        gmt_offset_name,
        abbreviation,
        timezone_name,
        country_id,
      },
    });
  }
};

const seedState = async () => {
  const stateRaw = await readFile(
    path.join(__dirname, '../data/states.json'),
    'utf-8'
  );

  const states = JSON.parse(stateRaw) as State[];

  for (const state of states) {
    const { name, state_code, country_code, latitude, longitude, country_id } =
      state;

    await prisma.state.create({
      data: {
        name,
        state_code,
        country_code,
        latitude,
        longitude,
        country_id,
      },
    });
  }
};

const seedCity = async () => {
  const citiesRaw = await readFile(
    path.join(__dirname, '../data/cities.json'),
    'utf-8'
  );

  const cities = JSON.parse(citiesRaw) as City[];

  for (const city of cities) {
    const {
      name,
      state_id,
      state_code,
      country_id,
      country_code,
      latitude,
      longitude,
    } = city;

    await prisma.city.create({
      data: {
        name,
        state_id,
        state_code,
        country_id,
        country_code,
        latitude,
        longitude,
      },
    });
  }
};

(async () => {
  await seedCountry();
  await seedTimezone();
  await seedState();
  await seedCity();
})()
  .catch((err) => console.log(err))
  .finally(() => prisma.$disconnect());
