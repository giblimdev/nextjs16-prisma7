// @/app/auth/register/page.tsx
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { signUp, signIn } from "@/lib/auth/auth-client";
import { Eye, EyeOff, Lock, Upload, X } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // Base64
  const [imagePreview, setImagePreview] = useState(""); // Pour l'aperçu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Conversion de l'image en base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide");
      return;
    }

    // Vérifier la taille (max 5MB)
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

    reader.onerror = () => {
      toast.error("Erreur lors de la lecture de l'image");
    };

    reader.readAsDataURL(file);
  };

  // ✅ Supprimer l'image
  const handleRemoveImage = () => {
    setImage("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name,
        email,
        password,
        image: image.trim() ? image.trim() : undefined,
      });

      setLoading(false);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Compte créé avec succès !");
        setTimeout(() => (window.location.href = "/"), 800);
      }
    } catch (err: unknown) {
      setLoading(false);
      const message = err instanceof Error ? err.message : "Erreur lors de l'inscription";
      toast.error(message);
    }
  };

  const handleSocial = async (provider: "github" | "google") => {
    try {
      await signIn.social({ provider });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur OAuth";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
          Créer un compte
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Nom */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Nom complet
            </label>
            <input
              type="text"
              required
              placeholder="Jean Dupont"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Photo de profil (optionnel)
            </label>
            
            {imagePreview ? (
              <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                <Image
                  src={imagePreview}
                  alt="Aperçu"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  aria-label="Supprimer l'image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Cliquez pour choisir une image
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Max 5MB - JPG, PNG, GIF
                </span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="jean@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Mot de passe
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="h-4 w-4" />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minimum 8 caractères
            </p>
          </div>

          {/* Password confirmation */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="h-4 w-4" />
              </span>

              <input
                type={showPasswordConfirm ? "text" : "password"}
                required
                placeholder="••••••••"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />

              <button
                type="button"
                onClick={() => setShowPasswordConfirm((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                aria-label={showPasswordConfirm ? "Masquer la confirmation" : "Afficher la confirmation"}
              >
                {showPasswordConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Création..." : "S'inscrire"}
          </button>
        </form>

        <div className="flex items-center my-6 gap-2">
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-gray-400 dark:text-gray-500 text-sm">ou</span>
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleSocial("github")}
            className="w-full border border-gray-300 dark:border-gray-600 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300 font-medium"
          >
            Continuer avec GitHub
          </button>
          <button
            onClick={() => handleSocial("google")}
            className="w-full border border-gray-300 dark:border-gray-600 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300 font-medium"
          >
            Continuer avec Google
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
          Déjà inscrit ?{" "}
          <Link href="/auth/signin" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
            Connectez-vous
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
