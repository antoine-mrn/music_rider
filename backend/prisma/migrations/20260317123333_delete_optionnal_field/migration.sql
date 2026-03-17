/*
  Warnings:

  - You are about to drop the column `riderId` on the `TechnicalRiderAudio` table. All the data in the column will be lost.
  - You are about to drop the column `riderId` on the `TechnicalRiderLogistic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[technicalRiderId]` on the table `TechnicalRiderAudio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[technicalRiderId]` on the table `TechnicalRiderLogistic` will be added. If there are existing duplicate values, this will fail.
  - Made the column `technicalRiderId` on table `StageInstrument` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bandId` on table `TechnicalRider` required. This step will fail if there are existing NULL values in that column.
  - Made the column `riderCategoryId` on table `TechnicalRider` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `technicalRiderId` to the `TechnicalRiderAudio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalRiderId` to the `TechnicalRiderLogistic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StageInstrument" DROP CONSTRAINT "StageInstrument_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRider" DROP CONSTRAINT "TechnicalRider_bandId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRider" DROP CONSTRAINT "TechnicalRider_riderCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderAudio" DROP CONSTRAINT "TechnicalRiderAudio_riderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderLogistic" DROP CONSTRAINT "TechnicalRiderLogistic_riderId_fkey";

-- DropIndex
DROP INDEX "TechnicalRiderAudio_riderId_key";

-- DropIndex
DROP INDEX "TechnicalRiderLogistic_riderId_key";

-- AlterTable
ALTER TABLE "StageInstrument" ALTER COLUMN "technicalRiderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TechnicalRider" ALTER COLUMN "bandId" SET NOT NULL,
ALTER COLUMN "riderCategoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TechnicalRiderAudio" DROP COLUMN "riderId",
ADD COLUMN     "technicalRiderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TechnicalRiderLogistic" DROP COLUMN "riderId",
ADD COLUMN     "technicalRiderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderAudio_technicalRiderId_key" ON "TechnicalRiderAudio"("technicalRiderId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderLogistic_technicalRiderId_key" ON "TechnicalRiderLogistic"("technicalRiderId");

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_riderCategoryId_fkey" FOREIGN KEY ("riderCategoryId") REFERENCES "RiderCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderAudio" ADD CONSTRAINT "TechnicalRiderAudio_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderLogistic" ADD CONSTRAINT "TechnicalRiderLogistic_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageInstrument" ADD CONSTRAINT "StageInstrument_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
