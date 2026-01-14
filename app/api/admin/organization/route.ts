// @/app/api/admin/organization/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";

// GET - Récupérer toutes les organisations
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Vérifier le rôle ADMIN
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { roles: true },
    });

    if (!user || !user.roles.includes("ADMIN")) {
      return NextResponse.json(
        { error: "Accès refusé - Rôle ADMIN requis" },
        { status: 403 }
      );
    }

    const organizations = await prisma.organization.findMany({
      include: {
        teams: {
          orderBy: { order: "asc" },
        },
        products: {
          where: { isActive: true },
          take: 5,
          orderBy: { createdAt: "desc" },
        },
        categories: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            roles: true,
          },
          take: 1, // Prendre le premier user comme "owner"
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
        order: "asc",
      },
    });

    // Transformer pour ajouter "owner" basé sur le premier user
    const organizationsWithOwner = organizations.map((org) => ({
      ...org,
      owner: org.users[0] || null, // Premier user = owner
    }));

    return NextResponse.json(
      {
        organizations: organizationsWithOwner,
        count: organizations.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des organisations:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle organisation
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Vérifier le rôle ADMIN
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { roles: true },
    });

    if (!user || !user.roles.includes("ADMIN")) {
      return NextResponse.json(
        { error: "Accès refusé - Rôle ADMIN requis" },
        { status: 403 }
      );
    }

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

    // Créer l'organisation et associer l'utilisateur connecté
    const organization = await prisma.organization.create({
      data: {
        name,
        address: address || null,
        city: city || null,
        postalCode: postalCode || null,
        country: country || null,
        phone: phone || null,
        email: email || null,
        website: website || null,
        logo: logo || null,
        order: order || 1,
        users: {
          connect: { id: session.user.id }, // Connecter l'utilisateur créateur
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
          },
        }, 
      },
    });

    // Ajouter owner basé sur le premier user
    const organizationWithOwner = {
      ...organization,
      owner: organization.users[0] || null,
    };

    return NextResponse.json(organizationWithOwner, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'organisation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
