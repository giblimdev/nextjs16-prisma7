import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma"; // ton client Prisma 7 configuré avec PrismaPg

export const auth = betterAuth({
  // Adaptateur Prisma 7 (connecté à ta base via PrismaPg)
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  // Active la stratégie credentials (email + password)
  emailAndPassword: {
    enabled: true,

    // Tu peux configurer des validations custom ici :
    minPasswordLength: 8,
    requireEmailVerification: false, // passe à true si tu veux forcer la vérif email
  },

  // Configuration de sécurité
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,

  // Configuration optionnelle des cookies/session
  cookies: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },

  // (Optionnel) logging
  logger: {
    level: "info",
  },
});
