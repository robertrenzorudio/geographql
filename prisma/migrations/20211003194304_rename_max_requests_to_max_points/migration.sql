/*
  Warnings:

  - You are about to drop the column `max_request` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" 
RENAME COLUMN "max_request" TO "max_points"
