-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "iso2" CHAR(2) NOT NULL,
    "iso3" CHAR(3) NOT NULL,
    "numeric_code" CHAR(3) NOT NULL,
    "phonecode" VARCHAR(255) NOT NULL,
    "capital" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(255) NOT NULL,
    "current_symbol" VARCHAR(255) NOT NULL,
    "tld" CHAR(3) NOT NULL,
    "native" VARCHAR(255) NOT NULL,
    "region" VARCHAR(255) NOT NULL,
    "subregion" VARCHAR(255) NOT NULL,
    "translations" JSON NOT NULL,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "emoji" VARCHAR(255) NOT NULL,
    "emojiU" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timezone" (
    "id" SERIAL NOT NULL,
    "zoneName" VARCHAR(255) NOT NULL,
    "gmtOffset" INTEGER NOT NULL,
    "gmtOffSetName" VARCHAR(255) NOT NULL,
    "abbreviation" VARCHAR(255) NOT NULL,
    "tzName" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country.iso2_unique" ON "Country"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "Country.iso3_unique" ON "Country"("iso3");

-- CreateIndex
CREATE UNIQUE INDEX "Country.numeric_code_unique" ON "Country"("numeric_code");

-- CreateIndex
CREATE UNIQUE INDEX "Country.phonecode_unique" ON "Country"("phonecode");

-- CreateIndex
CREATE UNIQUE INDEX "Timezone.zoneName_unique" ON "Timezone"("zoneName");

-- AddForeignKey
ALTER TABLE "Timezone" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
