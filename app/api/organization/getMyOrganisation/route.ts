// @/app/api/organizations/my/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Récupérer TOUTES les organisations de l'utilisateur
    const organizations = await prisma.organization.findMany({
      where: {
        users: {
          some: {
            id: session.user.id,
          },
        },
      },
      include: {
        teams: {
          orderBy: { order: "asc" },
        },
        products: {
          where: { isActive: true },
          take: 5,
          orderBy: { createdAt: "desc" },
        },
        categories: {
          orderBy: { sortOrder: "asc" },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            roles: true,
          },
        },
        _count: {
          select: {
            clients: true,
            products: true,
            teams: true,
            users: true,
            categories: true,
            tags: true,
          },
        },
      },
      orderBy: {
        order: "asc", // Trier par ordre d'affichage
      },
    });

    // Retourner un tableau (même vide)
    return NextResponse.json(
      {
        organizations,
        count: organizations.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des organisations:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des organisations" },
      { status: 500 }
    );
  }
}
