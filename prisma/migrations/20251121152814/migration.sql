/*
  Warnings:

  - The primary key for the `EventRaceNumber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[ID_NUMBER_GROUP,ID_EVENT]` on the table `EventRaceNumber` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ID_EVENT` on table `EventRaceNumber` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventRaceNumber" DROP CONSTRAINT "EventRaceNumber_pkey",
ALTER COLUMN "ID_EVENT" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EventRaceNumber_ID_NUMBER_GROUP_ID_EVENT_key" ON "EventRaceNumber"("ID_NUMBER_GROUP", "ID_EVENT");
