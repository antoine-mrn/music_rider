/*
  Warnings:

  - Made the column `title` on table `TechnicalRider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TechnicalRider" ALTER COLUMN "title" SET NOT NULL;
