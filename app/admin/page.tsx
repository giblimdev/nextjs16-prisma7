// @/app/admin/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Building2, 
  Package, 
  ShoppingCart, 
  FileText, 
  Settings,
  BarChart3,
  Tag,
  Layers
} from 'lucide-react';

type Stats = {
  users: number;
  organizations: number;
  products: number;
  orders: number;
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si on a des données
  const hasData = stats && (
    stats.users > 0 || 
    stats.organizations > 0 || 
    stats.products > 0 || 
    stats.orders > 0
  );

  const sections = [
    {
      title: "Utilisateurs",
      description: "Gérer les utilisateurs et leurs rôles",
      icon: Users,
      href: "/admin/users",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "bg-blue-500",
      stats: "Gestion des accès"
    },
    {
      title: "Organisations",
      description: "Gérer les organisations et magasins",
      icon: Building2,
      href: "/admin/organizations",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "bg-purple-500",
      stats: "Boutiques & Artisans"
    },
    {
      title: "Produits",
      description: "Catalogue de produits",
      icon: Package,
      href: "/admin/products",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600 dark:text-green-400",
      borderColor: "bg-green-500",
      stats: "Inventaire global"
    },
    {
      title: "Commandes",
      description: "Suivi des commandes",
      icon: ShoppingCart,
      href: "/admin/orders",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600 dark:text-orange-400",
      borderColor: "bg-orange-500",
      stats: "Transactions"
    },
    {
      title: "Factures",
      description: "Gestion de la facturation",
      icon: FileText,
      href: "/admin/invoices",
      bgColor: "bg-red-500/10",
      iconColor: "text-red-600 dark:text-red-400",
      borderColor: "bg-red-500",
      stats: "Comptabilité"
    },
    {
      title: "Catégories",
      description: "Organisation des produits",
      icon: Tag,
      href: "/admin/categories",
      bgColor: "bg-pink-500/10",
      iconColor: "text-pink-600 dark:text-pink-400",
      borderColor: "bg-pink-500",
      stats: "Taxonomie"
    },
    {
      title: "Features (Dev)",
      description: "Gestion des fonctionnalités",
      icon: Layers,
      href: "/dev/features",
      bgColor: "bg-indigo-500/10",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      borderColor: "bg-indigo-500",
      stats: "Développement"
    },
    {
      title: "Statistiques",
      description: "Tableaux de bord et analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      bgColor: "bg-cyan-500/10",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      borderColor: "bg-cyan-500",
      stats: "Rapports"
    },
    {
      title: "Paramètres",
      description: "Configuration du système",
      icon: Settings,
      href: "/admin/settings",
      bgColor: "bg-gray-500/10",
      iconColor: "text-gray-600 dark:text-gray-400",
      borderColor: "bg-gray-500",
      stats: "Configuration"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            🎛️ Administration
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Tableau de bord de gestion du système
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats rapides - Afficher seulement si on a des données */}
        {hasData && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Utilisateurs</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {loading ? (
                      <span className="animate-pulse">--</span>
                    ) : (
                      stats?.users || 0
                    )}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Organisations</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {loading ? (
                      <span className="animate-pulse">--</span>
                    ) : (
                      stats?.organizations || 0
                    )}
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Produits</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {loading ? (
                      <span className="animate-pulse">--</span>
                    ) : (
                      stats?.products || 0
                    )}
                  </p>
                </div>
                <Package className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Commandes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {loading ? (
                      <span className="animate-pulse">--</span>
                    ) : (
                      stats?.orders || 0
                    )}
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        )}

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              >
                {/* Barre de couleur en haut */}
                <div className={`h-2 ${section.borderColor}`} />

                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${section.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${section.iconColor}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {section.stats}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {section.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-2 transition-transform duration-300">
                    Accéder
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50/50 dark:to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
