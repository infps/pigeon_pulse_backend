/*
  Warnings:

  - The `status` column on the `OrganizerData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."OrganizerData" DROP COLUMN "status",
ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'ACTIVE';
