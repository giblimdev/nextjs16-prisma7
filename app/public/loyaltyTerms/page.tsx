// @/app/public/loyaltyTerms/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, 
  Shield, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock,
  Gift,
  XCircle,
  ArrowLeft,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function LoyaltyTermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/user/addLoyalty">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Conditions d&apos;utilisation
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Programme de fidélité - Dernière mise à jour : 14 janvier 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        {/* Introduction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              1. Présentation du programme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Le programme de fidélité permet aux membres de cumuler des points à chaque achat 
              et de bénéficier d&apos;avantages exclusifs selon leur niveau de fidélité.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                ✨ Adhésion gratuite et sans engagement
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Adhésion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              2. Conditions d&apos;adhésion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Pour adhérer au programme de fidélité, vous devez :
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Être majeur(e) et disposer d&apos;un compte utilisateur actif
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Fournir des informations exactes et à jour
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Accepter les présentes conditions d&apos;utilisation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Respecter les règles du programme
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Cumul des points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-yellow-600" />
              3. Cumul et utilisation des points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                3.1 Gain de points
              </h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>1 point = 1€ dépensé</strong> (hors promotions spécifiques)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Bonus de bienvenue : <strong>10 points offerts</strong> à l&apos;inscription
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Points bonus lors d&apos;événements promotionnels
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                3.2 Utilisation des points
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Les points peuvent être échangés contre :
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Réductions sur vos achats
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Produits exclusifs membres
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Avantages selon votre niveau de fidélité
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Points d'expérience (XP) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              4. Système de Points d&apos;Expérience (XP)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                4.1 Qu&apos;est-ce que les points XP ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Les points d&apos;expérience (XP) représentent votre historique d&apos;engagement 
                cumulé avec le programme. Contrairement aux points de fidélité qui peuvent être 
                dépensés, les XP sont <strong>permanents</strong> et déterminent votre niveau.
              </p>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Points de fidélité
                  </h4>
                  <ul className="text-sm space-y-1 text-indigo-800 dark:text-indigo-200">
                    <li>• Peuvent être dépensés</li>
                    <li>• Expirent après 24 mois</li>
                    <li>• Utilisés pour des réductions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Points XP
                  </h4>
                  <ul className="text-sm space-y-1 text-indigo-800 dark:text-indigo-200">
                    <li>• Permanents (ne se perdent jamais)</li>
                    <li>• N&apos;expirent pas</li>
                    <li>• Déterminent votre niveau</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                4.2 Comment gagner des XP ?
              </h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Achats</strong> : 1 XP par euro dépensé (identique aux points)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Bonus de bienvenue</strong> : 10 XP offerts à l&apos;inscription
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Événements spéciaux</strong> : XP bonus lors de promotions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Parrainage</strong> : XP supplémentaires pour chaque filleul
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Avis produits</strong> : Bonus XP pour vos retours d&apos;expérience
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                4.3 Progression et niveaux
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Votre total XP cumulé détermine votre niveau actuel :
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-orange-900">
                  <div className="text-2xl mb-1">🥉</div>
                  <div className="font-bold text-sm">Bronze</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">0 - 100 XP</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-400">
                  <div className="text-2xl mb-1">🥈</div>
                  <div className="font-bold text-sm">Silver</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">100 - 500 XP</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-500">
                  <div className="text-2xl mb-1">🥇</div>
                  <div className="font-bold text-sm">Gold</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">500 - 1000 XP</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-600">
                  <div className="text-2xl mb-1">💎</div>
                  <div className="font-bold text-sm">Platinum</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">+1000 XP</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Important :</strong> Les XP ne diminuent jamais, même si vous dépensez 
                  vos points de fidélité. Une fois un niveau atteint, vous le conservez à vie 
                  (sauf suspension du compte).
                </span>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                4.4 Avantages par niveau XP
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-2xl">🥉</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Bronze (0-100 XP)</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                      <li>• Accumulation de points standard</li>
                      <li>• Accès aux offres membres</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-2xl">🥈</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Silver (100-500 XP)</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                      <li>• <strong>+5%</strong> de bonus sur les points gagnés</li>
                      <li>• Offres exclusives Silver</li>
                      <li>• Support prioritaire</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-2xl">🥇</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Gold (500-1000 XP)</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                      <li>• <strong>+10%</strong> de bonus sur les points gagnés</li>
                      <li>• Accès anticipé aux nouveautés</li>
                      <li>• Livraison gratuite prioritaire</li>
                      <li>• Invitations événements exclusifs</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-2xl">💎</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Platinum (+1000 XP)</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                      <li>• <strong>+15%</strong> de bonus sur les points gagnés</li>
                      <li>• Service VIP personnalisé</li>
                      <li>• Cadeaux d&apos;anniversaire exclusifs</li>
                      <li>• Produits en édition limitée</li>
                      <li>• Réductions permanentes sur tout le catalogue</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Niveaux de fidélité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              5. Niveaux de fidélité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-orange-900 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥉</span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Bronze</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">0 - 100 points</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Avantages de base du programme
                </p>
              </div>

              <div className="border-2 border-gray-400 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥈</span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Silver</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">100 - 500 points</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  +5% de bonus sur les points
                </p>
              </div>

              <div className="border-2 border-yellow-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥇</span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Gold</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">500 - 1000 points</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  +10% de bonus + offres exclusives
                </p>
              </div>

              <div className="border-2 border-purple-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💎</span>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Platinum</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">+1000 points</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  +15% de bonus + avantages VIP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              6. Validité et expiration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Les points sont valables <strong>24 mois</strong> à compter de leur date d&apos;acquisition
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Les points non utilisés après cette période seront automatiquement supprimés
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Un email de rappel sera envoyé 30 jours avant l&apos;expiration
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Restrictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              7. Restrictions et exclusions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Les points ne peuvent pas être :
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Transférés à un autre membre
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Échangés contre de l&apos;argent
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Vendus ou cédés à un tiers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Utilisés de manière frauduleuse
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Résiliation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              8. Résiliation et suspension
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                8.1 Par le membre
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Vous pouvez résilier votre adhésion à tout moment depuis votre espace personnel. 
                Les points non utilisés seront perdus.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                8.2 Par l&apos;entreprise
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous nous réservons le droit de suspendre ou résilier votre carte en cas de :
              </p>
              <ul className="space-y-2 ml-4 mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Non-respect des conditions d&apos;utilisation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Utilisation frauduleuse du programme
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Inactivité du compte pendant plus de 24 mois
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Modifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              9. Modifications du programme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Nous nous réservons le droit de modifier les conditions du programme de fidélité 
              à tout moment. Les membres seront informés par email au moins 30 jours avant 
              l&apos;entrée en vigueur des modifications.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                La poursuite de l&apos;utilisation du programme après notification des modifications 
                vaut acceptation des nouvelles conditions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Protection des données */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              10. Protection des données personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Vos données personnelles sont collectées et traitées conformément à notre 
              <Link href="/public/privacy" className="text-purple-600 hover:underline mx-1">
                politique de confidentialité
              </Link>
              et au RGPD.
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Vos données ne seront jamais vendues à des tiers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Sécurisation maximale de vos informations
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                Des questions ?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Notre équipe est à votre disposition pour toute question concernant 
                le programme de fidélité.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/contact">
                  <Button variant="outline">
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/user/addLoyalty">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Créer ma carte
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer légal */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
          <p>Dernière mise à jour : 14 janvier 2026</p>
          <p className="mt-2">
            © 2026 - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
}
