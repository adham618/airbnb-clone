import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

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
  roomCount: faker.number.int({ min: 1, max: 5 }),
  bathroomCount: faker.number.int({ min: 1, max: 3 }),
  guestCount: faker.number.int({ min: 1, max: 3 }),
  location: faker.location.countryCode("alpha-2"),
  price: faker.number.int({ min: 100, max: 500 }),
  userId: "646a9ee0f044d6b8f2074126",
});

async function main() {
  // eslint-disable-next-line no-console
  console.log("Seeding...");
  const users = Array.from({ length: 400 }, fakerListing);
  await prisma.listing.createMany({
    data: users,
  });
  // eslint-disable-next-line no-console
  console.log("Seeded!");
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
