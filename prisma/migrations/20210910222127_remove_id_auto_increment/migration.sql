-- AlterTable
ALTER TABLE "City" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "City_id_seq";

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Country_id_seq";

-- AlterTable
ALTER TABLE "State" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "State_id_seq";

-- AlterTable
ALTER TABLE "Timezone" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Timezone_id_seq";
