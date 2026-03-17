/*
  Warnings:

  - You are about to drop the column `accommodationInfo` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `backlineProvided` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `cateringInfo` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `changeoverDuration` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `consoleChannelCount` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `inputPatch` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `loadInTime` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `loadOutTime` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `micsDisSetup` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `musicianNumber` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `setDuration` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `setupDuration` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `soundLevelRequirements` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `soundcheckDuration` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `specialAudioRequirements` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `specificRisks` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `stageAccess` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `stageDepth` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `stageLength` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `stageMonitoringSetup` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `stageWidth` on the `TechnicalRider` table. All the data in the column will be lost.
  - You are about to drop the column `teardownDuration` on the `TechnicalRider` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RiderStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "TechnicalRider" DROP CONSTRAINT "TechnicalRider_bandId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRider" DROP CONSTRAINT "TechnicalRider_riderCategoryId_fkey";

-- AlterTable
ALTER TABLE "StageInstrument" ADD COLUMN     "color" TEXT,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "zIndex" INTEGER;

-- AlterTable
ALTER TABLE "TechnicalRider" DROP COLUMN "accommodationInfo",
DROP COLUMN "backlineProvided",
DROP COLUMN "cateringInfo",
DROP COLUMN "changeoverDuration",
DROP COLUMN "consoleChannelCount",
DROP COLUMN "inputPatch",
DROP COLUMN "loadInTime",
DROP COLUMN "loadOutTime",
DROP COLUMN "micsDisSetup",
DROP COLUMN "musicianNumber",
DROP COLUMN "setDuration",
DROP COLUMN "setupDuration",
DROP COLUMN "soundLevelRequirements",
DROP COLUMN "soundcheckDuration",
DROP COLUMN "specialAudioRequirements",
DROP COLUMN "specificRisks",
DROP COLUMN "stageAccess",
DROP COLUMN "stageDepth",
DROP COLUMN "stageLength",
DROP COLUMN "stageMonitoringSetup",
DROP COLUMN "stageWidth",
DROP COLUMN "teardownDuration",
ADD COLUMN     "status" "RiderStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "bandId" DROP NOT NULL,
ALTER COLUMN "riderCategoryId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TechnicalRiderGeneral" (
    "id" SERIAL NOT NULL,
    "musicianNumber" INTEGER,
    "setDuration" INTEGER,
    "soundcheckDuration" INTEGER,
    "changeoverDuration" INTEGER,
    "setupDuration" INTEGER,
    "teardownDuration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "technicalRiderId" INTEGER NOT NULL,

    CONSTRAINT "TechnicalRiderGeneral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalRiderStage" (
    "id" SERIAL NOT NULL,
    "stageLength" INTEGER,
    "stageWidth" INTEGER,
    "stageDepth" INTEGER,
    "stageAccess" TEXT,
    "backlineProvided" TEXT,
    "technicalRiderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechnicalRiderStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalRiderAudio" (
    "id" SERIAL NOT NULL,
    "consoleChannelCount" INTEGER,
    "soundLevelRequirements" TEXT,
    "specialAudioRequirements" TEXT,
    "inputPatch" JSONB,
    "stageMonitoringSetup" JSONB,
    "micsDisSetup" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "riderId" INTEGER NOT NULL,

    CONSTRAINT "TechnicalRiderAudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalRiderLogistic" (
    "id" SERIAL NOT NULL,
    "specificRisks" TEXT,
    "loadInTime" TEXT,
    "loadOutTime" TEXT,
    "cateringInfo" TEXT,
    "accommodationInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "riderId" INTEGER NOT NULL,

    CONSTRAINT "TechnicalRiderLogistic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderGeneral_technicalRiderId_key" ON "TechnicalRiderGeneral"("technicalRiderId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderStage_technicalRiderId_key" ON "TechnicalRiderStage"("technicalRiderId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderAudio_riderId_key" ON "TechnicalRiderAudio"("riderId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderLogistic_riderId_key" ON "TechnicalRiderLogistic"("riderId");

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_riderCategoryId_fkey" FOREIGN KEY ("riderCategoryId") REFERENCES "RiderCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderGeneral" ADD CONSTRAINT "TechnicalRiderGeneral_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderStage" ADD CONSTRAINT "TechnicalRiderStage_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderAudio" ADD CONSTRAINT "TechnicalRiderAudio_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderLogistic" ADD CONSTRAINT "TechnicalRiderLogistic_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "TechnicalRider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
