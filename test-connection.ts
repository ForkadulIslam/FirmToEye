// testCreateCampaign.ts
import { PrismaClient, UserType } from '@prisma/client';
import { differenceInDays } from 'date-fns';

const prisma = new PrismaClient();
prisma.$connect().then(console.log).catch(console.log);
async function createCampaign() {


  const newUser = await prisma.user.create({
    data: {
      userType:UserType.ADMIN,
      userName:"Admin",
      email: "admin@example.com",
      phone:"01737064777",
      password: "securepassword",
    },
  });
}
async function createDemoInstitution() {
  

}

createDemoInstitution()
.catch(e => console.error(e))
.finally(async () => {
  await prisma.$disconnect();
});
