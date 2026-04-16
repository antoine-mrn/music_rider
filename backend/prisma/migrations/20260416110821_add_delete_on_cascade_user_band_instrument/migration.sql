-- DropForeignKey
ALTER TABLE "UserBandInstrument" DROP CONSTRAINT "UserBandInstrument_userBandId_fkey";

-- AddForeignKey
ALTER TABLE "UserBandInstrument" ADD CONSTRAINT "UserBandInstrument_userBandId_fkey" FOREIGN KEY ("userBandId") REFERENCES "UserBand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
