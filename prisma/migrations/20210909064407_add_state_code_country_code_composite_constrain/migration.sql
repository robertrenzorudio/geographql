/*
  Warnings:

  - A unique constraint covering the columns `[state_code,country_code]` on the table `State` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "State_state_code_country_code_key" ON "State"("state_code", "country_code");
