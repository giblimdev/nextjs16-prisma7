//@/app/user/addOrganization/page.tsx


// @/app/user/addOrganization/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Store,
  Scissors,
  TrendingUp,
  Users,
  BarChart3,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import AddOrganisationForm from "./OrganisationForm";

export default function AddOrganizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Développez votre activité
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Créez votre
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Point de Vente
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Que vous soyez magasin ou salon, rejoignez notre plateforme et profitez d&apos;une visibilité accrue auprès de milliers de clients potentiels
          </p>
        </div>

        {/* Types de points de vente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Store className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Magasins
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Boutiques, commerces de proximité, épiceries, librairies... Augmentez votre chiffre d&apos;affaires en touchant une clientèle locale engagée.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-purple-200 dark:border-purple-800">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Scissors className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Salons
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Salons de coiffure, instituts de beauté, spas... Attirez de nouveaux clients et fidélisez votre clientèle grâce à notre programme de récompenses.
            </p>
          </div>
        </div>

        {/* Avantages */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Les avantages de notre plateforme
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Avantage 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Visibilité accrue
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Apparaissez sur notre carte interactive et soyez découvert par des milliers de clients potentiels près de chez vous.
              </p>
            </div>

            {/* Avantage 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Programme de fidélité
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fidélisez vos clients grâce à notre système de points et de récompenses intégré. Ils reviendront encore et encore.
              </p>
            </div>

            {/* Avantage 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Statistiques détaillées
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Suivez vos performances en temps réel : vues de profil, visites en magasin, revenus générés et bien plus.
              </p>
            </div>

            {/* Avantage 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Avis et notations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Collectez des avis clients authentiques et construisez votre réputation en ligne pour attirer plus de monde.
              </p>
            </div>

            {/* Avantage 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Gestion simplifiée
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interface intuitive pour gérer vos produits, horaires, promotions et interactions clients en quelques clics.
              </p>
            </div>

            {/* Avantage 6 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Gratuit pour commencer
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Créez votre profil gratuitement et découvrez tous nos outils sans engagement. Upgradez quand vous êtes prêt.
              </p>
            </div>
          </div>
        </div>

        {/* Étapes simples */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 mb-16 border border-blue-200 dark:border-gray-600">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Comment ça marche ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Créez votre profil
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Remplissez le formulaire avec les informations de votre commerce : nom, adresse, horaires, photos...
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Personnalisez votre offre
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ajoutez vos produits, services, promotions et configurez votre programme de fidélité personnalisé.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Attirez des clients
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Votre commerce est en ligne ! Les clients vous découvrent, consultent vos offres et visitent votre établissement.
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Ajouter mon point de vente
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Remplissez le formulaire ci-dessous pour créer votre profil
            </p>
          </div>
          
          <AddOrganisationForm />
        </div>

        {/* CTA Final */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Des questions ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour vous accompagner dans la création de votre point de vente
          </p>
          
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 group">
              Contactez-nous
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
