/*
  Warnings:

  - The primary key for the `Band` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TechnicalRider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserBandInstrument` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AuthSession" DROP CONSTRAINT "AuthSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "BandContact" DROP CONSTRAINT "BandContact_bandId_fkey";

-- DropForeignKey
ALTER TABLE "BandContact" DROP CONSTRAINT "BandContact_userId_fkey";

-- DropForeignKey
ALTER TABLE "StageInstrument" DROP CONSTRAINT "StageInstrument_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRider" DROP CONSTRAINT "TechnicalRider_bandId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderAudio" DROP CONSTRAINT "TechnicalRiderAudio_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderContact" DROP CONSTRAINT "TechnicalRiderContact_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderGeneral" DROP CONSTRAINT "TechnicalRiderGeneral_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderLogistic" DROP CONSTRAINT "TechnicalRiderLogistic_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderStage" DROP CONSTRAINT "TechnicalRiderStage_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "UserBand" DROP CONSTRAINT "UserBand_bandId_fkey";

-- DropForeignKey
ALTER TABLE "UserBand" DROP CONSTRAINT "UserBand_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBandInstrument" DROP CONSTRAINT "UserBandInstrument_userId_bandId_fkey";

-- AlterTable
ALTER TABLE "AuthSession" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Band" DROP CONSTRAINT "Band_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Band_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Band_id_seq";

-- AlterTable
ALTER TABLE "BandContact" ALTER COLUMN "bandId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StageInstrument" ALTER COLUMN "technicalRiderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TechnicalRider" DROP CONSTRAINT "TechnicalRider_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "bandId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TechnicalRider_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TechnicalRider_id_seq";

-- AlterTable
ALTER TABLE "TechnicalRiderAudio" ALTER COLUMN "technicalRiderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TechnicalRiderContact" ALTER COLUMN "technicalRiderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TechnicalRiderGeneral" ALTER COLUMN "technicalRiderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TechnicalRiderLogistic" ALTER COLUMN "technicalRiderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TechnicalRiderStage" ALTER COLUMN "technicalRiderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserBand" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "bandId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserBandInstrument" DROP CONSTRAINT "UserBandInstrument_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "bandId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserBandInstrument_pkey" PRIMARY KEY ("userId", "bandId", "instrumentId");

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBand" ADD CONSTRAINT "UserBand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBand" ADD CONSTRAINT "UserBand_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBandInstrument" ADD CONSTRAINT "UserBandInstrument_userId_bandId_fkey" FOREIGN KEY ("userId", "bandId") REFERENCES "UserBand"("userId", "bandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderGeneral" ADD CONSTRAINT "TechnicalRiderGeneral_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderContact" ADD CONSTRAINT "TechnicalRiderContact_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderStage" ADD CONSTRAINT "TechnicalRiderStage_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderAudio" ADD CONSTRAINT "TechnicalRiderAudio_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderLogistic" ADD CONSTRAINT "TechnicalRiderLogistic_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandContact" ADD CONSTRAINT "BandContact_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandContact" ADD CONSTRAINT "BandContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageInstrument" ADD CONSTRAINT "StageInstrument_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
