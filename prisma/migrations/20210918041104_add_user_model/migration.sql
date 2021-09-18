-- CreateEnum
CREATE TYPE "Strategy" AS ENUM ('GITHUB', 'GOOGLE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "strategy" "Strategy" NOT NULL,
    "profile_id" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "request_left" INTEGER NOT NULL,
    "api_key" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_api_key_key" ON "User"("api_key");

-- CreateIndex
CREATE UNIQUE INDEX "User_strategy_profile_id_key" ON "User"("strategy", "profile_id");
