/*
  Warnings:

  - Added the required column `finalFrom` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalTo` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotspotFrom` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotspotTo` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryFrom` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryTo` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingFrom` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingTo` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "finalFrom" INTEGER NOT NULL,
ADD COLUMN     "finalTo" INTEGER NOT NULL,
ADD COLUMN     "hotspotFrom" INTEGER NOT NULL,
ADD COLUMN     "hotspotTo" INTEGER NOT NULL,
ADD COLUMN     "inventoryFrom" INTEGER NOT NULL,
ADD COLUMN     "inventoryTo" INTEGER NOT NULL,
ADD COLUMN     "trainingFrom" INTEGER NOT NULL,
ADD COLUMN     "trainingTo" INTEGER NOT NULL;
