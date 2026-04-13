/*
  Warnings:

  - You are about to drop the column `bandContactId` on the `UserBand` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userBandId]` on the table `BandContact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserBand" DROP CONSTRAINT "UserBand_bandContactId_fkey";

-- DropIndex
DROP INDEX "BandContact_bandId_idx";

-- DropIndex
DROP INDEX "UserBand_bandContactId_key";

-- AlterTable
ALTER TABLE "BandContact" ADD COLUMN     "userBandId" INTEGER;

-- AlterTable
ALTER TABLE "UserBand" DROP COLUMN "bandContactId";

-- CreateIndex
CREATE UNIQUE INDEX "BandContact_userBandId_key" ON "BandContact"("userBandId");

-- AddForeignKey
ALTER TABLE "BandContact" ADD CONSTRAINT "BandContact_userBandId_fkey" FOREIGN KEY ("userBandId") REFERENCES "UserBand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
