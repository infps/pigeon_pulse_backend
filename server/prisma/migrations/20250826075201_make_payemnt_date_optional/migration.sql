/*
  Warnings:

  - The values [HOTSPOT_FEE_4] on the enum `PaymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PaymentType_new" AS ENUM ('PERCH_FEE', 'ENTRY_FEE', 'HOTSPOT_FEE_1', 'HOTSPOT_FEE_2', 'HOTSPOT_FEE_3', 'FINAL_RACE_FEE', 'OTHER');
ALTER TABLE "public"."Payment" ALTER COLUMN "type" TYPE "public"."PaymentType_new" USING ("type"::text::"public"."PaymentType_new");
ALTER TYPE "public"."PaymentType" RENAME TO "PaymentType_old";
ALTER TYPE "public"."PaymentType_new" RENAME TO "PaymentType";
DROP TYPE "public"."PaymentType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Payment" ALTER COLUMN "paymentDate" DROP NOT NULL,
ALTER COLUMN "paymentDate" DROP DEFAULT;
