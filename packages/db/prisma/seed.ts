import db from "../src";
import { seedsData } from "./seed-data";

async function main() {
  const hashID: string[] = [];
  for (const seed of seedsData) {
    if (!hashID.includes(seed.externalId)) {
      try {
        const alreadyExists = await db.user.findUnique({
          where: {
            externalId: seed.externalId,
          },
        });
        if (!alreadyExists) {
          const track = await db.user.create({
            data: seed,
          });
        }
        hashID.push(seed.externalId);
      } catch (error) {
        console.log("Error in seeding data:", error);
      }
    }
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
