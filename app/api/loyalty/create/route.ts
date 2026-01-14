// @/app/api/loyalty/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { UserRole } from "@/lib/generated/prisma/client";

export async function POST(req: NextRequest) {
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

    // Vérifier si l'utilisateur a déjà une carte de fidélité
    const existingFidelity = await prisma.fidelity.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingFidelity) {
      return NextResponse.json(
        { error: "Vous avez déjà une carte de fidélité" },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur actuel
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { roles: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    // Vérifier si le rôle CLIENT existe déjà
    const hasClientRole = currentUser.roles.includes(UserRole.CLIENT);
    const updatedRoles: UserRole[] = hasClientRole 
      ? currentUser.roles 
      : [...currentUser.roles, UserRole.CLIENT];

    // Créer la carte de fidélité avec le bonus de bienvenue
    const fidelity = await prisma.fidelity.create({
      data: {
        userId: userId,
        points: 10,
        level: "Bronze",
        lastEarned: new Date(),
        xpPoints: {
          create: {
            amount: 10,
            reason: "Bonus de bienvenue",
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            roles: true,
          },
        },
        xpPoints: true,
      },
    });

    // Ajouter le rôle CLIENT si nécessaire
    if (!hasClientRole) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          roles: {
            set: updatedRoles,
          },
        },
      });
    }

    return NextResponse.json(
      {
        message: "Carte de fidélité créée avec succès",
        fidelity: {
          id: fidelity.id,
          points: fidelity.points,
          level: fidelity.level,
          user: {
            ...fidelity.user,
            roles: updatedRoles,
          },
          xpPointsCount: fidelity.xpPoints.length,
        },
        roleAdded: !hasClientRole,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création carte de fidélité:", error);
    
    return NextResponse.json(
      { 
        error: "Erreur lors de la création de la carte de fidélité",
        details: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    );
  }
}
