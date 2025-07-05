/*
  Warnings:

  - Added the required column `gender` to the `Bird` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BirdGender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Bird" DROP COLUMN "gender",
ADD COLUMN     "gender" "BirdGender" NOT NULL,
ALTER COLUMN "raceExperience" SET DEFAULT 0;
