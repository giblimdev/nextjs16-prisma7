// @/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROUTE_PERMISSIONS: Record<string, string[]> = {
  "/admin": ["ADMIN"],
  "/dev": ["DEV", "ADMIN"],
  "/vendor": ["VENDOR", "ADMIN"],
  "/client": ["CLIENT", "VENDOR", "ADMIN"],
  "/user": ["USER", "CLIENT", "VENDOR", "ADMIN"],
};

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("🔍 ========================================");
  console.log("🔍 MIDDLEWARE START:", pathname);
  console.log("🔍 ========================================");

  // ✅ Routes publiques EXACTES (pas de startsWith sur "/")
  const publicRoutes = ["/auth/signin", "/auth/register", "/auth/unauthorized"];
  
  // Vérifier si c'est la page d'accueil exactement
  const isHomePage = pathname === "/";
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isApiAuth = pathname.startsWith("/api/auth");
  const isNextStatic = pathname.startsWith("/_next");
  const isFavicon = pathname.startsWith("/favicon");

  console.log("📍 Route info:");
  console.log("  - pathname:", pathname);
  console.log("  - isHomePage:", isHomePage);
  console.log("  - isPublicRoute:", isPublicRoute);
  console.log("  - isApiAuth:", isApiAuth);
  console.log("  - isNextStatic:", isNextStatic);
  console.log("  - isFavicon:", isFavicon);

  if (isHomePage || isPublicRoute || isApiAuth || isNextStatic || isFavicon) {
    console.log("✅ Route publique ou statique - PASS");
    console.log("🔍 ========================================\n");
    return NextResponse.next();
  }

  // Vérifier si la route nécessite une protection
  const matchedRoute = Object.entries(ROUTE_PERMISSIONS).find(([route]) =>
    pathname.startsWith(route)
  );

  console.log("🔐 Protection check:");
  console.log("  - matchedRoute:", matchedRoute?.[0] || "NONE");
  console.log("  - requiredRoles:", matchedRoute?.[1] || "NONE");

  const requiredRoles = matchedRoute?.[1];

  if (!requiredRoles) {
    console.log("✅ Route non protégée - PASS");
    console.log("🔍 ========================================\n");
    return NextResponse.next();
  }

  console.log("🛡️  ROUTE PROTÉGÉE DÉTECTÉE - Vérification auth...");

  try {
    // Récupérer la session depuis le cookie Better Auth
    const sessionToken = request.cookies.get("better-auth.session_token");

    console.log("🍪 Cookie check:");
    console.log("  - sessionToken exists:", !!sessionToken);
    if (sessionToken) {
      console.log("  - sessionToken preview:", sessionToken.value.substring(0, 20) + "...");
    }

    if (!sessionToken) {
      console.log("❌ PAS DE TOKEN - Redirection vers /auth/signin");
      console.log("🔍 ========================================\n");
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Appeler l'API Better Auth pour valider la session
    const baseURL = process.env.BETTER_AUTH_URL || request.nextUrl.origin;
    const sessionApiUrl = `${baseURL}/api/auth/get-session`;
    
    console.log("🌐 API Call:");
    console.log("  - baseURL:", baseURL);
    console.log("  - sessionApiUrl:", sessionApiUrl);

    const sessionResponse = await fetch(sessionApiUrl, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      cache: 'no-store',
    });

    console.log("📡 API Response:");
    console.log("  - status:", sessionResponse.status);
    console.log("  - ok:", sessionResponse.ok);

    if (!sessionResponse.ok) {
      console.log("❌ SESSION INVALIDE - Redirection vers /auth/signin");
      console.log("🔍 ========================================\n");
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const sessionData = await sessionResponse.json();
    const user = sessionData?.user;

    console.log("👤 User data:");
    console.log("  - user exists:", !!user);
    if (user) {
      console.log("  - user.id:", user.id);
      console.log("  - user.email:", user.email);
      console.log("  - user.roles:", user.roles);
    }

    if (!user) {
      console.log("❌ PAS D'UTILISATEUR - Redirection vers /auth/signin");
      console.log("🔍 ========================================\n");
      const loginUrl = new URL("/auth/signin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRoles = (user.roles as string[]) || [];
    const hasPermission = requiredRoles.some((role) =>
      userRoles.includes(role)
    );

    console.log("🔑 Permission check:");
    console.log("  - userRoles:", userRoles);
    console.log("  - requiredRoles:", requiredRoles);
    console.log("  - hasPermission:", hasPermission);

    if (!hasPermission) {
      console.log("❌ ACCÈS REFUSÉ - Redirection vers /auth/unauthorized");
      console.log(`🚫 ${user.email} (${userRoles.join(", ")}) → ${pathname}`);
      console.log("🔍 ========================================\n");
      return NextResponse.redirect(new URL("/auth/unauthorized", request.url));
    }

    console.log("✅ ACCÈS AUTORISÉ");
    console.log(`✅ ${user.email} (${userRoles.join(", ")}) → ${pathname}`);

    // Ajouter les rôles dans les headers
    const response = NextResponse.next();
    response.headers.set("x-user-roles", userRoles.join(","));
    response.headers.set("x-user-id", user.id);
    response.headers.set("x-user-email", user.email);

    console.log("🔍 ========================================\n");
    return response;
  } catch (error) {
    console.error("❌ ERREUR MIDDLEWARE:", error);
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");
    console.log("🔍 ========================================\n");
    
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
