// @/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROUTE_PERMISSIONS: Record<string, string[]> = {
  "/admin": ["ADMIN"],
  "/dev": ["DEV", "ADMIN"],
  "/vendor": ["VENDOR", "ADMIN"],
  "/client": ["CLIENT", "VENDOR", "ADMIN"],
  "/user": ["USER", "CLIENT", "VENDOR", "ADMIN"], // ✅ Tous les utilisateurs authentifiés
};

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Routes publiques
  const publicRoutes = ["/", "/auth/signin", "/auth/register", "/auth/unauthorized"];
  
  if (
    publicRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Vérifier si la route nécessite une protection
  const requiredRoles = Object.entries(ROUTE_PERMISSIONS).find(([route]) =>
    pathname.startsWith(route)
  )?.[1];

  if (!requiredRoles) {
    return NextResponse.next();
  }

  try {
    // Récupérer la session depuis le cookie Better Auth
    const sessionToken = request.cookies.get("better-auth.session_token");

    if (!sessionToken) {
      console.log(`🔒 Non authentifié (pas de token): ${pathname}`);
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Appeler l'API Better Auth pour valider la session
    const baseURL = process.env.BETTER_AUTH_URL || request.nextUrl.origin;
    const sessionResponse = await fetch(`${baseURL}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!sessionResponse.ok) {
      console.log(`🔒 Session invalide: ${pathname}`);
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const { user } = await sessionResponse.json();

    if (!user) {
      console.log(`🔒 Pas d'utilisateur: ${pathname}`);
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRoles = (user.roles as string[]) || [];
    const hasPermission = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    console.log(
      `${hasPermission ? "✅" : "❌"} ${user.email} (${userRoles.join(", ")}) → ${pathname}`
    );

    if (!hasPermission) {
      console.log(`🚫 Accès refusé pour ${user.email} sur ${pathname}`);
      return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
    }

    // Ajouter les rôles dans les headers
    const response = NextResponse.next();
    response.headers.set("x-user-roles", userRoles.join(","));
    response.headers.set("x-user-id", user.id);
    response.headers.set("x-user-email", user.email);

    return response;
  } catch (error) {
    console.error("❌ Erreur proxy:", error);
    const loginUrl = new URL("/auth/signin", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
