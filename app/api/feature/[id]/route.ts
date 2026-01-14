// @/app/api/feature/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/feature/[id] - Récupère une feature avec ses relations
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const feature = await prisma.feature.findUnique({
      where: { id },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
        parent: {
          select: {
            id: true,
            title: true,
          },
        },
        children: {
          select: {
            id: true,
            title: true,
            type: true,
            status: true,
          },
        },
      },
    });

    if (!feature) {
      return NextResponse.json(
        { error: "Feature non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(feature);
  } catch (error) {
    console.error("Erreur GET /api/feature/[id]:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la feature" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/feature/[id] - Met à jour une feature complète
 */
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // Vérifier que la feature existe
    const existing = await prisma.feature.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Feature non trouvée" },
        { status: 404 }
      );
    }

    // Validation des champs obligatoires
    if (body.title && body.title.trim() === "") {
      return NextResponse.json(
        { error: "Le titre ne peut pas être vide" },
        { status: 400 }
      );
    }

    // Préparer les données avec conversion des dates
    const updateData: Record<string, unknown> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug || null;
    if (body.description !== undefined) updateData.description = body.description || null;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.priority !== undefined) updateData.priority = body.priority;
    if (body.order !== undefined) updateData.order = body.order;
    
    // Conversion des dates
    if (body.dueDate !== undefined) {
      updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;
    }
    if (body.startedAt !== undefined) {
      updateData.startedAt = body.startedAt ? new Date(body.startedAt) : null;
    }
    if (body.completedAt !== undefined) {
      updateData.completedAt = body.completedAt ? new Date(body.completedAt) : null;
    }

    if (body.estimatedPoints !== undefined) updateData.estimatedPoints = body.estimatedPoints || null;
    if (body.estimatedHours !== undefined) updateData.estimatedHours = body.estimatedHours || null;
    if (body.parentId !== undefined) updateData.parentId = body.parentId || null;
    if (body.organizationId !== undefined) updateData.organizationId = body.organizationId || null;
    if (body.assigneeId !== undefined) updateData.assigneeId = body.assigneeId || null;

    const feature = await prisma.feature.update({
      where: { id },
      data: updateData,
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
        parent: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(feature);
  } catch (error) {
    console.error("Erreur PUT /api/feature/[id]:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la feature" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/feature/[id] - Mise à jour partielle (order, parentId, status, etc.)
 * Permet de mettre à jour n'importe quel champ individuellement
 */
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // Vérifier que la feature existe
    const existing = await prisma.feature.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Feature non trouvée" },
        { status: 404 }
      );
    }

    // Si on change le parent, vérifier les boucles circulaires
    if (body.parentId !== undefined && body.parentId !== existing.parentId) {
      if (body.parentId !== null) {
        const isDescendant = await checkIfDescendant(id, body.parentId);
        if (isDescendant) {
          return NextResponse.json(
            { error: "Impossible de créer une boucle circulaire dans la hiérarchie" },
            { status: 400 }
          );
        }
      }
    }

    // Construire updateData avec TOUS les champs possibles du body
    const updateData: Record<string, unknown> = {};
    
    // Champs de base
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug || null;
    if (body.description !== undefined) updateData.description = body.description || null;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.priority !== undefined) updateData.priority = body.priority;
    
    // Order - IMPORTANT pour le réordonnancement
    if (body.order !== undefined) updateData.order = body.order;
    
    // Dates
    if (body.dueDate !== undefined) {
      updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;
    }
    if (body.startedAt !== undefined) {
      updateData.startedAt = body.startedAt ? new Date(body.startedAt) : null;
    }
    if (body.completedAt !== undefined) {
      updateData.completedAt = body.completedAt ? new Date(body.completedAt) : null;
    }
    
    // Estimations
    if (body.estimatedPoints !== undefined) updateData.estimatedPoints = body.estimatedPoints || null;
    if (body.estimatedHours !== undefined) updateData.estimatedHours = body.estimatedHours || null;
    
    // Relations
    if (body.parentId !== undefined) updateData.parentId = body.parentId || null;
    if (body.organizationId !== undefined) updateData.organizationId = body.organizationId || null;
    if (body.assigneeId !== undefined) updateData.assigneeId = body.assigneeId || null;

    const feature = await prisma.feature.update({
      where: { id },
      data: updateData,
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
        parent: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(feature);
  } catch (error) {
    console.error("Erreur PATCH /api/feature/[id]:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour partielle de la feature" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/feature/[id] - Supprime une feature (cascade automatique via Prisma)
 */
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    // Vérifier que la feature existe
    const existing = await prisma.feature.findUnique({
      where: { id },
      include: {
        children: {
          select: { id: true },
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Feature non trouvée" },
        { status: 404 }
      );
    }

    // Compter les enfants pour information
    const childrenCount = existing.children.length;

    // La suppression en cascade est gérée par Prisma (onDelete: Cascade dans le schema)
    await prisma.feature.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: childrenCount > 0
        ? `Feature et ${childrenCount} enfant(s) supprimé(s)`
        : "Feature supprimée",
    });
  } catch (error) {
    console.error("Erreur DELETE /api/feature/[id]:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la feature" },
      { status: 500 }
    );
  }
}

/**
 * Vérifie si targetId est un descendant de parentId (prévention boucles circulaires)
 */
async function checkIfDescendant(
  targetId: string,
  parentId: string
): Promise<boolean> {
  // Si le parent proposé est la feature elle-même
  if (targetId === parentId) {
    return true;
  }

  const findAllDescendants = async (id: string): Promise<string[]> => {
    const children = await prisma.feature.findMany({
      where: { parentId: id },
      select: { id: true },
    });

    if (children.length === 0) {
      return [];
    }

    const childIds = children.map((c) => c.id);
    const descendantsPromises = childIds.map((childId) =>
      findAllDescendants(childId)
    );
    const allDescendants = await Promise.all(descendantsPromises);

    return [...childIds, ...allDescendants.flat()];
  };

  const descendants = await findAllDescendants(parentId);
  return descendants.includes(targetId);
}
