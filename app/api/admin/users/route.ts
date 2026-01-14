// @/app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Récupérer tous les utilisateurs
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        roles: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur GET /api/admin/users:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des utilisateurs", details: error },
      { status: 500 }
    );
  }
}
