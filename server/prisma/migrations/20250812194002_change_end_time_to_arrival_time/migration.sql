/*
  Warnings:

  - You are about to drop the column `endTime` on the `Race` table. All the data in the column will be lost.
  - Added the required column `arrivalDate` to the `Race` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Race" DROP COLUMN "endTime",
ADD COLUMN     "arrivalDate" TIMESTAMP(3) NOT NULL;
