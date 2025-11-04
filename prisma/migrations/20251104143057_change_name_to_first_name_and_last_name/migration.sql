/*
  Warnings:

  - You are about to drop the column `name` on the `OrganizerData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."OrganizerData" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
