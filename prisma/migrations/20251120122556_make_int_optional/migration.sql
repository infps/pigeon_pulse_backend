-- AlterTable
ALTER TABLE "public"."BettingScheme" ALTER COLUMN "id_betting_scheme" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."FeeSchema" ALTER COLUMN "id_fee_schema" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."PerchFeeItem" ALTER COLUMN "id_perch_fee_item" DROP NOT NULL;
