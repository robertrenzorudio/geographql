/*
  Warnings:

  - You are about to drop the column `gmtOffSetName` on the `Timezone` table. All the data in the column will be lost.
  - Added the required column `gmtOffsetName` to the `Timezone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timezone" DROP COLUMN "gmtOffSetName",
ADD COLUMN     "gmtOffsetName" VARCHAR(255) NOT NULL;
