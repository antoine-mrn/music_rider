-- DropForeignKey
ALTER TABLE "BandContact" DROP CONSTRAINT "BandContact_bandId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRider" DROP CONSTRAINT "TechnicalRider_bandId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderAudio" DROP CONSTRAINT "TechnicalRiderAudio_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderGeneral" DROP CONSTRAINT "TechnicalRiderGeneral_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "TechnicalRiderStage" DROP CONSTRAINT "TechnicalRiderStage_technicalRiderId_fkey";

-- DropForeignKey
ALTER TABLE "UserBand" DROP CONSTRAINT "UserBand_bandId_fkey";

-- AddForeignKey
ALTER TABLE "UserBand" ADD CONSTRAINT "UserBand_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderGeneral" ADD CONSTRAINT "TechnicalRiderGeneral_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderStage" ADD CONSTRAINT "TechnicalRiderStage_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderAudio" ADD CONSTRAINT "TechnicalRiderAudio_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandContact" ADD CONSTRAINT "BandContact_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;
