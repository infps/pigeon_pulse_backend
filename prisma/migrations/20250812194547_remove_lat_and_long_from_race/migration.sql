/*
  Warnings:

  - You are about to drop the column `locationLat` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the column `locationLng` on the `Race` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Race" DROP COLUMN "locationLat",
DROP COLUMN "locationLng";
