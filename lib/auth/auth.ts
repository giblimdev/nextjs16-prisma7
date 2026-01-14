// @/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  // Adaptateur Prisma 7 (connecté à ta base via PrismaPg)
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  // Configuration des utilisateurs avec champs additionnels
  user: {
    additionalFields: {
      roles: {
        type: "string[]",
        defaultValue: ["USER"],
        required: true,
        input: false, // Ne pas permettre la modification directe à la création
      },
    },
  },

  // Active la stratégie credentials (email + password)
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
  },

  // Configuration de sécurité
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,

  // Configuration des cookies/session
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // Mise à jour toutes les 24h
  },

  cookies: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },

  // Logging
  logger: {
    level: process.env.NODE_ENV === "production" ? "error" : "info",
  },
});

// Export du type pour TypeScript
export type Session = typeof auth.$Infer.Session;
