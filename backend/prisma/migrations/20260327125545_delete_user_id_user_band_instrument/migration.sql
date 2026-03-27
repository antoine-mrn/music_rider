/*
  Warnings:

  - The primary key for the `UserBandInstrument` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bandId` on the `UserBandInstrument` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserBandInstrument` table. All the data in the column will be lost.
  - Added the required column `userBandId` to the `UserBandInstrument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserBandInstrument" DROP CONSTRAINT "UserBandInstrument_userId_bandId_fkey";

-- AlterTable
ALTER TABLE "UserBandInstrument" DROP CONSTRAINT "UserBandInstrument_pkey",
DROP COLUMN "bandId",
DROP COLUMN "userId",
ADD COLUMN     "userBandId" INTEGER NOT NULL,
ADD CONSTRAINT "UserBandInstrument_pkey" PRIMARY KEY ("userBandId", "instrumentId");

-- AddForeignKey
ALTER TABLE "UserBandInstrument" ADD CONSTRAINT "UserBandInstrument_userBandId_fkey" FOREIGN KEY ("userBandId") REFERENCES "UserBand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
