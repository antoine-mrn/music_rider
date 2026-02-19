/*
  Warnings:

  - Added the required column `folder` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "folder" TEXT NOT NULL;
