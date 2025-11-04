/*
  Warnings:

  - Added the required column `createdById` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BettingScheme" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."BettingScheme" ADD CONSTRAINT "BettingScheme_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
