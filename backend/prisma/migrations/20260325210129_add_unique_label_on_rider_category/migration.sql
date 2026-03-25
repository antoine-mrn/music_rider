/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `RiderCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RiderCategory_label_key" ON "RiderCategory"("label");
