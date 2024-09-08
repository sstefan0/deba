import { prisma } from "../src/util/prisma-client";
import { Role } from "@prisma/client";
import seedData from "./seed-data.json";

const users = seedData.user.map((user) => ({
  ...user,
  role: user.role == "USER" ? Role.USER : Role.ADMIN,
}));

async function main() {
  const deleteTypes = prisma.potentialType.deleteMany();
  const deleteUsers = prisma.user.deleteMany();
  const deleteSpots = prisma.tourismPotential.deleteMany();
  const deleteNews = prisma.newsArticle.deleteMany();

  await deleteNews;
  await deleteSpots;
  await deleteTypes;
  await deleteUsers;

  await prisma.user.createMany({ data: users });
  await prisma.potentialType.createMany({ data: seedData.potentialType });
  await prisma.tourismPotential.createMany({ data: seedData.touristSpot });
  await prisma.newsArticle.createMany({ data: seedData.news });
  await prisma.image.createMany({ data: seedData.image });
  await prisma.videoMaterials.createMany({ data: seedData.videos });
  await prisma.geoCoordinates.createMany({ data: seedData.coordinates });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
