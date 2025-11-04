/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OrganizerData` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `OrganizerData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."OrganizerData" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrganizerData_email_key" ON "public"."OrganizerData"("email");
