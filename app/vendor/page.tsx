// @/app/vendor/page.tsx
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Store,
  Building2,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
  Plus,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

export default async function VendorPage() {
  // Vérifier l'authentification
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  // Récupérer les organisations de l'utilisateur
  const organizations = await prisma.organization.findMany({
    where: {
      users: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      _count: {
        select: {
          clients: true,
          products: true,
          teams: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <LayoutDashboard className="w-4 h-4" />
            Espace Vendeur
          </div>

          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Tableau de bord
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Vendeur
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Bienvenue {session.user.name} ! Gérez vos points de vente, produits et clients depuis cet espace.
          </p>
        </div>

        {/* Statistiques globales */}
        {organizations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Points de vente
                </CardTitle>
                <Building2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{organizations.length}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Organisation{organizations.length > 1 ? "s" : ""} active{organizations.length > 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Produits totaux
                </CardTitle>
                <Package className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {organizations.reduce((acc, org) => acc + org._count.products, 0)}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Tous points de vente confondus
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Clients totaux
                </CardTitle>
                <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {organizations.reduce((acc, org) => acc + org._count.clients, 0)}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Base clients totale
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Carte principale : Mes organisations */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Mes organisations</CardTitle>
                  <CardDescription>
                    {organizations.length > 0
                      ? `Gérez vos ${organizations.length} point${organizations.length > 1 ? "s" : ""} de vente`
                      : "Créez votre premier point de vente"}
                  </CardDescription>
                </div>
              </div>
              {organizations.length > 0 && (
                <Link href="/user/addOrganization">
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {organizations.length > 0 ? (
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div
                    key={org.id}
                    className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {org.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {org._count.products} produits
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {org._count.clients} clients
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {org._count.teams} équipes
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link href="/vendor/organization">
                      <Button size="lg" className="group">
                        Gérer
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Store className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Aucune organisation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Commencez par créer votre premier point de vente pour gérer vos produits et clients.
                </p>
                <Link href="/user/addOrganization">
                  <Button size="lg" className="group">
                    <Plus className="w-5 h-5 mr-2" />
                    Créer mon premier point de vente
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions rapides */}
        {organizations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/vendor/organization">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500 dark:hover:border-blue-500">
                  <CardHeader>
                    <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                    <CardTitle>Voir mes organisations</CardTitle>
                    <CardDescription>
                      Consultez et gérez tous vos points de vente
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/vendor/products">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500 dark:hover:border-purple-500">
                  <CardHeader>
                    <Package className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                    <CardTitle>Gérer les produits</CardTitle>
                    <CardDescription>
                      Ajoutez, modifiez ou supprimez des produits
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/vendor/clients">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-500 dark:hover:border-green-500">
                  <CardHeader>
                    <Users className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                    <CardTitle>Gérer les clients</CardTitle>
                    <CardDescription>
                      Consultez et gérez votre base clients
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
