/*
  Warnings:

  - You are about to drop the column `current_symbol` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `phonecode` on the `Country` table. All the data in the column will be lost.
  - Added the required column `currency_symbol` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_code` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Country.phonecode_unique";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "current_symbol",
DROP COLUMN "phonecode",
ADD COLUMN     "currency_symbol" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone_code" VARCHAR(255) NOT NULL;
