// @/app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Store,
  CreditCard,
  ShoppingBag,
  Users,
  ArrowRight,
  MapPin,
  Gift,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* ✅ Ajout de z-0 pour que le backdrop soit en arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl -z-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Bienvenue sur notre plateforme
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Découvrez nos
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Services Locaux
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Trouvez les meilleurs points de vente près de chez vous et profitez de notre programme de fidélité exclusif
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/user">
                <Button size="lg" className="text-lg px-8 py-6 group">
                  <Store className="w-5 h-5 mr-2" />
                  Trouver un point de vente
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Users className="w-5 h-5 mr-2" />
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Trouver un point de vente */}
          <Link href="/user">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Points de vente
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Localisez rapidement les magasins et boutiques proches de chez vous sur une carte interactive
              </p>
              
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                Découvrir
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>

          {/* Carte de fidélité */}
          <Link href="/loyalty">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 cursor-pointer">
              <div className="mb-6">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Carte de fidélité
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Cumulez des points à chaque achat et bénéficiez de réductions exclusives et d&apos;avantages
              </p>
              
              <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium group-hover:translate-x-2 transition-transform">
                En savoir plus
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Points de vente</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Produits disponibles</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 text-center border border-blue-200 dark:border-gray-600">
          <Gift className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
          
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Rejoignez-nous dès aujourd&apos;hui
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Créez votre compte gratuitement et commencez à profiter de tous nos avantages
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Créer un compte gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
