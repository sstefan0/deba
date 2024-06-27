-- CreateTable
CREATE TABLE "TourismPotential" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "potentialTypeId" TEXT NOT NULL,

    CONSTRAINT "TourismPotential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "tourismPotentialId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "docURL" TEXT NOT NULL,
    "tourismPotentialId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoCoordinates" (
    "id" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "tourismPotentialId" TEXT NOT NULL,

    CONSTRAINT "GeoCoordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoMaterials" (
    "id" TEXT NOT NULL,
    "videoURL" TEXT NOT NULL,
    "tourismPotentialId" TEXT NOT NULL,

    CONSTRAINT "VideoMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotentialType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "iconURL" TEXT NOT NULL,

    CONSTRAINT "PotentialType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourismPotential" ADD CONSTRAINT "TourismPotential_potentialTypeId_fkey" FOREIGN KEY ("potentialTypeId") REFERENCES "PotentialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourismPotential" ADD CONSTRAINT "TourismPotential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoCoordinates" ADD CONSTRAINT "GeoCoordinates_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoMaterials" ADD CONSTRAINT "VideoMaterials_tourismPotentialId_fkey" FOREIGN KEY ("tourismPotentialId") REFERENCES "TourismPotential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
