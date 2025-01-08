const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("gangu123", 10); 

  const admin = await prisma.user.upsert({
    where: { email: "gangu@foodorderapp.com" },
    update: {},
    create: {
      name: "Admin",
      email: "gangu@foodorderapp.com",
      password: adminPassword,
      confirmPassword: adminPassword,
      role: "admin",
    },
  });

  console.log("Admin created: ", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });