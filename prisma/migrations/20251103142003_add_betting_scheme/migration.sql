-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "bettingSchemeId" TEXT;

-- CreateTable
CREATE TABLE "public"."BettingScheme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cut_percent" DOUBLE PRECISION,
    "belgianShow1" DOUBLE PRECISION,
    "belgianShow2" DOUBLE PRECISION,
    "belgianShow3" DOUBLE PRECISION,
    "belgianShow4" DOUBLE PRECISION,
    "belgianShow5" DOUBLE PRECISION,
    "belgianShow6" DOUBLE PRECISION,
    "belgianShow7" DOUBLE PRECISION,
    "standardShow1" DOUBLE PRECISION,
    "standardShow2" DOUBLE PRECISION,
    "standardShow3" DOUBLE PRECISION,
    "standardShow4" DOUBLE PRECISION,
    "standardShow5" DOUBLE PRECISION,
    "standardShow6" DOUBLE PRECISION,
    "wta_1" DOUBLE PRECISION,
    "wta_2" DOUBLE PRECISION,
    "wta_3" DOUBLE PRECISION,
    "wta_4" DOUBLE PRECISION,
    "wta_5" DOUBLE PRECISION,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "BettingScheme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."BettingScheme" ADD CONSTRAINT "BettingScheme_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_bettingSchemeId_fkey" FOREIGN KEY ("bettingSchemeId") REFERENCES "public"."BettingScheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
