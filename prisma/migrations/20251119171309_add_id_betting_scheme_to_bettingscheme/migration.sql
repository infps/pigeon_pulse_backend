/*
  Warnings:

  - A unique constraint covering the columns `[id_betting_scheme]` on the table `BettingScheme` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_betting_scheme` to the `BettingScheme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BettingScheme" ADD COLUMN     "id_betting_scheme" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BettingScheme_id_betting_scheme_key" ON "public"."BettingScheme"("id_betting_scheme");
