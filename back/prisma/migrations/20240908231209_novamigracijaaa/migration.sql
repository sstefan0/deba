-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "docURL" TEXT NOT NULL,
    "tourismPotentialId" TEXT,
    "newsArticleId" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_newsArticleId_fkey" FOREIGN KEY ("newsArticleId") REFERENCES "NewsArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
