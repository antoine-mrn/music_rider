-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "BandRole" AS ENUM ('LEADER', 'MEMBER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" VARCHAR(110) NOT NULL,
    "lastname" VARCHAR(110) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "UserBand" (
    "userId" INTEGER NOT NULL,
    "bandId" INTEGER NOT NULL,
    "role" "BandRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBand_pkey" PRIMARY KEY ("userId","bandId")
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
    "musicianNumber" INTEGER,
    "setDuration" INTEGER,
    "soundcheckDuration" INTEGER,
    "changeoverDuration" INTEGER,
    "setupDuration" INTEGER,
    "teardownDuration" INTEGER,
    "stageLength" INTEGER,
    "stageWidth" INTEGER,
    "stageDepth" INTEGER,
    "stageAccess" TEXT,
    "backlineProvided" TEXT,
    "specificRisks" TEXT,
    "loadInTime" TEXT,
    "loadOutTime" TEXT,
    "cateringInfo" TEXT,
    "accommodationInfo" TEXT,
    "micsDisSetup" JSONB,
    "stageMonitoringSetup" JSONB,
    "inputPatch" JSONB,
    "soundLevelRequirements" TEXT,
    "specialAudioRequirements" TEXT,
    "consoleChannelCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bandId" INTEGER NOT NULL,
    "riderCategoryId" INTEGER NOT NULL,

    CONSTRAINT "TechnicalRider_pkey" PRIMARY KEY ("id")
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
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bandId" INTEGER NOT NULL,
    "userId" INTEGER,
    "contactRoleId" INTEGER NOT NULL,

    CONSTRAINT "BandContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactRole" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactRole_pkey" PRIMARY KEY ("id")
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "technicalRiderId" INTEGER,
    "instrumentId" INTEGER,

    CONSTRAINT "StageInstrument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Band_label_key" ON "Band"("label");

-- CreateIndex
CREATE INDEX "BandContact_bandId_idx" ON "BandContact"("bandId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactRole_code_key" ON "ContactRole"("code");

-- CreateIndex
CREATE UNIQUE INDEX "InstrumentCategory_code_key" ON "InstrumentCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Instrument_code_key" ON "Instrument"("code");

-- AddForeignKey
ALTER TABLE "Band" ADD CONSTRAINT "Band_musicStyleId_fkey" FOREIGN KEY ("musicStyleId") REFERENCES "MusicStyle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBand" ADD CONSTRAINT "UserBand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBand" ADD CONSTRAINT "UserBand_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_riderCategoryId_fkey" FOREIGN KEY ("riderCategoryId") REFERENCES "RiderCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandContact" ADD CONSTRAINT "BandContact_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandContact" ADD CONSTRAINT "BandContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandContact" ADD CONSTRAINT "BandContact_contactRoleId_fkey" FOREIGN KEY ("contactRoleId") REFERENCES "ContactRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instrument" ADD CONSTRAINT "Instrument_instrumentCategoryId_fkey" FOREIGN KEY ("instrumentCategoryId") REFERENCES "InstrumentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageInstrument" ADD CONSTRAINT "StageInstrument_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageInstrument" ADD CONSTRAINT "StageInstrument_instrumentId_fkey" FOREIGN KEY ("instrumentId") REFERENCES "Instrument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
