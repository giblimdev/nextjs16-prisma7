// @/app/user/addLoyalty/loyaltyForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Loader2, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoyaltyFormProps {
  onCancel: () => void;
}

export default function LoyaltyForm({ onCancel }: LoyaltyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast.error("Vous devez accepter les conditions d'utilisation");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/loyalty/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création");
      }

      setSuccess(true);
      toast.success("🎉 Carte de fidélité créée avec succès !");

      // Rediriger vers la page de la carte après 2 secondes
      setTimeout(() => {
        router.push("/client/loyalty");
      }, 2000);
    } catch (error) {
      console.error("Erreur:", error);
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Félicitations ! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Votre carte de fidélité a été créée avec succès
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Redirection en cours...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Créer ma carte de fidélité</CardTitle>
              <CardDescription>
                Remplissez le formulaire pour activer votre carte
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations sur la carte */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-80">Niveau de départ</p>
                <p className="text-2xl font-bold">Bronze</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Points initiaux</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
            <div className="border-t border-white/20 pt-4">
              <p className="text-sm opacity-80 mb-1">Numéro de carte</p>
              <p className="font-mono text-lg">Généré automatiquement</p>
            </div>
          </div>

          {/* Avantages immédiats */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              ✨ Vos avantages immédiats
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Accumulez 1 point par euro dépensé
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Offres exclusives membres
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Bonus de bienvenue : 10 points offerts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Suivi en temps réel de vos points
              </li>
            </ul>
          </div>

          {/* Conditions d'utilisation */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData({ ...formData, acceptTerms: e.target.checked })
                }
                className="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <Label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                J&apos;accepte les{" "}
                <Link
                  href="/public/loyaltyTerms"
                  target="_blank"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  conditions d&apos;utilisation
                </Link>{" "}
                et la{" "}
                <Link
                  href="/public/privacy"
                  target="_blank"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  politique de confidentialité
                </Link>
              </Label>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading || !formData.acceptTerms}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Création en cours...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Créer ma carte
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              size="lg"
            >
              Annuler
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            🔒 Vos données sont sécurisées et ne seront jamais partagées
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
