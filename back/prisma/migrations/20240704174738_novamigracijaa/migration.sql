/*
  Warnings:

  - You are about to drop the column `x` on the `TourismPotential` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `TourismPotential` table. All the data in the column will be lost.
  - Added the required column `lat` to the `TourismPotential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `TourismPotential` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_tourismPotentialId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_tourismPotentialId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "newsArticleId" TEXT,
ALTER COLUMN "tourismPotentialId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "newsArticleId" TEXT,
ALTER COLUMN "tourismPotentialId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TourismPotential" DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lon" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "NewsArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_newsArticleId_fkey" FOREIGN KEY ("newsArticleId") REFERENCES "NewsArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_newsArticleId_fkey" FOREIGN KEY ("newsArticleId") REFERENCES "NewsArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsArticle" ADD CONSTRAINT "NewsArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
