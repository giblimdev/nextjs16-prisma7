// @/components/AddOrganisationForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AddOrganisationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    phone: "",
    email: "",
    website: "",
    logo: "",
    order: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/organization/creat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'organisation");
      }

      const data = await response.json();

      toast.success("Point de vente créé !", {
        description: "Votre point de vente a été créé avec succès.",
      });

      // Redirection vers la page de l'organisation
      router.push(`/vendor/organization`);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de la création du point de vente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom de l'organisation */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">
            Nom du point de vente <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Ex: La Boutique du Coin"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        {/* Adresse */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="Ex: 123 Rue de la République"
            value={formData.address}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Ville */}
        <div className="space-y-2">
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            name="city"
            type="text"
            placeholder="Ex: Paris"
            value={formData.city}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Code postal */}
        <div className="space-y-2">
          <Label htmlFor="postalCode">Code postal</Label>
          <Input
            id="postalCode"
            name="postalCode"
            type="text"
            placeholder="Ex: 75001"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Pays */}
        <div className="space-y-2">
          <Label htmlFor="country">Pays</Label>
          <Select
            value={formData.country}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, country: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un pays" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Belgique">Belgique</SelectItem>
              <SelectItem value="Suisse">Suisse</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Luxembourg">Luxembourg</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Téléphone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Ex: +33 1 23 45 67 89"
            value={formData.phone}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Ex: contact@boutique.fr"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Site web */}
        <div className="space-y-2">
          <Label htmlFor="website">Site web</Label>
          <Input
            id="website"
            name="website"
            type="url"
            placeholder="Ex: https://www.boutique.fr"
            value={formData.website}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Logo URL */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="logo">URL du logo</Label>
          <Input
            id="logo"
            name="logo"
            type="url"
            placeholder="Ex: https://exemple.com/logo.png"
            value={formData.logo}
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Entrez l&apos;URL d&apos;une image hébergée en ligne
          </p>
        </div>

        {/* Ordre d'affichage */}
        <div className="space-y-2">
          <Label htmlFor="order">Ordre d&apos;affichage</Label>
          <Input
            id="order"
            name="order"
            type="number"
            min="1"
            value={formData.order}
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Définit la priorité d&apos;affichage (1 = premier)
          </p>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 sm:flex-none"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Création en cours...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Créer mon point de vente
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
          className="flex-1 sm:flex-none"
          size="lg"
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
