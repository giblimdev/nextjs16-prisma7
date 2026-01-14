// @/app/vendor/organization/page.tsx
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
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  Users,
  Package,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function OrganizationPage() {
  // Vérifier l'authentification
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  // Récupérer l'organisation de l'utilisateur
  const organization = await prisma.organization.findFirst({
    where: {
      users: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      teams: {
        orderBy: { order: "asc" },
      },
      products: {
        where: { isActive: true },
        take: 5,
        orderBy: { createdAt: "desc" },
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

  // Si pas d'organisation, rediriger vers la création
  if (!organization) {
    redirect("/user/addOrganization");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Mon Organisation
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez votre point de vente et vos produits
              </p>
            </div>
            <Link href={`/vendor/organization/${organization.id}/edit`}>
              <Button size="lg">
                <Edit className="w-5 h-5 mr-2" />
                Modifier
              </Button>
            </Link>
          </div>
        </div>

        {/* Informations principales */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {organization.logo ? (
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    <Image
                      src={organization.logo}
                      alt={organization.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Store className="w-10 h-10 text-white" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-3xl mb-2">
                    {organization.name}
                  </CardTitle>
                  <CardDescription>
                    Point de vente #{organization.id.slice(0, 8)}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Adresse */}
              {organization.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Adresse
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {organization.address}
                      {organization.city && `, ${organization.city}`}
                      {organization.postalCode && ` ${organization.postalCode}`}
                      {organization.country && (
                        <span className="block">{organization.country}</span>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Téléphone */}
              {organization.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Téléphone
                    </p>
                    <a
                      href={`tel:${organization.phone}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {organization.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              {organization.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Email
                    </p>
                    <a
                      href={`mailto:${organization.email}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {organization.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Site web */}
              {organization.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Site web
                    </p>
                    <a
                      href={organization.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {organization.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {organization._count.clients}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Clients enregistrés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Produits</CardTitle>
              <Package className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {organization._count.products}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Produits actifs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Équipes</CardTitle>
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {organization._count.teams}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Équipes créées
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Produits récents */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Produits récents</CardTitle>
                <CardDescription>
                  Les 5 derniers produits ajoutés
                </CardDescription>
              </div>
              <Link href="/vendor/products/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau produit
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {organization.products.length > 0 ? (
              <div className="space-y-4">
                {organization.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {product.price}€ • Stock: {product.stock}
                        </p>
                      </div>
                    </div>
                    <Link href={`/vendor/products/${product.id}`}>
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Aucun produit pour le moment
                </p>
                <Link href="/vendor/products/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter votre premier produit
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/vendor/products">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <CardTitle>Gérer les produits</CardTitle>
                <CardDescription>
                  Ajoutez, modifiez ou supprimez des produits
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/vendor/teams">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                <CardTitle>Gérer les équipes</CardTitle>
                <CardDescription>
                  Organisez vos équipes et collaborateurs
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/vendor/clients">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
    </div>
  );
}
