/*
  Warnings:

  - A unique constraint covering the columns `[id_fee_schema]` on the table `FeeSchema` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_perch_fee_item]` on the table `PerchFeeItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_fee_schema` to the `FeeSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_perch_fee_item` to the `PerchFeeItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."FeeSchema" ADD COLUMN     "id_fee_schema" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."PerchFeeItem" ADD COLUMN     "id_perch_fee_item" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FeeSchema_id_fee_schema_key" ON "public"."FeeSchema"("id_fee_schema");

-- CreateIndex
CREATE UNIQUE INDEX "PerchFeeItem_id_perch_fee_item_key" ON "public"."PerchFeeItem"("id_perch_fee_item");
