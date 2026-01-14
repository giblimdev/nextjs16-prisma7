// @/app/client/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LogIn, UserPlus, User } from "lucide-react";

export default async function ClientPage() {
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
              <div className="p-4 bg-blue-500/10 rounded-full">
                <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
              Espace Client
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

  // Vérifier les rôles
  const userRoles = (session.user.roles as string[]) || [];
  if (!userRoles.some(role => ["CLIENT", "VENDOR", "ADMIN"].includes(role))) {
    redirect("/unauthorized");
  }

  // Si connecté, afficher la page client
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                👋 Bienvenue, {session.user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Espace Client
              </p>
            </div>
            <div className="flex items-center gap-2">
              {userRoles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Mes commandes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Consultez l&apos;historique de vos commandes
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Mon profil</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gérez vos informations personnelles
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Besoin d&apos;aide ? Contactez-nous
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
