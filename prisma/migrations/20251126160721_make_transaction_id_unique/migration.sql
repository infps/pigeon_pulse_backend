/*
  Warnings:

  - A unique constraint covering the columns `[TRANSACTION_ID]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payments_TRANSACTION_ID_key" ON "Payments"("TRANSACTION_ID");
