/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

const fakerListing = () => ({
  title: faker.lorem.words(3),
  description: faker.lorem.paragraph(3),
  image: faker.image.urlLoremFlickr({ category: "house" }),
  category: faker.helpers.arrayElement([
    "Beach",
    "Windmills",
    "Modern",
    "Countryside",
    "Pools",
    "Islands",
    "Lake",
    "Skiing",
    "Castles",
  ]),
  roomCount: faker.number.int({ min: 1, max: 10 }),
  bathroomCount: faker.number.int({ min: 1, max: 10 }),
  guestCount: faker.number.int({ min: 1, max: 10 }),
  location: faker.location.countryCode("alpha-2"),
  price: faker.number.int({ min: 100, max: 500 }),
  userId: "646287e4f32a55c0d9f3efcd",
});

async function main() {
  console.log("Seeding...");
  const users = Array.from({ length: 400 }, fakerListing);
  await prisma.listing.createMany({
    data: users,
  });
  console.log("Seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
