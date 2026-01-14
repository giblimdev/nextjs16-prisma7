// @/app/public/privacy/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserX, 
  Bell, 
  FileText, 
  ArrowLeft,
  Mail,
  Cookie,
  Globe,
  AlertCircle,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Politique de Confidentialité
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Protection de vos données personnelles - Dernière mise à jour : 14 janvier 2026
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
              <FileText className="w-5 h-5 text-green-600" />
              1. Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Nous attachons une grande importance à la protection de vos données personnelles. 
              Cette politique de confidentialité explique comment nous collectons, utilisons, 
              stockons et protégeons vos informations conformément au Règlement Général sur la 
              Protection des Données (RGPD).
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-sm font-medium text-green-900 dark:text-green-100 flex items-start gap-2">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Vos données sont sécurisées et ne seront jamais vendues à des tiers. 
                  Vous gardez le contrôle total sur vos informations personnelles.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Responsable du traitement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              2. Responsable du traitement des données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Coordonnées du responsable :
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Nom :</strong> [Votre Entreprise]</li>
                <li><strong>Adresse :</strong> [Adresse complète]</li>
                <li><strong>Email :</strong> <a href="mailto:privacy@example.com" className="text-blue-600 hover:underline">privacy@example.com</a></li>
                <li><strong>Téléphone :</strong> [Numéro de téléphone]</li>
              </ul>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Pour toute question concernant vos données personnelles, vous pouvez nous contacter 
              à l&apos;adresse email ci-dessus.
            </p>
          </CardContent>
        </Card>

        {/* Données collectées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              3. Données collectées
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                3.1 Données d&apos;identification
              </h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Nom et prénom
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Adresse email
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Numéro de téléphone (optionnel)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Photo de profil (optionnelle)
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                3.2 Données de connexion
              </h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Adresse IP
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Informations sur le navigateur et l&apos;appareil
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Dates et heures de connexion
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Pages visitées et actions effectuées
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                3.3 Données du programme de fidélité
              </h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Points de fidélité et points XP
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Niveau de fidélité (Bronze, Silver, Gold, Platinum)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Historique des transactions et achats
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Préférences et interactions avec nos services
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                3.4 Données de paiement
              </h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Informations de facturation (adresse, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Historique des commandes et transactions
                  </span>
                </li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mt-3">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  ℹ️ <strong>Note importante :</strong> Les données bancaires (numéros de carte) sont 
                  traitées directement par nos prestataires de paiement sécurisés (Stripe, PayPal) 
                  et ne sont jamais stockées sur nos serveurs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Finalités */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              4. Finalités du traitement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Nous utilisons vos données personnelles pour les finalités suivantes :
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Gestion de votre compte</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Création, authentification et maintenance de votre compte utilisateur
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Lock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Programme de fidélité</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gestion des points, niveaux et avantages du programme
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Database className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Traitement des commandes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gestion des achats, livraisons et service après-vente
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Bell className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Communications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Envoi de notifications, offres personnalisées et informations importantes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Globe className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Amélioration des services</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Analyse et optimisation de l&apos;expérience utilisateur
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Obligations légales</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Respect des obligations comptables, fiscales et réglementaires
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Base légale */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              5. Base légale du traitement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Le traitement de vos données repose sur les bases légales suivantes :
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Consentement :</strong> Pour les communications marketing et cookies non essentiels
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Exécution du contrat :</strong> Pour la gestion de votre compte et vos commandes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Intérêt légitime :</strong> Pour l&apos;amélioration de nos services et la sécurité
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Obligations légales :</strong> Pour la comptabilité et les obligations fiscales
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Durée de conservation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              6. Durée de conservation des données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Compte actif
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Tant que votre compte est actif et pendant 3 ans après la dernière activité
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Données de facturation
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  10 ans conformément aux obligations légales comptables
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Données de prospection
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  3 ans à compter du dernier contact ou jusqu&apos;au retrait du consentement
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Cookies et traceurs
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  13 mois maximum conformément aux recommandations de la CNIL
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partage des données */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-red-600" />
              7. Partage et transfert des données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                7.1 Destinataires des données
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Vos données peuvent être partagées avec :
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Nos prestataires de services (hébergement, paiement, livraison)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Les autorités légales si requis par la loi
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
              <p className="text-sm font-medium text-red-900 dark:text-red-100 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Vos données ne seront jamais vendues</strong> à des tiers à des fins 
                  commerciales. Tous nos prestataires sont contractuellement tenus de respecter 
                  la confidentialité et la sécurité de vos données.
                </span>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                7.2 Transferts internationaux
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Vos données sont hébergées au sein de l&apos;Union Européenne. En cas de transfert 
                hors UE, nous nous assurons que des garanties appropriées sont mises en place 
                (clauses contractuelles types, décision d&apos;adéquation).
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              8. Sécurité des données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
              protéger vos données personnelles :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Chiffrement SSL/TLS</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Toutes les communications sont chiffrées
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Pare-feu et protection</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Infrastructure sécurisée
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Database className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Sauvegardes régulières</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Restauration en cas d&apos;incident
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Eye className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Accès restreints</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Personnel autorisé uniquement
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Droits des utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX className="w-5 h-5 text-purple-600" />
              9. Vos droits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  ✓ Droit d&apos;accès
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Obtenir une copie de vos données personnelles
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  ✓ Droit de rectification
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Corriger vos données inexactes ou incomplètes
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  ✓ Droit à l&apos;effacement
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Demander la suppression de vos données (sous conditions)
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  ✓ Droit à la limitation
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Limiter le traitement de vos données
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  ✓ Droit à la portabilité
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Recevoir vos données dans un format structuré
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  ✓ Droit d&apos;opposition
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Vous opposer au traitement de vos données
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  ✓ Retrait du consentement
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Retirer votre consentement à tout moment
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Comment exercer vos droits ?</strong>
                <br />
                Envoyez-nous un email à <a href="mailto:privacy@example.com" className="underline">privacy@example.com</a> en 
                précisant votre demande. Nous vous répondrons dans un délai d&apos;un mois maximum.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-yellow-600" />
              10. Cookies et traceurs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer 
              vos préférences à tout moment.
            </p>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Types de cookies utilisés :
              </h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Cookies de performance :</strong> Amélioration de l&apos;expérience utilisateur
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Cookies fonctionnels :</strong> Préférences et paramètres
                  </span>
                </li>
              </ul>
            </div>

            <Link href="/cookies">
              <Button variant="outline" size="sm">
                Gérer mes préférences cookies
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Réclamation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              11. Réclamation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d&apos;introduire 
              une réclamation auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL).
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Contact CNIL :
              </p>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cnil.fr</a></li>
                <li>Adresse : 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</li>
                <li>Téléphone : 01 53 73 22 22</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Modifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              12. Modifications de cette politique
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
              Toute modification sera publiée sur cette page avec une date de mise à jour. Les 
              modifications importantes seront notifiées par email.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                Des questions sur vos données ?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Notre équipe est à votre disposition pour répondre à toutes vos questions 
                concernant la protection de vos données personnelles.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="mailto:privacy@example.com">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/user/profile">
                  <Button variant="outline">
                    Gérer mes données
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
            © 2026 - Tous droits réservés | <Link href="/public/loyaltyTerms" className="hover:underline">Conditions d&apos;utilisation</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
