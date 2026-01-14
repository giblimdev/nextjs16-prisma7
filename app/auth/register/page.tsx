//@/app/auth/register/page.tsx
// 

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { signUp, signIn } from "@/lib/auth/auth-client";
import { Eye, EyeOff, Lock, Image as ImageIcon } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // URL (ou base64 si tu veux)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Les mots de passe ne correspondent pas.");
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

      if (error) toast.error(error.message);
      else {
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl"
    >
      <h1 className="text-2xl font-semibold text-center mb-6">Créer un compte</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />

        {/* Image (URL) */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <ImageIcon className="h-4 w-4" />
          </span>
          <input
            type="url"
            placeholder="Image (URL) — optionnel"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock className="h-4 w-4" />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Password confirmation */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock className="h-4 w-4" />
          </span>

          <input
            type={showPasswordConfirm ? "text" : "password"}
            required
            placeholder="Confirmer le mot de passe"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => setShowPasswordConfirm((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
            aria-label={
              showPasswordConfirm ? "Masquer la confirmation" : "Afficher la confirmation"
            }
          >
            {showPasswordConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Création..." : "S'inscrire"}
        </button>
      </form>

      <div className="flex items-center my-4 gap-2">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-gray-400 text-sm">ou</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleSocial("github")}
          className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Continuer avec GitHub
        </button>
        <button
          onClick={() => handleSocial("google")}
          className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Continuer avec Google
        </button>
      </div>

      <p className="text-center text-sm mt-6">
        Déjà inscrit ?{" "}
        <Link href="/auth/signin" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Connectez-vous
        </Link>
      </p>
    </motion.div>
  );
}
