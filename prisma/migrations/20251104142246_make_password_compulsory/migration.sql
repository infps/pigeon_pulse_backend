/*
  Warnings:

  - Made the column `password` on table `OrganizerData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."OrganizerData" ALTER COLUMN "password" SET NOT NULL;
