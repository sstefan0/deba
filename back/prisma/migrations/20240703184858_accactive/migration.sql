/*
  Warnings:

  - Added the required column `x` to the `TourismPotential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `TourismPotential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TourismPotential" ADD COLUMN     "webSite" TEXT,
ADD COLUMN     "x" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
