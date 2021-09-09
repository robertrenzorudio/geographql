import { PrismaClient, Country, Timezone } from '@prisma/client';
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

  for (let i = 0; i < countries.length; i++) {
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
    } = countries[i];

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

  for (let i = 0; i < timezones.length; i++) {
    const {
      zone_name,
      gmt_offset,
      gmt_offset_name,
      abbreviation,
      timezone_name,
      country_id,
    } = timezones[i];

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

(async () => {
  await seedCountry();
  await seedTimezone();
})()
  .catch((err) => console.log(err))
  .finally(() => prisma.$disconnect());
