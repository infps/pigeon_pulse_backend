-- CreateTable
CREATE TABLE "public"."StandardShowPercentage" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "bettingSchemeId" TEXT NOT NULL,

    CONSTRAINT "StandardShowPercentage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."StandardShowPercentage" ADD CONSTRAINT "StandardShowPercentage_bettingSchemeId_fkey" FOREIGN KEY ("bettingSchemeId") REFERENCES "public"."BettingScheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
