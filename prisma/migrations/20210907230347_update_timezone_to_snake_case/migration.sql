/*
  Warnings:

  - You are about to drop the column `countryId` on the `Timezone` table. All the data in the column will be lost.
  - You are about to drop the column `gmtOffset` on the `Timezone` table. All the data in the column will be lost.
  - You are about to drop the column `gmtOffsetName` on the `Timezone` table. All the data in the column will be lost.
  - You are about to drop the column `tzName` on the `Timezone` table. All the data in the column will be lost.
  - You are about to drop the column `zoneName` on the `Timezone` table. All the data in the column will be lost.
  - Added the required column `country_id` to the `Timezone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gmt_offset` to the `Timezone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gmt_offset_name` to the `Timezone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone_name` to the `Timezone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone_name` to the `Timezone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Timezone" DROP CONSTRAINT "Timezone_countryId_fkey";

-- DropIndex
DROP INDEX "Timezone.zoneName_unique";

-- AlterTable
ALTER TABLE "Timezone" DROP COLUMN "countryId",
DROP COLUMN "gmtOffset",
DROP COLUMN "gmtOffsetName",
DROP COLUMN "tzName",
DROP COLUMN "zoneName",
ADD COLUMN     "country_id" INTEGER NOT NULL,
ADD COLUMN     "gmt_offset" INTEGER NOT NULL,
ADD COLUMN     "gmt_offset_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "timezone_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "zone_name" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Timezone" ADD FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
