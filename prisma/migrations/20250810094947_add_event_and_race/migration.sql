-- CreateEnum
CREATE TYPE "public"."RACETYPE" AS ENUM ('TRAINING', 'INVENTORY', 'LOFT_FLY', 'PULLING_FLIGHT', 'FINAL_RACE', 'HOTSPOT_1', 'HOTSPOT_2', 'HOTSPOT_3', 'AVG_WINNER');

-- CreateEnum
CREATE TYPE "public"."BirdSex" AS ENUM ('COCK', 'HEN');

-- CreateTable
CREATE TABLE "public"."EventInventory" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "breederId" TEXT NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reserved_birds" INTEGER NOT NULL,
    "loft" TEXT NOT NULL,
    "note" TEXT,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventInventoryItem" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "birdId" TEXT NOT NULL,
    "rfId" TEXT NOT NULL,
    "arrivalDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventInventoryId" TEXT,

    CONSTRAINT "EventInventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Race" (
    "id" TEXT NOT NULL,
    "type" "public"."RACETYPE" NOT NULL,
    "RACE_ID" TEXT NOT NULL,
    "RACE_NUMBER" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locationLat" DOUBLE PRECISION NOT NULL,
    "locationLng" DOUBLE PRECISION NOT NULL,
    "distance" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "sunrise" TIMESTAMP(3) NOT NULL,
    "sunset" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "public"."Bird" (
    "id" TEXT NOT NULL,
    "band" TEXT NOT NULL,
    "band_1" TEXT NOT NULL,
    "band_2" TEXT NOT NULL,
    "band_3" TEXT NOT NULL,
    "band_4" TEXT NOT NULL,
    "birdName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_lost" BOOLEAN NOT NULL DEFAULT false,
    "lost_date" TIMESTAMP(3),
    "lost_race_id" TEXT,
    "note" TEXT,
    "imageUrl" TEXT,
    "sex" "public"."BirdSex" NOT NULL,
    "breederId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bird_pkey" PRIMARY KEY ("id")
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RaceItemResult" (
    "id" TEXT NOT NULL,
    "raceItemId" TEXT NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "distanceUnit" TEXT NOT NULL DEFAULT 'MILES',
    "speedUnit" TEXT NOT NULL DEFAULT 'MPH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaceItemResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentValue" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentNote" TEXT,
    "eventInventoryId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventInventoryItem_rfId_key" ON "public"."EventInventoryItem"("rfId");

-- CreateIndex
CREATE INDEX "idx_rfId" ON "public"."EventInventoryItem"("rfId");

-- CreateIndex
CREATE UNIQUE INDEX "Race_RACE_ID_key" ON "public"."Race"("RACE_ID");

-- CreateIndex
CREATE INDEX "Race_eventId_startTime_idx" ON "public"."Race"("eventId", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Bird_band_key" ON "public"."Bird"("band");

-- CreateIndex
CREATE UNIQUE INDEX "RaceItemResult_raceItemId_key" ON "public"."RaceItemResult"("raceItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_eventInventoryId_key" ON "public"."Payment"("eventInventoryId");

-- AddForeignKey
ALTER TABLE "public"."EventInventory" ADD CONSTRAINT "EventInventory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventory" ADD CONSTRAINT "EventInventory_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventoryItem" ADD CONSTRAINT "EventInventoryItem_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventoryItem" ADD CONSTRAINT "EventInventoryItem_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "public"."Bird"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventInventoryItem" ADD CONSTRAINT "EventInventoryItem_eventInventoryId_fkey" FOREIGN KEY ("eventInventoryId") REFERENCES "public"."EventInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Race" ADD CONSTRAINT "Race_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bird" ADD CONSTRAINT "Bird_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_eventInventoryId_fkey" FOREIGN KEY ("eventInventoryId") REFERENCES "public"."EventInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
