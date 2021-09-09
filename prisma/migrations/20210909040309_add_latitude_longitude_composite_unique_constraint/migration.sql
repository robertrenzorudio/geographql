/*
  Warnings:

  - A unique constraint covering the columns `[latitude,longitude]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Country.latitude_longitude_unique" ON "Country"("latitude", "longitude");
