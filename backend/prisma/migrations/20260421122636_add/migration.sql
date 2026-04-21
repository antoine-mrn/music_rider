/*
  Warnings:

  - You are about to drop the `TechnicalRiderContact` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TechnicalStaffRole" AS ENUM ('SOUND_ENGINEER', 'LIGHT_ENGINEER');

-- DropForeignKey
ALTER TABLE "TechnicalRiderContact" DROP CONSTRAINT "TechnicalRiderContact_technicalRiderId_fkey";

-- AlterTable
ALTER TABLE "TechnicalRider" ADD COLUMN     "bandContactId" INTEGER;

-- DropTable
DROP TABLE "TechnicalRiderContact";

-- DropEnum
DROP TYPE "TechnicalContactRole";

-- CreateTable
CREATE TABLE "TechnicalRiderStaff" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "role" "TechnicalStaffRole" NOT NULL,
    "technicalRiderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechnicalRiderStaff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechnicalRider" ADD CONSTRAINT "TechnicalRider_bandContactId_fkey" FOREIGN KEY ("bandContactId") REFERENCES "BandContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalRiderStaff" ADD CONSTRAINT "TechnicalRiderStaff_technicalRiderId_fkey" FOREIGN KEY ("technicalRiderId") REFERENCES "TechnicalRider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
