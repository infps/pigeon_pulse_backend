-- DropForeignKey
ALTER TABLE "public"."BettingScheme" DROP CONSTRAINT "BettingScheme_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."FeeSchema" DROP CONSTRAINT "FeeSchema_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."PrizeSchema" DROP CONSTRAINT "PrizeSchema_createdById_fkey";

-- AddForeignKey
ALTER TABLE "public"."FeeSchema" ADD CONSTRAINT "FeeSchema_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."OrganizerData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrizeSchema" ADD CONSTRAINT "PrizeSchema_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."OrganizerData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BettingScheme" ADD CONSTRAINT "BettingScheme_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."OrganizerData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
