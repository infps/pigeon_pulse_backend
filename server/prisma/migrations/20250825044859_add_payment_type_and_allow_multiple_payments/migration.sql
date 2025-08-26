/*
  Warnings:

  - Added the required column `perchFee` to the `FeeSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('PERCH_FEE', 'ENTRY_FEE', 'HOTSPOT_FEE', 'FINAL_RACE_FEE', 'OTHER');

-- DropIndex
DROP INDEX "public"."Payment_eventInventoryId_key";

-- AlterTable
ALTER TABLE "public"."FeeSchema" ADD COLUMN     "perchFee" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "type" "public"."PaymentType" NOT NULL;
