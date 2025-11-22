/*
  Warnings:

  - The primary key for the `OrganizerData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "CREATOR_ID" INTEGER;

-- AlterTable
ALTER TABLE "OrganizerData" DROP CONSTRAINT "OrganizerData_pkey",
ADD COLUMN     "ID" SERIAL NOT NULL,
ADD CONSTRAINT "OrganizerData_pkey" PRIMARY KEY ("ID");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_CREATOR_ID_fkey" FOREIGN KEY ("CREATOR_ID") REFERENCES "OrganizerData"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
