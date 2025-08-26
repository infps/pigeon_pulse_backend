/*
  Warnings:

  - Added the required column `breederId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "breederId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
