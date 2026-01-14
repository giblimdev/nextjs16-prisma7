/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Database, Users, ShoppingCart, FileText, Building, Tag, Image, CreditCard, MapPin, Award } from 'lucide-react';

export default function SchemaDocumentation() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Documentation du Schéma Prisma</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Système de gestion e-commerce complet avec authentification, organisations, produits, commandes et facturation.
          </p>
        </header>

        {/* Vue d'ensemble */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-500" />
            Vue d&apos;ensemble du Système
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Structure Modulaire</h3>
              <p className="text-gray-600">
                Le schéma est organisé en 8 modules principaux fonctionnant ensemble pour créer une plateforme e-commerce complète.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>Authentification et utilisateurs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-purple-500" />
                  <span>Gestion multi-organisations</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-orange-500" />
                  <span>Catalogue de produits</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Fonctionnalités Clés</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Authentification complète (email, OAuth, 2FA)</li>
                <li>• Gestion hiérarchique des équipes</li>
                <li>• Catalogue produits avec galerie photos et tags</li>
                <li>• Workflow commande → facture → paiement</li>
                <li>• Programme de fidélité clients</li>
                <li>• Gestion multi-adresses</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Modules détaillés */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Modules du Système</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Module Authentification */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-green-500" />
                <h3 className="text-xl font-bold text-gray-800">Authentification</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Gestion complète des utilisateurs avec rôles, sessions, OAuth et authentification à deux facteurs.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Tables principales:</span>
                  <span className="text-sm text-gray-600">User, Session, Account</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Sécurité:</span>
                  <span className="text-sm text-gray-600">2FA, Tokens sécurisés</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Chaque utilisateur peut avoir un profil client/vendeur.
                </div>
              </div>
            </div>

            {/* Module Organisation */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-8 h-8 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-800">Organisations</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Structure multi-tenant permettant à plusieurs entreprises de gérer leurs produits et équipes.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Hiérarchie:</span>
                  <span className="text-sm text-gray-600">Équipes imbriquées</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Scope:</span>
                  <span className="text-sm text-gray-600">Données isolées par org</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Une organisation = un magasin/entreprise indépendant.
                </div>
              </div>
            </div>

            {/* Module Produits */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-8 h-8 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-800">Produits</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Catalogue complet avec catégories, tags, galerie photos et gestion de stock.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Système de tags multiple</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Galerie photos avec image principale</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Support des SKU, code-barres, dimensions et poids.
                </div>
              </div>
            </div>

            {/* Module Commandes */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-bold text-gray-800">Commandes & Factures</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Workflow complet de commande à facturation avec suivi des statuts et paiements.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">Commande → Facture → Paiement</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Les commandes deviennent des factures après validation.
                </div>
              </div>
            </div>

            {/* Module Paiements */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-800">Paiements</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Gestion des transactions avec support multi-méthodes et suivi des statuts.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Méthodes:</span>
                  <span className="text-sm text-gray-600">6+ options</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Suivi:</span>
                  <span className="text-sm text-gray-600">Statuts détaillés</span>
                </div>
              </div>
            </div>

            {/* Module Clients */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-cyan-500" />
                <h3 className="text-xl font-bold text-gray-800">Clients & Fidélité</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Gestion des profils clients, adresses multiples et programme de fidélité.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm text-gray-600">Adresses livraison/facturation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Points et niveaux de fidélité</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Relations importantes */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Relations Clés</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">User ↔ Profil</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">One-to-One</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Un compte utilisateur peut avoir un profil détaillé (client/vendeur)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Organization ↔ Product</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">One-to-Many</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Une organisation possède plusieurs produits</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Product ↔ Tag</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Many-to-Many</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Un produit peut avoir plusieurs tags, un tag peut être sur plusieurs produits</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Order ↔ Invoice</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">One-to-One</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Une commande peut générer une facture</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Profil ↔ Address</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">One-to-Many</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Un client peut avoir plusieurs adresses</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Utilisation avec Prisma */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Utilisation avec Prisma Client</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Exemples de Requêtes</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-sm mb-2">Créer un produit avec tags</p>
                  <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`await prisma.product.create({
  data: {
    name: "Produit A",
    price: 29.99,
    organization: { connect: { id: orgId } },
    tags: {
      create: [
        { tag: { connect: { id: tag1Id } } },
        { tag: { connect: { id: tag2Id } } }
      ]
    }
  }
})`}
                  </pre>
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-2">Récupérer commandes avec factures</p>
                  <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`const orders = await prisma.order.findMany({
  where: { clientId: profileId },
  include: {
    items: { include: { product: true } },
    invoice: true,
    payments: true
  },
  orderBy: { createdAt: 'desc' }
})`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Workflow Typique</h3>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <span>Création d&apos;une organisation et équipes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <span>Ajout de produits avec catégories et tags</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <span>Création de commandes par les clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                    <span>Transformation en factures et paiements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                    <span>Suivi des points de fidélité</span>
                  </li>
                </ol>
              </div>

              <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl shadow-md p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Bonnes Pratiques</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Toujours utiliser les transactions pour les opérations financières</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Vérifier les permissions d&apos;organisation avant les opérations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Utiliser les indexes pour optimiser les requêtes fréquentes</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Pied de page */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-gray-400" />
              <span className="text-gray-600 font-medium">Schéma Prisma e-commerce</span>
            </div>
            <p className="text-gray-500 text-sm max-w-2xl">
              Ce schéma est conçu pour être extensible et maintenable. Toutes les relations sont optimisées
              avec des indexes appropriés et des contraintes de clés étrangères pour garantir l&apos;intégrité des données.
            </p>
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
              <span>• Support multi-organisations</span>
              <span>• Workflow complet</span>
              <span>• Sécurité renforcée</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}