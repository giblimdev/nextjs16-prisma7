// @/app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Compter en parallèle pour optimiser les performances
    const [usersCount, orgsCount, productsCount, ordersCount] = await Promise.all([
      prisma.user.count(),
      prisma.organization.count(),
      prisma.product.count(),
      prisma.order.count(),
    ]);

    return NextResponse.json({
      users: usersCount,
      organizations: orgsCount,
      products: productsCount,
      orders: ordersCount,
    });
  } catch (error) {
    console.error("Erreur GET /api/admin/stats:", error);
    
    // Retourner des valeurs par défaut en cas d'erreur
    return NextResponse.json(
      { 
        users: 0,
        organizations: 0,
        products: 0,
        orders: 0,
      },
      { status: 200 } // 200 pour ne pas bloquer l'affichage
    );
  }
}
