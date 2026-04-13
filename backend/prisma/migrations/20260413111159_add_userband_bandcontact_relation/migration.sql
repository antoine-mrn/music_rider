/*
  Warnings:

  - A unique constraint covering the columns `[bandContactId]` on the table `UserBand` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserBand" ADD COLUMN     "bandContactId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "UserBand_bandContactId_key" ON "UserBand"("bandContactId");

-- AddForeignKey
ALTER TABLE "UserBand" ADD CONSTRAINT "UserBand_bandContactId_fkey" FOREIGN KEY ("bandContactId") REFERENCES "BandContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
