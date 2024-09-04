-- DropForeignKey
ALTER TABLE "TourismPotential" DROP CONSTRAINT "TourismPotential_userId_fkey";

-- AddForeignKey
ALTER TABLE "TourismPotential" ADD CONSTRAINT "TourismPotential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
