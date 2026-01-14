// @/app/unauthorized/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home, ArrowLeft, Mail } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl w-full mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 border border-red-200 dark:border-red-900">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative p-6 bg-red-500/10 rounded-full">
                <ShieldAlert className="w-20 h-20 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          {/* Titre */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Accès refusé
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              Vous n&apos;avez pas les permissions nécessaires
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Cette page est réservée aux utilisateurs autorisés
            </p>
          </div>

          {/* Message détaillé */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">
              Pourquoi je vois cette page ?
            </h3>
            <ul className="text-sm text-red-800 dark:text-red-400 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Votre compte n&apos;a pas le rôle requis pour accéder à cette section</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Vous tentez d&apos;accéder à une zone administrateur ou développeur</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Vos permissions ont peut-être été modifiées récemment</span>
              </li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full" size="lg">
                <Home className="w-5 h-5 mr-2" />
                Retour à l&apos;accueil
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Page précédente
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Support
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, veuillez contacter un administrateur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
