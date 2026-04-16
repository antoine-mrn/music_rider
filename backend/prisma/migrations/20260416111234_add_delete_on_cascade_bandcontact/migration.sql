-- DropForeignKey
ALTER TABLE "BandContact" DROP CONSTRAINT "BandContact_userBandId_fkey";

-- AddForeignKey
ALTER TABLE "BandContact" ADD CONSTRAINT "BandContact_userBandId_fkey" FOREIGN KEY ("userBandId") REFERENCES "UserBand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
