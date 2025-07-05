/*
  Warnings:

  - The `vaccinationStatus` column on the `Bird` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bird" DROP COLUMN "vaccinationStatus",
ADD COLUMN     "vaccinationStatus" BOOLEAN NOT NULL DEFAULT false;
