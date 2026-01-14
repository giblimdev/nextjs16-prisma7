// @/app/user/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Camera,
  Save,
  Loader2,
  Shield,
  Calendar,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ExtendedUser } from "./type";

export default function ProfilePage() {
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user as ExtendedUser | undefined;
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // ✅ Synchroniser les données utilisateur dès qu'elles sont disponibles
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setImage(user.image || "");
      setImagePreview(user.image || "");
    }
  }, [user]);

  // Upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image est trop grande (max 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage("");
    setImagePreview("");
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Le nom est requis");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      toast.error("Email invalide");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          image: image || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      toast.success("Profil mis à jour avec succès !");
      
      // Recharger la page après 1 seconde pour actualiser la session
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Erreur:", error);
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Déconnexion complète avec suppression du cookie
  const handleSignOut = async () => {
    setLoggingOut(true);
    
    try {
      // Appeler Better Auth signOut
      await signOut();
      
      // Supprimer tous les cookies Better Auth possibles
      const cookiesToDelete = [
        "better-auth.session_token",
        "better-auth.session-token",
        "session_token",
        "auth_session",
      ];

      cookiesToDelete.forEach(cookieName => {
        document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`;
        document.cookie = `${cookieName}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`;
      });

      toast.success("Déconnexion réussie");
      
      // Rediriger vers la page d'accueil
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.error("Erreur déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
      setLoggingOut(false);
    }
  };

  // Loading state
  if (isPending || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  const userRoles = user.roles || [];
  const formattedDate = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Mon Profil
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gérez vos informations personnelles
              </p>
            </div>

            {/* Bouton déconnexion dans le header */}
            <Button
              variant="outline"
              onClick={handleSignOut}
              disabled={loggingOut}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              {loggingOut ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Déconnexion...
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Se déconnecter
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Avatar et infos */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  {imagePreview ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-200 dark:ring-gray-700">
                      <Image
                        src={imagePreview}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold ring-4 ring-gray-200 dark:ring-gray-700">
                      {name?.[0]?.toUpperCase() || user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}

                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-4">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>

                {/* Rôles */}
                {userRoles.length > 0 && (
                  <div className="flex gap-2 mt-4 flex-wrap justify-center">
                    {userRoles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Infos supplémentaires */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Membre depuis {formattedDate}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Email {user.emailVerified ? "vérifié" : "non vérifié"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content - Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Informations personnelles
              </h3>

              <div className="space-y-6">
                {/* Nom */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="w-4 h-4" />
                    Nom complet
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="w-full"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="w-4 h-4" />
                    Adresse email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Utilisé pour la connexion et les notifications
                  </p>
                </div>

                {/* ID utilisateur (lecture seule) */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    ID Utilisateur
                  </label>
                  <Input
                    type="text"
                    value={user.id}
                    readOnly
                    disabled
                    className="w-full bg-gray-50 dark:bg-gray-900"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Identifiant unique (non modifiable)
                  </p>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer les modifications
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </div>

            {/* Section sécurité */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mt-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Sécurité
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Mot de passe
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Modifiez votre mot de passe
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Authentification à deux facteurs
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sécurisez votre compte avec 2FA
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Activer
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-600 dark:text-red-400">
                      Supprimer le compte
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Action irréversible
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
