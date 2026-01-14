// @/app/api/admin/users/[id]/roles/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// Ajouter un rôle
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { role } = body;

    // Vérifier que le rôle est valide
    const validRoles = ["ADMIN", "DEV", "VENDOR", "CLIENT", "USER"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Rôle invalide" },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id },
      select: { 
        id: true,
        name: true,
        email: true,
        roles: true 
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier que le rôle n'existe pas déjà
    if (user.roles.includes(role)) {
      return NextResponse.json(
        { error: "L'utilisateur possède déjà ce rôle" },
        { status: 400 }
      );
    }

    // Ajouter le rôle
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        roles: {
          push: role,
        },
      },
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

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur POST /api/admin/users/[id]/roles:", error);
    return NextResponse.json(
      { 
        error: "Erreur serveur", 
        details: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}

// Retirer un rôle
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { role } = body;

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id },
      select: { 
        id: true,
        name: true,
        roles: true 
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier que le rôle existe
    if (!user.roles.includes(role)) {
      return NextResponse.json(
        { error: "L'utilisateur ne possède pas ce rôle" },
        { status: 400 }
      );
    }

    // Vérifier qu'il reste au moins un rôle
    if (user.roles.length === 1) {
      return NextResponse.json(
        { error: "L'utilisateur doit avoir au moins un rôle" },
        { status: 400 }
      );
    }

    // Retirer le rôle
    const newRoles = user.roles.filter(r => r !== role);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        roles: {
          set: newRoles,
        },
      },
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

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur DELETE /api/admin/users/[id]/roles:", error);
    return NextResponse.json(
      { 
        error: "Erreur serveur", 
        details: error instanceof Error ? error.message : "Erreur inconnue" 
      },
      { status: 500 }
    );
  }
}
