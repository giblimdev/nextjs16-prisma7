// @/app/user/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
  Store,
  CreditCard,
  Heart,
  MapPin,
  Gift,
  Star,
  ArrowRight,
  LogIn,
  UserPlus,
  User,
  Plus,
} from "lucide-react";

export default async function UserPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Si pas connecté, afficher les boutons de connexion
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-indigo-500/10 rounded-full">
                <User className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
              Mon Espace
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Vous devez être connecté pour accéder à cette page
            </p>

            {/* Boutons */}
            <div className="space-y-3">
              <Link href="/auth/signin" className="block">
                <Button className="w-full" size="lg">
                  <LogIn className="w-5 h-5 mr-2" />
                  Se connecter
                </Button>
              </Link>

              <Link href="/auth/register" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Créer un compte
                </Button>
              </Link>
            </div>

            {/* Lien retour */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Récupérer les rôles de l'utilisateur
  const userRoles = (session.user.roles as string[]) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                👋 Bienvenue, {session.user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Votre espace personnel
              </p>
            </div>
            {userRoles.length > 0 && (
              <div className="flex items-center gap-2">
                {userRoles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid des 3 sections principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Trouver un magasin */}
          <Link href="/stores">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer h-full">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Store className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Trouver un magasin
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Localisez les points de vente près de chez vous sur une carte interactive
              </p>

              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                Voir la carte
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>150+ magasins disponibles</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Carte de fidélité */}
          <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 h-full flex flex-col">
            <div className="mb-6">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Carte de fidélité
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">
              Consultez vos points, réductions et avantages exclusifs
            </p>

            {/* Boutons */}
            <div className="space-y-3">
              <Link href="/user/addLoyalty" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer ma carte
                </Button>
              </Link>
              
              <Link href="/client/loyalty" className="block">
                <Button variant="outline" className="w-full text-purple-600 border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  Voir ma carte
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Gift className="w-4 h-4" />
                <span>??? points disponibles</span>
              </div>
            </div>
          </div>

          {/* Mes favoris */}
          <Link href="/favorites">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 cursor-pointer h-full">
              <div className="mb-6">
                <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                Mes favoris
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Retrouvez vos produits et magasins préférés sauvegardés
              </p>

              <div className="flex items-center text-pink-600 dark:text-pink-400 font-medium group-hover:translate-x-2 transition-transform">
                Voir mes favoris
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Star className="w-4 h-4" />
                  <span>12 produits favoris</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Section activité récente */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Activité récente
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Visite du magasin Centre-Ville
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Il y a 2 jours
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Gift className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  +50 points de fidélité gagnés
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Il y a 5 jours
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="p-3 bg-pink-500/10 rounded-lg">
                <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  3 nouveaux produits ajoutés aux favoris
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Il y a 1 semaine
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
