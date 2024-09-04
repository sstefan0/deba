-- DropForeignKey
ALTER TABLE "TourismPotential" DROP CONSTRAINT "TourismPotential_potentialTypeId_fkey";

-- AddForeignKey
ALTER TABLE "TourismPotential" ADD CONSTRAINT "TourismPotential_potentialTypeId_fkey" FOREIGN KEY ("potentialTypeId") REFERENCES "PotentialType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
