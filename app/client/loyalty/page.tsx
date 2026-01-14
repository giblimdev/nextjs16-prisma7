// @/app/client/loyalty/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  Loader2,
  Gift,
  TrendingUp,
  Star,
  QrCode,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

interface FidelityCard {
  id: string;
  points: number;
  level: string;
  lastEarned: string | null;
  lastRedeemed: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  xpPoints: Array<{
    id: string;
    amount: number;
    reason: string | null;
    createdAt: string;
  }>;
}

export default function LoyaltyCardPage() {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  const [fidelityCard, setFidelityCard] = useState<FidelityCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchFidelityCard();
    }
  }, [user]);

  const fetchFidelityCard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/loyalty/getMyCard");

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la récupération");
      }

      const data = await response.json();
      setFidelityCard(data.fidelity);
    } catch (err) {
      console.error("Erreur:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Chargement de votre carte...
          </p>
        </div>
      </div>
    );
  }

  if (error || !fidelityCard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Aucune carte de fidélité
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error || "Vous n'avez pas encore de carte de fidélité"}
              </p>
              <Button onClick={() => (window.location.href = "/user/addLoyalty")}>
                Créer ma carte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Bronze":
        return "from-orange-900 to-orange-700";
      case "Silver":
        return "from-gray-400 to-gray-600";
      case "Gold":
        return "from-yellow-500 to-yellow-700";
      case "Platinum":
        return "from-purple-600 to-indigo-700";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Bronze":
        return "🥉";
      case "Silver":
        return "🥈";
      case "Gold":
        return "🥇";
      case "Platinum":
        return "💎";
      default:
        return "⭐";
    }
  };

  const totalXp = fidelityCard.xpPoints.reduce(
    (sum, xp) => sum + xp.amount,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            💳 Ma Carte de Fidélité
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Consultez vos points et avantages
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        {/* Carte de fidélité virtuelle */}
        <div
          className={`relative bg-gradient-to-br ${getLevelColor(
            fidelityCard.level || "Bronze"
          )} rounded-2xl p-8 text-white shadow-2xl overflow-hidden`}
        >
          {/* Pattern de fond */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
          </div>

          <div className="relative z-10">
            {/* Header de la carte */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/30">
                  {fidelityCard.user.image ? (
                    <Image
                      src={fidelityCard.user.image}
                      alt={fidelityCard.user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                      {fidelityCard.user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm opacity-80">Membre</p>
                  <p className="text-xl font-bold">{fidelityCard.user.name}</p>
                </div>
              </div>

              {/* Niveau */}
              <div className="text-right">
                <p className="text-sm opacity-80">Niveau</p>
                <p className="text-2xl font-bold flex items-center gap-2">
                  {getLevelIcon(fidelityCard.level || "Bronze")}
                  {fidelityCard.level}
                </p>
              </div>
            </div>

            {/* Points et XP */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5" />
                  <p className="text-sm opacity-80">Points</p>
                </div>
                <p className="text-3xl font-bold">{fidelityCard.points}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <p className="text-sm opacity-80">Total XP</p>
                </div>
                <p className="text-3xl font-bold">{totalXp}</p>
              </div>
            </div>

            {/* QR Code et ID */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs opacity-60 mb-1">ID Carte</p>
                <p className="font-mono text-sm">
                  {fidelityCard.id.substring(0, 16)}...
                </p>
                <p className="text-xs opacity-60 mt-2">
                  Membre depuis{" "}
                  {new Date(fidelityCard.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white p-3 rounded-lg">
                <QRCodeSVG
                  value={fidelityCard.id}
                  size={80}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Historique XP */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Historique des points
            </CardTitle>
            <CardDescription>
              {fidelityCard.xpPoints.length} transaction(s) au total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fidelityCard.xpPoints.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Aucune transaction pour le moment
                </p>
              ) : (
                fidelityCard.xpPoints.map((xp) => (
                  <div
                    key={xp.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          xp.amount > 0
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-red-100 dark:bg-red-900/20"
                        }`}
                      >
                        <Gift
                          className={`w-5 h-5 ${
                            xp.amount > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {xp.reason || "Transaction"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(xp.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        xp.amount > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {xp.amount > 0 ? "+" : ""}
                      {xp.amount} pts
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
