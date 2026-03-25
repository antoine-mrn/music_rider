-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "BandRole" AS ENUM ('LEADER', 'MEMBER');

-- CreateEnum
CREATE TYPE "TechnicalContactRole" AS ENUM ('SOUND_ENGINEER', 'LIGHT_ENGINEER');

-- CreateEnum
CREATE TYPE "RiderStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ContactRole" AS ENUM ('MEMBER', 'MANAGER', 'BOOKING', 'TOUR_MANAGER', 'LABEL', 'OTHER', 'UNKNOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" VARCHAR(110) NOT NULL,
    "lastname" VARCHAR(110) NOT NULL,
    "phone" VARCHAR(20),
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatarId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Band" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(110) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "musicStyleId" INTEGER,

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "bucket" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBand" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "bandId" INTEGER NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "role" "BandRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBandInstrument" (
    "userId" INTEGER NOT NULL,
    "bandId" INTEGER NOT NULL,
    "instrumentId" INTEGER NOT NULL,

    CONSTRAINT "UserBandInstrument_pkey" PRIMARY KEY ("userId","bandId","instrumentId")
);

-- CreateTable
CREATE TABLE "MusicStyle" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(45) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MusicStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalRider" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "status" "RiderStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bandId" INTEGER NOT NULL,
    "riderCategoryId" INTEGER NOT NULL,

    CONSTRAINT "TechnicalRider_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "TechnicalRiderContact" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "role" "TechnicalContactRole" NOT NULL,
    "technicalRiderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechnicalRiderContact_pkey" PRIMARY KEY ("id")
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
    "technicalRiderId" INTEGER NOT NULL,

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
    "technicalRiderId" INTEGER NOT NULL,

    CONSTRAINT "TechnicalRiderLogistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiderCategory" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(45) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiderCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BandContact" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "contactRole" "ContactRole" NOT NULL DEFAULT 'UNKNOWN',
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bandId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "BandContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstrumentCategory" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(110) NOT NULL,
    "label" VARCHAR(110) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstrumentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instrument" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(110) NOT NULL,
    "label" VARCHAR(110) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instrumentCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Instrument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageInstrument" (
    "id" SERIAL NOT NULL,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,
    "scale" INTEGER NOT NULL,
    "rotation" INTEGER NOT NULL,
    "zIndex" INTEGER,
    "label" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "technicalRiderId" INTEGER NOT NULL,
    "instrumentId" INTEGER,

    CONSTRAINT "StageInstrument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarId_key" ON "User"("avatarId");

-- CreateIndex
CREATE INDEX "AuthSession_userId_idx" ON "AuthSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Band_label_key" ON "Band"("label");

-- CreateIndex
CREATE UNIQUE INDEX "UserBand_userId_bandId_key" ON "UserBand"("userId", "bandId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicStyle_label_key" ON "MusicStyle"("label");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderGeneral_technicalRiderId_key" ON "TechnicalRiderGeneral"("technicalRiderId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderContact_technicalRiderId_key" ON "TechnicalRiderContact"("technicalRiderId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderStage_technicalRiderId_key" ON "TechnicalRiderStage"("technicalRiderId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderAudio_technicalRiderId_key" ON "TechnicalRiderAudio"("technicalRiderId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalRiderLogistic_technicalRiderId_key" ON "TechnicalRiderLogistic"("technicalRiderId");

-- CreateIndex
CREATE INDEX "BandContact_bandId_idx" ON "BandContact"("bandId");

-- CreateIndex
CREATE UNIQUE INDEX "InstrumentCategory_code_key" ON "InstrumentCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_code_key" ON "Instrument"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Band" ADD CONSTRAINT "Band_musicStyleId_fkey" FOREIGN KEY ("musicStyleId") REFERENCES "MusicStyle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBand" ADD CONSTRAINT "UserBand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBand" ADD CONSTRAINT "UserBand_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBandInstrument" ADD CONSTRAINT "UserBandInstrument_userId_bandId_fkey" FOREIGN KEY ("userId", "bandId") REFERENCES "UserBand"("userId", "bandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBandInstrument" ADD CONSTRAINT "UserBandInstrument_instrumentId_fkey" FOREIGN KEY ("instrumentId") REFERENCES "Instrument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_riderCategoryId_fkey" FOREIGN KEY ("riderCategoryId") REFERENCES "RiderCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_instrumentCategoryId_fkey" FOREIGN KEY ("instrumentCategoryId") REFERENCES "InstrumentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageInstrument" ADD CONSTRAINT "StageInstrument_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageInstrument" ADD CONSTRAINT "StageInstrument_instrumentId_fkey" FOREIGN KEY ("instrumentId") REFERENCES "Instrument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
