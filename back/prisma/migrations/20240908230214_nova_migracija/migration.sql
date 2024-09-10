/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_newsArticleId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_tourismPotentialId_fkey";

-- DropTable
DROP TABLE "Document";
