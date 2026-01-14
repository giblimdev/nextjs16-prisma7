// @/app/api/organization/creat/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { UserRole } from "@/lib/generated/prisma/client";

export async function POST(request: NextRequest) {
  try {
    // 1. Récupérer la session de l'utilisateur connecté
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // 2. Récupérer les données du formulaire
    const body = await request.json();
    const {
      name,
      address,
      city,
      postalCode,
      country,
      phone,
      email,
      website,
      logo,
      order,
    } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Le nom de l'organisation est requis" },
        { status: 400 }
      );
    }

    // 3. Récupérer l'utilisateur actuel pour vérifier ses rôles
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { roles: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // 4. Ajouter le rôle VENDOR s'il ne l'a pas déjà (avec typage correct)
    const updatedRoles: UserRole[] = currentUser.roles.includes(UserRole.VENDOR)
      ? currentUser.roles
      : [...currentUser.roles, UserRole.VENDOR];

    // 5. Utiliser une transaction pour créer l'organisation ET mettre à jour les rôles
    const result = await prisma.$transaction(async (tx) => {
      // Créer l'organisation
      const organization = await tx.organization.create({
        data: {
          name,
          address: address || null,
          city: city || null,
          postalCode: postalCode || null,
          country: country || "France",
          phone: phone || null,
          email: email || null,
          website: website || null,
          logo: logo || null,
          order: order || 1,
          users: {
            connect: { id: session.user.id },
          },
        },
        include: {
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
            },
          },
        },
      });

      // Mettre à jour les rôles de l'utilisateur
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          roles: updatedRoles,
        },
      });

      return organization;
    });

    return NextResponse.json(
      {
        message: "Organisation créée avec succès",
        organization: result,
        roleAdded: !currentUser.roles.includes(UserRole.VENDOR),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'organisation:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de l'organisation" },
      { status: 500 }
    );
  }
}
