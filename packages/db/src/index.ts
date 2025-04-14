import { PrismaClient } from "../generated/client";


const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// export const createPool = () => {
//   return new PrismaClient({
//     datasources: {
//       db: {
//         url: `${process.env.DATABASE_URL}&connection_limit=20`,
//       },
//     },
//   });
// };

export * from "../generated/client";
