/**
 * src/lib/db.ts
 * Prisma Client (singleton) para evitar múltiples conexiones en desarrollo.
 * Usado por endpoints API para leer/escribir en Neon.
 */

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
