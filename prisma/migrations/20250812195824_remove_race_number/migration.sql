/*
  Warnings:

  - You are about to drop the column `RACE_NUMBER` on the `Race` table. All the data in the column will be lost.
  - Added the required column `locationLat` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationLng` to the `Race` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Race" DROP COLUMN "RACE_NUMBER",
ADD COLUMN     "locationLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "locationLng" DOUBLE PRECISION NOT NULL;
