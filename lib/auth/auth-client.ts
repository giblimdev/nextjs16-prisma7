//@/lib/auth/auth-client.ts

"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000",
});

// Optionnellement, exporter des méthodes utiles directement :
export const { signIn, signUp, signOut, useSession } = authClient;
