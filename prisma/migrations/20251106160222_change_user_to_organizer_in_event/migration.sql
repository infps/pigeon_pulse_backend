-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_creatorId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."OrganizerData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
