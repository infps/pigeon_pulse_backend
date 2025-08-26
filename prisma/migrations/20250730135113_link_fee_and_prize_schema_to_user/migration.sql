/*
  Warnings:

  - Added the required column `createdById` to the `FeeSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `PrizeSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."FeeSchema" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."PrizeSchema" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."FeeSchema" ADD CONSTRAINT "FeeSchema_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrizeSchema" ADD CONSTRAINT "PrizeSchema_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
