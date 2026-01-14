"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "@/lib/auth/auth-client";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Connexion email/password
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn.email({ email, password });
      setLoading(false);

      if (error) toast.error(error.message);
      else {
        toast.success("Connexion réussie !");
        setTimeout(() => (window.location.href = "/"), 800);
      }
    } catch (err: unknown) {
      setLoading(false);
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de la connexion";
      toast.error(errorMessage);
    }
  };

  // Connexion OAuth
  const handleSocial = async (provider: "github" | "google") => {
    try {
      await signIn.social({ provider });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erreur OAuth";
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl"
    >
      <h1 className="text-2xl font-semibold text-center mb-6">Connexion</h1>

      <form onSubmit={handleSignIn} className="space-y-4">
        {/* Email Field */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail className="h-4 w-4" />
          </span>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password Field */}
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
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
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
        Pas encore de compte ?{" "}
        <Link
          href="/auth/register"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Inscrivez-vous
        </Link>
      </p>
    </motion.div>
  );
}
 