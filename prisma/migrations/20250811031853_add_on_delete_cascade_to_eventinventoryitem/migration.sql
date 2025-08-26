-- DropForeignKey
ALTER TABLE "public"."EventInventoryItem" DROP CONSTRAINT "EventInventoryItem_eventInventoryId_fkey";

-- AddForeignKey
ALTER TABLE "public"."EventInventoryItem" ADD CONSTRAINT "EventInventoryItem_eventInventoryId_fkey" FOREIGN KEY ("eventInventoryId") REFERENCES "public"."EventInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
