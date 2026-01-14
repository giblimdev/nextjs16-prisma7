// @/app/api/loyalty/getMyCard/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Récupérer la carte de fidélité de l'utilisateur
    const fidelity = await prisma.fidelity.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        xpPoints: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!fidelity) {
      return NextResponse.json(
        { error: "Aucune carte de fidélité trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        fidelity,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur récupération carte de fidélité:", error);
    
    return NextResponse.json(
      { 
        error: "Erreur lors de la récupération de la carte",
        details: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    );
  }
}
