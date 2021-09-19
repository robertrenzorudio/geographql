-- AlterTable
ALTER TABLE "City" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "State" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Timezone" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updated_at" DROP DEFAULT;
