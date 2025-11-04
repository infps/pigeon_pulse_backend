-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('PERCH_FEE', 'ENTRY_FEE', 'HOTSPOT_FEE_1', 'HOTSPOT_FEE_2', 'HOTSPOT_FEE_3', 'FINAL_RACE_FEE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('CASH', 'CHECK', 'CREDIT_CARD', 'BANK_TRANSFER', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PROSPECT');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('AGN', 'AS');

-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."RaceType" AS ENUM ('TRAINING', 'INVENTORY', 'LOFT_FLY', 'PULLING_FLIGHT', 'FINAL_RACE', 'HOTSPOT_1', 'HOTSPOT_2', 'HOTSPOT_3', 'AVG_WINNER');

-- CreateEnum
CREATE TYPE "public"."BirdSex" AS ENUM ('COCK', 'HEN');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('BREEDER', 'ADMIN', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "breederNumber" INTEGER,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'BREEDER',
    "firstName" TEXT,
    "lastName" TEXT,
    "country" TEXT,
    "isDefaultAddress1" BOOLEAN NOT NULL DEFAULT false,
    "address1" TEXT,
    "city1" TEXT,
    "state1" TEXT,
    "zip1" TEXT,
    "address2" TEXT,
    "city2" TEXT,
    "state2" TEXT,
    "zip2" TEXT,
    "phone" TEXT,
    "cell" TEXT,
    "fax" TEXT,
    "email2" TEXT,
    "webAddress" TEXT,
    "sms" TEXT,
    "ssn" TEXT,
    "taxNumber" TEXT,
    "status" "public"."UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "statusDate" TIMESTAMP(3),
    "note" TEXT,
    "loginName" TEXT,
    "loginPassword" TEXT,
    "defaultNameAgn" TEXT,
    "defaultNameAs" TEXT,
    "pictureId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bird" (
    "id" TEXT NOT NULL,
    "band" TEXT,
    "band1" TEXT,
    "band2" TEXT,
    "band3" TEXT,
    "band4" TEXT,
    "birdName" TEXT NOT NULL,
    "rfId" TEXT,
    "color" TEXT NOT NULL,
    "sex" "public"."BirdSex" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isRaceVerified" BOOLEAN NOT NULL DEFAULT false,
    "isLost" BOOLEAN NOT NULL DEFAULT false,
    "lostDate" TIMESTAMP(3),
    "lostRaceId" TEXT,
    "note" TEXT,
    "playAttentionSound" BOOLEAN NOT NULL DEFAULT false,
    "pictureId" TEXT,
    "breederId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bird_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LostHistory" (
    "id" TEXT NOT NULL,
    "birdId" TEXT NOT NULL,
    "lostDate" TIMESTAMP(3) NOT NULL,
    "isLost" BOOLEAN NOT NULL,
    "raceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LostHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FeeSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entryFee" DOUBLE PRECISION NOT NULL,
    "isRefundable" BOOLEAN NOT NULL DEFAULT false,
    "minEntryFees" INTEGER NOT NULL,
    "maxBirdCount" INTEGER NOT NULL,
    "maxBackupBirdCount" INTEGER NOT NULL,
    "isFloatingBackup" BOOLEAN NOT NULL DEFAULT false,
    "feesCutPercent" DOUBLE PRECISION NOT NULL,
    "hotSpot1Fee" DOUBLE PRECISION NOT NULL,
    "hotSpot2Fee" DOUBLE PRECISION NOT NULL,
    "hotSpot3Fee" DOUBLE PRECISION NOT NULL,
    "hotSpotFinalFee" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "FeeSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PerchFeeItem" (
    "id" TEXT NOT NULL,
    "birdNo" INTEGER NOT NULL,
    "perchFee" DOUBLE PRECISION NOT NULL,
    "feeSchemaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PerchFeeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PrizeSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "PrizeSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PrizeDistribution" (
    "id" TEXT NOT NULL,
    "prizeSchemaId" TEXT NOT NULL,
    "fromPosition" INTEGER NOT NULL,
    "toPosition" INTEGER NOT NULL,
    "prizeValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrizeDistribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PrizeValue" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "raceTypeId" INTEGER NOT NULL,
    "prizeSchemaId" TEXT NOT NULL,
    "prizeValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrizeValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BettingScheme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bettingCutPercent" DOUBLE PRECISION NOT NULL,
    "belgianShow1" DOUBLE PRECISION,
    "belgianShow2" DOUBLE PRECISION,
    "belgianShow3" DOUBLE PRECISION,
    "belgianShow4" DOUBLE PRECISION,
    "belgianShow5" DOUBLE PRECISION,
    "belgianShow6" DOUBLE PRECISION,
    "belgianShow7" DOUBLE PRECISION,
    "standardShow1" DOUBLE PRECISION,
    "standardShow2" DOUBLE PRECISION,
    "standardShow3" DOUBLE PRECISION,
    "standardShow4" DOUBLE PRECISION,
    "standardShow5" DOUBLE PRECISION,
    "standardShow6" DOUBLE PRECISION,
    "wta1" DOUBLE PRECISION,
    "wta2" DOUBLE PRECISION,
    "wta3" DOUBLE PRECISION,
    "wta4" DOUBLE PRECISION,
    "wta5" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BettingScheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StandardShowPercentage" (
    "id" TEXT NOT NULL,
    "bettingSchemeId" TEXT NOT NULL,
    "place" INTEGER NOT NULL,
    "percValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StandardShowPercentage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "public"."EventType" NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,
    "feeSchemaId" TEXT NOT NULL,
    "finalRacePrizeSchemaId" TEXT,
    "hotspot1PrizeSchemaId" TEXT,
    "hotspot2PrizeSchemaId" TEXT,
    "hotspot3PrizeSchemaId" TEXT,
    "avgWinnerPrizeSchemaId" TEXT,
    "bettingSchemeId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventRaceNumber" (
    "id" TEXT NOT NULL,
    "numberGroup" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,
    "numberRangeFrom" INTEGER NOT NULL,
    "numberRangeTo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventRaceNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventInventory" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "breederId" TEXT NOT NULL,
    "signInDate" TIMESTAMP(3),
    "waitingDate" TIMESTAMP(3),
    "isWaiting" BOOLEAN NOT NULL DEFAULT false,
    "reservedBirds" INTEGER NOT NULL,
    "loft" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Partners" (
    "id" TEXT NOT NULL,
    "eventInventoryId" TEXT NOT NULL,
    "breederId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventInventoryItem" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventInventoryId" TEXT,
    "birdId" TEXT NOT NULL,
    "birdNo" INTEGER,
    "arrivalDate" TIMESTAMP(3),
    "departureDate" TIMESTAMP(3),
    "perchFeeValue" DOUBLE PRECISION,
    "entryFeeValue" DOUBLE PRECISION,
    "entryFeePaid" BOOLEAN NOT NULL DEFAULT false,
    "entryRefund" DOUBLE PRECISION,
    "betsRefund" DOUBLE PRECISION,
    "hotSpotFeeValue" DOUBLE PRECISION,
    "hotSpotRefund" DOUBLE PRECISION,
    "transferDue" DOUBLE PRECISION,
    "replacedItemId" TEXT,
    "isBackup" BOOLEAN NOT NULL DEFAULT false,
    "belgianShowBet1" DOUBLE PRECISION,
    "belgianShowBet2" DOUBLE PRECISION,
    "belgianShowBet3" DOUBLE PRECISION,
    "belgianShowBet4" DOUBLE PRECISION,
    "belgianShowBet5" DOUBLE PRECISION,
    "belgianShowBet6" DOUBLE PRECISION,
    "belgianShowBet7" DOUBLE PRECISION,
    "standardShowBet1" DOUBLE PRECISION,
    "standardShowBet2" DOUBLE PRECISION,
    "standardShowBet3" DOUBLE PRECISION,
    "standardShowBet4" DOUBLE PRECISION,
    "standardShowBet5" DOUBLE PRECISION,
    "standardShowBet6" DOUBLE PRECISION,
    "wtaBet1" DOUBLE PRECISION,
    "wtaBet2" DOUBLE PRECISION,
    "wtaBet3" DOUBLE PRECISION,
    "wtaBet4" DOUBLE PRECISION,
    "wtaBet5" DOUBLE PRECISION,
    "isBetActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventInventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AvgWinnerPrizes" (
    "id" TEXT NOT NULL,
    "eventInventoryItemId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "prizeValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvgWinnerPrizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "type" "public"."PaymentType" NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "paymentValue" DOUBLE PRECISION NOT NULL,
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "paymentDesc" TEXT,
    "paymentTimestamp" TIMESTAMP(3),
    "transactionId" TEXT,
    "pictureId" TEXT,
    "eventInventoryId" TEXT NOT NULL,
    "breederId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RaceTypeDefinition" (
    "id" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,
    "numberGroupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RaceTypeDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Race" (
    "id" TEXT NOT NULL,
    "type" "public"."RaceType" NOT NULL,
    "raceNumber" INTEGER,
    "eventId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "distance" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "sunrise" TIMESTAMP(3),
    "sunset" TIMESTAMP(3),
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "weather" TEXT,
    "wind" TEXT,
    "temperature" TEXT,
    "arrivalWeather" TEXT,
    "arrivalWind" TEXT,
    "arrivalTemperature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Basket" (
    "id" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "basketNumber" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "isRaceBasket" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RaceItem" (
    "id" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "eventInventoryItemId" TEXT NOT NULL,
    "loftBasketed" BOOLEAN NOT NULL DEFAULT false,
    "loftBasketId" TEXT,
    "raceBasketed" BOOLEAN NOT NULL DEFAULT false,
    "raceBasketId" TEXT,
    "raceBasketTime" TIMESTAMP(3),
    "isLost" BOOLEAN NOT NULL DEFAULT false,
    "lostRaceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RaceItemResult" (
    "id" TEXT NOT NULL,
    "raceItemId" TEXT NOT NULL,
    "birdPosition" INTEGER,
    "birdPositionHotSpot" INTEGER,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "birdDrop" INTEGER,
    "prizeValue" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaceItemResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RaceItemScan" (
    "id" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "raceItemId" TEXT NOT NULL,
    "scanPos" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RaceItemScan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RaceIgnoreBird" (
    "id" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "eventInventoryItemId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RaceIgnoreBird_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RacePhantomBird" (
    "id" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "birdId" TEXT NOT NULL,
    "rfId" TEXT NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RacePhantomBird_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Picture" (
    "id" TEXT NOT NULL,
    "picture" BYTEA NOT NULL,
    "pictureType" TEXT,
    "pictureLayout" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrganizerData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "email" TEXT,
    "web" TEXT,
    "phone" TEXT,
    "cell" TEXT,
    "fax" TEXT,
    "note" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RightGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RightGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RightGroupLine" (
    "id" TEXT NOT NULL,
    "rightGroupId" TEXT NOT NULL,
    "rightCode" TEXT NOT NULL,
    "grantLevel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RightGroupLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserRightGroup" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rightGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRightGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_breederNumber_key" ON "public"."User"("breederNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_breederNumber_idx" ON "public"."User"("breederNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Bird_band_key" ON "public"."Bird"("band");

-- CreateIndex
CREATE INDEX "Bird_breederId_idx" ON "public"."Bird"("breederId");

-- CreateIndex
CREATE INDEX "Bird_band_idx" ON "public"."Bird"("band");

-- CreateIndex
CREATE INDEX "Bird_rfId_idx" ON "public"."Bird"("rfId");

-- CreateIndex
CREATE INDEX "LostHistory_birdId_idx" ON "public"."LostHistory"("birdId");

-- CreateIndex
CREATE INDEX "PerchFeeItem_feeSchemaId_idx" ON "public"."PerchFeeItem"("feeSchemaId");

-- CreateIndex
CREATE INDEX "PrizeDistribution_prizeSchemaId_idx" ON "public"."PrizeDistribution"("prizeSchemaId");

-- CreateIndex
CREATE INDEX "PrizeValue_eventId_idx" ON "public"."PrizeValue"("eventId");

-- CreateIndex
CREATE INDEX "PrizeValue_prizeSchemaId_idx" ON "public"."PrizeValue"("prizeSchemaId");

-- CreateIndex
CREATE INDEX "StandardShowPercentage_bettingSchemeId_idx" ON "public"."StandardShowPercentage"("bettingSchemeId");

-- CreateIndex
CREATE INDEX "Event_creatorId_idx" ON "public"."Event"("creatorId");

-- CreateIndex
CREATE INDEX "Event_date_idx" ON "public"."Event"("date");

-- CreateIndex
CREATE INDEX "Event_feeSchemaId_idx" ON "public"."Event"("feeSchemaId");

-- CreateIndex
CREATE INDEX "EventRaceNumber_eventId_idx" ON "public"."EventRaceNumber"("eventId");

-- CreateIndex
CREATE INDEX "EventInventory_eventId_idx" ON "public"."EventInventory"("eventId");

-- CreateIndex
CREATE INDEX "EventInventory_breederId_idx" ON "public"."EventInventory"("breederId");

-- CreateIndex
CREATE INDEX "Partners_eventInventoryId_idx" ON "public"."Partners"("eventInventoryId");

-- CreateIndex
CREATE INDEX "Partners_breederId_idx" ON "public"."Partners"("breederId");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_eventInventoryId_breederId_key" ON "public"."Partners"("eventInventoryId", "breederId");

-- CreateIndex
CREATE INDEX "EventInventoryItem_eventId_idx" ON "public"."EventInventoryItem"("eventId");

-- CreateIndex
CREATE INDEX "EventInventoryItem_eventInventoryId_idx" ON "public"."EventInventoryItem"("eventInventoryId");

-- CreateIndex
CREATE INDEX "EventInventoryItem_birdId_idx" ON "public"."EventInventoryItem"("birdId");

-- CreateIndex
CREATE INDEX "EventInventoryItem_birdNo_idx" ON "public"."EventInventoryItem"("birdNo");

-- CreateIndex
CREATE INDEX "AvgWinnerPrizes_eventInventoryItemId_idx" ON "public"."AvgWinnerPrizes"("eventInventoryItemId");

-- CreateIndex
CREATE INDEX "AvgWinnerPrizes_eventId_idx" ON "public"."AvgWinnerPrizes"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "public"."Payment"("transactionId");

-- CreateIndex
CREATE INDEX "Payment_eventInventoryId_idx" ON "public"."Payment"("eventInventoryId");

-- CreateIndex
CREATE INDEX "Payment_breederId_idx" ON "public"."Payment"("breederId");

-- CreateIndex
CREATE INDEX "Payment_paymentDate_idx" ON "public"."Payment"("paymentDate");

-- CreateIndex
CREATE INDEX "Race_eventId_idx" ON "public"."Race"("eventId");

-- CreateIndex
CREATE INDEX "Race_startTime_idx" ON "public"."Race"("startTime");

-- CreateIndex
CREATE INDEX "Race_type_idx" ON "public"."Race"("type");

-- CreateIndex
CREATE INDEX "Basket_raceId_idx" ON "public"."Basket"("raceId");

-- CreateIndex
CREATE INDEX "RaceItem_raceId_idx" ON "public"."RaceItem"("raceId");

-- CreateIndex
CREATE INDEX "RaceItem_eventInventoryItemId_idx" ON "public"."RaceItem"("eventInventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "RaceItemResult_raceItemId_key" ON "public"."RaceItemResult"("raceItemId");

-- CreateIndex
CREATE INDEX "RaceItemResult_raceItemId_idx" ON "public"."RaceItemResult"("raceItemId");

-- CreateIndex
CREATE INDEX "RaceItemScan_raceId_idx" ON "public"."RaceItemScan"("raceId");

-- CreateIndex
CREATE INDEX "RaceItemScan_raceItemId_idx" ON "public"."RaceItemScan"("raceItemId");

-- CreateIndex
CREATE INDEX "RaceIgnoreBird_raceId_idx" ON "public"."RaceIgnoreBird"("raceId");

-- CreateIndex
CREATE INDEX "RaceIgnoreBird_eventInventoryItemId_idx" ON "public"."RaceIgnoreBird"("eventInventoryItemId");

-- CreateIndex
CREATE INDEX "RacePhantomBird_raceId_idx" ON "public"."RacePhantomBird"("raceId");

-- CreateIndex
CREATE INDEX "RacePhantomBird_birdId_idx" ON "public"."RacePhantomBird"("birdId");

-- CreateIndex
CREATE INDEX "RacePhantomBird_eventId_idx" ON "public"."RacePhantomBird"("eventId");

-- CreateIndex
CREATE INDEX "RightGroupLine_rightGroupId_idx" ON "public"."RightGroupLine"("rightGroupId");

-- CreateIndex
CREATE INDEX "UserRightGroup_userId_idx" ON "public"."UserRightGroup"("userId");

-- CreateIndex
CREATE INDEX "UserRightGroup_rightGroupId_idx" ON "public"."UserRightGroup"("rightGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRightGroup_userId_rightGroupId_key" ON "public"."UserRightGroup"("userId", "rightGroupId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "public"."Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bird" ADD CONSTRAINT "Bird_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "public"."Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bird" ADD CONSTRAINT "Bird_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LostHistory" ADD CONSTRAINT "LostHistory_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "public"."Bird"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeeSchema" ADD CONSTRAINT "FeeSchema_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PerchFeeItem" ADD CONSTRAINT "PerchFeeItem_feeSchemaId_fkey" FOREIGN KEY ("feeSchemaId") REFERENCES "public"."FeeSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrizeSchema" ADD CONSTRAINT "PrizeSchema_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrizeDistribution" ADD CONSTRAINT "PrizeDistribution_prizeSchemaId_fkey" FOREIGN KEY ("prizeSchemaId") REFERENCES "public"."PrizeSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrizeValue" ADD CONSTRAINT "PrizeValue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrizeValue" ADD CONSTRAINT "PrizeValue_prizeSchemaId_fkey" FOREIGN KEY ("prizeSchemaId") REFERENCES "public"."PrizeSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StandardShowPercentage" ADD CONSTRAINT "StandardShowPercentage_bettingSchemeId_fkey" FOREIGN KEY ("bettingSchemeId") REFERENCES "public"."BettingScheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_feeSchemaId_fkey" FOREIGN KEY ("feeSchemaId") REFERENCES "public"."FeeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_bettingSchemeId_fkey" FOREIGN KEY ("bettingSchemeId") REFERENCES "public"."BettingScheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventRaceNumber" ADD CONSTRAINT "EventRaceNumber_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventory" ADD CONSTRAINT "EventInventory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventory" ADD CONSTRAINT "EventInventory_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Partners" ADD CONSTRAINT "Partners_eventInventoryId_fkey" FOREIGN KEY ("eventInventoryId") REFERENCES "public"."EventInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Partners" ADD CONSTRAINT "Partners_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventoryItem" ADD CONSTRAINT "EventInventoryItem_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventoryItem" ADD CONSTRAINT "EventInventoryItem_eventInventoryId_fkey" FOREIGN KEY ("eventInventoryId") REFERENCES "public"."EventInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventoryItem" ADD CONSTRAINT "EventInventoryItem_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "public"."Bird"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AvgWinnerPrizes" ADD CONSTRAINT "AvgWinnerPrizes_eventInventoryItemId_fkey" FOREIGN KEY ("eventInventoryItemId") REFERENCES "public"."EventInventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AvgWinnerPrizes" ADD CONSTRAINT "AvgWinnerPrizes_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "public"."Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_eventInventoryId_fkey" FOREIGN KEY ("eventInventoryId") REFERENCES "public"."EventInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Race" ADD CONSTRAINT "Race_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Basket" ADD CONSTRAINT "Basket_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "public"."Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceItem" ADD CONSTRAINT "RaceItem_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "public"."Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceItem" ADD CONSTRAINT "RaceItem_eventInventoryItemId_fkey" FOREIGN KEY ("eventInventoryItemId") REFERENCES "public"."EventInventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceItem" ADD CONSTRAINT "RaceItem_loftBasketId_fkey" FOREIGN KEY ("loftBasketId") REFERENCES "public"."Basket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceItem" ADD CONSTRAINT "RaceItem_raceBasketId_fkey" FOREIGN KEY ("raceBasketId") REFERENCES "public"."Basket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceItemResult" ADD CONSTRAINT "RaceItemResult_raceItemId_fkey" FOREIGN KEY ("raceItemId") REFERENCES "public"."RaceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceItemScan" ADD CONSTRAINT "RaceItemScan_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "public"."Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceItemScan" ADD CONSTRAINT "RaceItemScan_raceItemId_fkey" FOREIGN KEY ("raceItemId") REFERENCES "public"."RaceItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceIgnoreBird" ADD CONSTRAINT "RaceIgnoreBird_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "public"."Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RaceIgnoreBird" ADD CONSTRAINT "RaceIgnoreBird_eventInventoryItemId_fkey" FOREIGN KEY ("eventInventoryItemId") REFERENCES "public"."EventInventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RacePhantomBird" ADD CONSTRAINT "RacePhantomBird_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "public"."Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RacePhantomBird" ADD CONSTRAINT "RacePhantomBird_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "public"."Bird"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RacePhantomBird" ADD CONSTRAINT "RacePhantomBird_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RightGroupLine" ADD CONSTRAINT "RightGroupLine_rightGroupId_fkey" FOREIGN KEY ("rightGroupId") REFERENCES "public"."RightGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRightGroup" ADD CONSTRAINT "UserRightGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRightGroup" ADD CONSTRAINT "UserRightGroup_rightGroupId_fkey" FOREIGN KEY ("rightGroupId") REFERENCES "public"."RightGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
