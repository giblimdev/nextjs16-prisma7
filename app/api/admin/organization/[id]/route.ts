// @/app/api/admin/organization/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";

// GET - Récupérer une organisation par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        teams: {
          orderBy: { order: "asc" },
        },
        products: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
        },
        categories: {
          orderBy: { sortOrder: "asc" },
        },
        tags: {
          orderBy: { name: "asc" },
        },
        clients: {
          take: 10,
          orderBy: { createdAt: "desc" },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            roles: true,
          },
          take: 1,
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
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Organisation non trouvée" },
        { status: 404 }
      );
    }

    // Ajouter owner basé sur le premier user
    const organizationWithOwner = {
      ...organization,
      owner: organization.users[0] || null,
    };

    return NextResponse.json(organizationWithOwner, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'organisation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une organisation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Vérifier que l'organisation existe
    const existingOrg = await prisma.organization.findUnique({
      where: { id },
    });

    if (!existingOrg) {
      return NextResponse.json(
        { error: "Organisation non trouvée" },
        { status: 404 }
      );
    }

    const organization = await prisma.organization.update({
      where: { id },
      data: {
        name: name || existingOrg.name,
        address: address !== undefined ? address : existingOrg.address,
        city: city !== undefined ? city : existingOrg.city,
        postalCode: postalCode !== undefined ? postalCode : existingOrg.postalCode,
        country: country !== undefined ? country : existingOrg.country,
        phone: phone !== undefined ? phone : existingOrg.phone,
        email: email !== undefined ? email : existingOrg.email,
        website: website !== undefined ? website : existingOrg.website,
        logo: logo !== undefined ? logo : existingOrg.logo,
        order: order !== undefined ? order : existingOrg.order,
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
          take: 1,
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

    return NextResponse.json(organizationWithOwner, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'organisation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une organisation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Vérifier que l'organisation existe
    const existingOrg = await prisma.organization.findUnique({
      where: { id },
    });

    if (!existingOrg) {
      return NextResponse.json(
        { error: "Organisation non trouvée" },
        { status: 404 }
      );
    }

    await prisma.organization.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Organisation supprimée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'organisation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
