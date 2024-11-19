-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "averageRating" DROP NOT NULL,
ALTER COLUMN "averageRating" SET DEFAULT 0;
