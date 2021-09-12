import { PrismaClient } from '@prisma/client';
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

  const countries = JSON.parse(countriesRaw);
  await prisma.country.createMany({ data: countries });
};

const seedTimezone = async () => {
  const timezonesRaw = await readFile(
    path.join(__dirname, '../data/timezones.json'),
    'utf-8'
  );

  const timezones = JSON.parse(timezonesRaw);
  await prisma.timezone.createMany({ data: timezones });
};

const seedState = async () => {
  const stateRaw = await readFile(
    path.join(__dirname, '../data/states.json'),
    'utf-8'
  );

  const states = JSON.parse(stateRaw);
  await prisma.state.createMany({ data: states });
};

const seedCity = async () => {
  const citiesRaw = await readFile(
    path.join(__dirname, '../data/cities.json'),
    'utf-8'
  );

  const cities = JSON.parse(citiesRaw);

  // Split into halves to stay under maximum call stack size.
  const half = cities.length;
  const fHalf = cities.slice(0, half);
  const sHalf = cities.slice(half);
  await prisma.city.createMany({ data: fHalf });
  await prisma.city.createMany({ data: sHalf });
};

(async () => {
  await seedCountry();
  await seedTimezone();
  await seedState();
  await seedCity();
})()
  .catch((err) => console.log(err))
  .finally(() => prisma.$disconnect());
