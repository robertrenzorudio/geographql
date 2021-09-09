-- DropForeignKey
ALTER TABLE "Timezone" DROP CONSTRAINT "Timezone_country_id_fkey";

-- AddForeignKey
ALTER TABLE "Timezone" ADD CONSTRAINT "Timezone_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Country.iso2_unique" RENAME TO "Country_iso2_key";

-- RenameIndex
ALTER INDEX "Country.iso3_unique" RENAME TO "Country_iso3_key";

-- RenameIndex
ALTER INDEX "Country.latitude_longitude_unique" RENAME TO "Country_latitude_longitude_key";

-- RenameIndex
ALTER INDEX "Country.numeric_code_unique" RENAME TO "Country_numeric_code_key";
