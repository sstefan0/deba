-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_newsArticleId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_tourismPotentialId_fkey";

-- DropForeignKey
ALTER TABLE "GeoCoordinates" DROP CONSTRAINT "GeoCoordinates_tourismPotentialId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_newsArticleId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_tourismPotentialId_fkey";

-- DropForeignKey
ALTER TABLE "VideoMaterials" DROP CONSTRAINT "VideoMaterials_tourismPotentialId_fkey";

-- AlterTable
ALTER TABLE "NewsArticle" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_newsArticleId_fkey" FOREIGN KEY ("newsArticleId") REFERENCES "NewsArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_newsArticleId_fkey" FOREIGN KEY ("newsArticleId") REFERENCES "NewsArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoCoordinates" ADD CONSTRAINT "GeoCoordinates_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoMaterials" ADD CONSTRAINT "VideoMaterials_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE CASCADE ON UPDATE CASCADE;
