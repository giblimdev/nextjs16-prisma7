import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/feature  → Liste toutes les features
export async function GET() {
  const features = await prisma.feature.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(features);
}

// POST /api/feature → Crée une nouvelle feature
export async function POST(req: Request) {
  const body = await req.json();

  const feature = await prisma.feature.create({
    data: {
      title: body.title,
      description: body.description,
      type: body.type,
      priority: body.priority,
      creatorId: body.creatorId,
      organizationId: body.organizationId,
      parentId: body.parentId,
    },
  });

  return NextResponse.json(feature, { status: 201 });
}
