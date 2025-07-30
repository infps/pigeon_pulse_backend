-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('BREEDER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PROSPECT');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('AGN', 'AS');

-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'BREEDER',
    "password" TEXT NOT NULL,
    "country" TEXT,
    "ssn" TEXT,
    "taxNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "primaryPhone" TEXT,
    "cellPhone" TEXT,
    "fax" TEXT,
    "sms" TEXT,
    "alternativeEmail" TEXT,
    "webAddress" TEXT,
    "status" "public"."UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FeeSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entryFee" DOUBLE PRECISION NOT NULL,
    "expensePercentage" DOUBLE PRECISION NOT NULL,
    "minEntryFee" INTEGER NOT NULL,
    "entryFeeRefundable" BOOLEAN NOT NULL DEFAULT false,
    "hs1Fee" DOUBLE PRECISION NOT NULL,
    "hs2Fee" DOUBLE PRECISION NOT NULL,
    "hs3Fee" DOUBLE PRECISION NOT NULL,
    "finalRaceFee" DOUBLE PRECISION NOT NULL,
    "maxBirds" INTEGER NOT NULL,
    "maxBackupBirds" INTEGER NOT NULL,
    "floatingBackup" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FeeSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PrizeSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PrizeSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PrizeDistribution" (
    "id" TEXT NOT NULL,
    "prizeSchemaId" TEXT NOT NULL,
    "fromPosition" INTEGER NOT NULL,
    "toPosition" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PrizeDistribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "status" "public"."EventStatus" NOT NULL DEFAULT 'OPEN',
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "public"."EventType" NOT NULL,
    "trainingCount" INTEGER NOT NULL,
    "inventoryCount" INTEGER NOT NULL,
    "finalRaceCount" INTEGER NOT NULL,
    "hotspotCount" INTEGER NOT NULL,
    "feeSchemaId" TEXT,
    "finalRacePrizeSchemaId" TEXT,
    "hotspot1PrizeSchemaId" TEXT,
    "hotspot2PrizeSchemaId" TEXT,
    "hotspot3PrizeSchemaId" TEXT,
    "avgWinnerPrizeSchemaId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."PrizeDistribution" ADD CONSTRAINT "PrizeDistribution_prizeSchemaId_fkey" FOREIGN KEY ("prizeSchemaId") REFERENCES "public"."PrizeSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_feeSchemaId_fkey" FOREIGN KEY ("feeSchemaId") REFERENCES "public"."FeeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_finalRacePrizeSchemaId_fkey" FOREIGN KEY ("finalRacePrizeSchemaId") REFERENCES "public"."PrizeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_hotspot1PrizeSchemaId_fkey" FOREIGN KEY ("hotspot1PrizeSchemaId") REFERENCES "public"."PrizeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_hotspot2PrizeSchemaId_fkey" FOREIGN KEY ("hotspot2PrizeSchemaId") REFERENCES "public"."PrizeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_hotspot3PrizeSchemaId_fkey" FOREIGN KEY ("hotspot3PrizeSchemaId") REFERENCES "public"."PrizeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_avgWinnerPrizeSchemaId_fkey" FOREIGN KEY ("avgWinnerPrizeSchemaId") REFERENCES "public"."PrizeSchema"("id") ON DELETE SET NULL ON UPDATE CASCADE;
