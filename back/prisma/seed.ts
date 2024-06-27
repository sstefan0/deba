import { prisma } from "../src/util/prisma-client";
import { Role } from "@prisma/client";
import seedData from "./seed-data.json";

const users = seedData.user.map((user) => ({
  ...user,
  role: user.role == "USER" ? Role.USER : Role.ADMIN,
}));

async function main() {
  const deleteUsers = prisma.user.deleteMany();
  const deleteTypes = prisma.potentialType.deleteMany();

  await deleteUsers;
  await deleteTypes;

  await prisma.user.createMany({ data: users });
  await prisma.potentialType.createMany({ data: seedData.potentialType });
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
