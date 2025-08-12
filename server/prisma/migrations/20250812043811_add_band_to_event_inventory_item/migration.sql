/*
  Warnings:

  - You are about to drop the column `band` on the `Bird` table. All the data in the column will be lost.
  - You are about to drop the column `band_1` on the `Bird` table. All the data in the column will be lost.
  - You are about to drop the column `band_2` on the `Bird` table. All the data in the column will be lost.
  - You are about to drop the column `band_3` on the `Bird` table. All the data in the column will be lost.
  - You are about to drop the column `band_4` on the `Bird` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Bird` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[band]` on the table `EventInventoryItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Bird_band_key";

-- AlterTable
ALTER TABLE "public"."Bird" DROP COLUMN "band",
DROP COLUMN "band_1",
DROP COLUMN "band_2",
DROP COLUMN "band_3",
DROP COLUMN "band_4",
DROP COLUMN "note";

-- AlterTable
ALTER TABLE "public"."EventInventoryItem" ADD COLUMN     "band" TEXT,
ADD COLUMN     "band_1" TEXT,
ADD COLUMN     "band_2" TEXT,
ADD COLUMN     "band_3" TEXT,
ADD COLUMN     "band_4" TEXT,
ADD COLUMN     "note" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "EventInventoryItem_band_key" ON "public"."EventInventoryItem"("band");
