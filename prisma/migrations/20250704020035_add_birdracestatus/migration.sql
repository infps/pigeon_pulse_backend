-- CreateEnum
CREATE TYPE "BirdRaceStatus" AS ENUM ('UNKNOWN', 'ARRIVED', 'DISQUALIFIED', 'RETIRED', 'MISSING');

-- AlterTable
ALTER TABLE "RaceEntry" ADD COLUMN     "birdStatus" "BirdRaceStatus" NOT NULL DEFAULT 'UNKNOWN';
