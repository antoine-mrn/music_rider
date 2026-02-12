/*
  Warnings:

  - You are about to alter the column `title` on the `TechnicalRider` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE "TechnicalRider" ALTER COLUMN "title" SET DATA TYPE VARCHAR(150);
