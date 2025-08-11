/*
  Warnings:

  - Made the column `feeSchemaId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_feeSchemaId_fkey";

-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "feeSchemaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_feeSchemaId_fkey" FOREIGN KEY ("feeSchemaId") REFERENCES "public"."FeeSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
