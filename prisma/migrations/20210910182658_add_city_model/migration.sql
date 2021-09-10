-- AlterTable
ALTER TABLE "State" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "state_id" INTEGER NOT NULL,
    "state_code" VARCHAR(255) NOT NULL,
    "country_id" INTEGER NOT NULL,
    "country_code" VARCHAR(2) NOT NULL,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
