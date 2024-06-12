import { PrismaClient } from "./prisma/generated/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.dAppStorePrisma) {
    global.dAppStorePrisma = new PrismaClient();
  }
  prisma = global.dAppStorePrisma;
}

export const dAppStorePrisma = prisma;

