// @/app/user/addLoyalty/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Gift, Star, Trophy, TrendingUp } from "lucide-react";
import LoyaltyForm from "./loyaltyForm";

export default function AddLoyaltyPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            🎁 Carte de Fidélité
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Créez votre carte et commencez à accumuler des points
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!showForm ? (
          <>
            {/* Présentation de la carte de fidélité */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-purple-500/10 rounded-2xl">
                  <CreditCard className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Pourquoi créer votre carte ?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Profitez d&apos;avantages exclusifs et de récompenses
                  </p>
                </div>
              </div>





              {/* Avantages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Gagnez des points
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      À chaque achat, cumulez des points échangeables contre des réductions
                    </p>
                  </div>
                </div>





                <div className="flex items-start gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Star className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Offres exclusives
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Accédez à des promotions réservées aux membres fidèles
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Niveaux de fidélité
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bronze, Silver, Gold, Platinum - montez en niveau pour plus d&apos;avantages
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Suivi en temps réel
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Consultez votre solde de points et vos avantages à tout moment
                    </p>
                  </div>
                </div>
              </div>

              {/* Niveaux de fidélité */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-4">
                  Les niveaux de fidélité
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 mx-auto mb-2 bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🥉</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Bronze</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">0-100 pts</p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🥈</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Silver</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">100-500 pts</p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 mx-auto mb-2 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🥇</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Gold</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">500-1000 pts</p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 mx-auto mb-2 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">💎</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Platinum</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">+1000 pts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton pour créer la carte */}
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setShowForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Créer ma carte de fidélité
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Gratuit et sans engagement
              </p>
            </div>
          </>
        ) : (
          <LoyaltyForm onCancel={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
}
