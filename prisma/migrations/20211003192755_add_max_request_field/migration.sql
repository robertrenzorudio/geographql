/*
  Warnings:

  - You are about to drop the column `request_left` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "request_left",
ADD COLUMN     "max_request" INTEGER NOT NULL DEFAULT 10000;
