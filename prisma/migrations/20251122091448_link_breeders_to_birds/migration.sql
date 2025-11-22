-- AlterTable
ALTER TABLE "Birds" ADD COLUMN     "breederId" INTEGER;

-- AddForeignKey
ALTER TABLE "Birds" ADD CONSTRAINT "Birds_breederId_fkey" FOREIGN KEY ("breederId") REFERENCES "Breeders"("ID_BREEDER") ON DELETE SET NULL ON UPDATE CASCADE;
