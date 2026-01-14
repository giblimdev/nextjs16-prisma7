// @/app/admin/organization/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Users,
  Package,
  MapPin,
  Phone,
  Mail,
  Globe,
  Loader2,
  UserCircle,
} from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  roles: string[];
}

interface Organization {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logo: string | null;
  order: number;
  users: User[];
  owner?: User | null;
  _count: {
    clients: number;
    products: number;
    teams: number;
    users: number;
  };
}

export default function AdminOrganizationPage() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch("/api/admin/organization");
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data.organizations);
      } else if (response.status === 403) {
        toast.error("Accès refusé - Rôle ADMIN requis");
        router.push("/");
      } else {
        toast.error("Erreur lors du chargement des organisations");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
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
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Organisation créée avec succès");
        setIsCreateOpen(false);
        resetForm();
        fetchOrganizations();
      } else {
        const data = await response.json();
        toast.error(data.error || "Erreur lors de la création");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrg) return;

    setSubmitting(true);

    try {
      const response = await fetch(`/api/admin/organization/${selectedOrg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Organisation modifiée avec succès");
        setIsEditOpen(false);
        setSelectedOrg(null);
        resetForm();
        fetchOrganizations();
      } else {
        const data = await response.json();
        toast.error(data.error || "Erreur lors de la modification");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedOrg) return;

    setSubmitting(true);

    try {
      const response = await fetch(`/api/admin/organization/${selectedOrg.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Organisation supprimée avec succès");
        setIsDeleteOpen(false);
        setSelectedOrg(null);
        fetchOrganizations();
      } else {
        const data = await response.json();
        toast.error(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (org: Organization) => {
    setSelectedOrg(org);
    setFormData({
      name: org.name,
      address: org.address || "",
      city: org.city || "",
      postalCode: org.postalCode || "",
      country: org.country || "France",
      phone: org.phone || "",
      email: org.email || "",
      website: org.website || "",
      logo: org.logo || "",
      order: org.order,
    });
    setIsEditOpen(true);
  };

  const openDeleteDialog = (org: Organization) => {
    setSelectedOrg(org);
    setIsDeleteOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Gestion des Organisations
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {organizations.length} organisation{organizations.length > 1 ? "s" : ""} enregistrée{organizations.length > 1 ? "s" : ""}
              </p>
            </div>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button size="lg" onClick={resetForm}>
                  <Plus className="w-5 h-5 mr-2" />
                  Créer une organisation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Créer une organisation</DialogTitle>
                  <DialogDescription>
                    Ajoutez un nouveau point de vente
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreate}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="create-name">Nom *</Label>
                      <Input
                        id="create-name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="create-address">Adresse</Label>
                      <Input
                        id="create-address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="create-city">Ville</Label>
                        <Input
                          id="create-city"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="create-postalCode">Code postal</Label>
                        <Input
                          id="create-postalCode"
                          value={formData.postalCode}
                          onChange={(e) =>
                            setFormData({ ...formData, postalCode: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="create-country">Pays</Label>
                      <Input
                        id="create-country"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="create-phone">Téléphone</Label>
                        <Input
                          id="create-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="create-email">Email</Label>
                        <Input
                          id="create-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="create-website">Site web</Label>
                      <Input
                        id="create-website"
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="create-order">Ordre d&apos;affichage</Label>
                      <Input
                        id="create-order"
                        type="number"
                        value={formData.order}
                        onChange={(e) =>
                          setFormData({ ...formData, order: parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Créer
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6">
          {organizations.map((org) => (
            <Card key={org.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{org.name}</CardTitle>
                      <CardDescription>ID: {org.id.slice(0, 8)}</CardDescription>
                      
                      {/* Affichage du propriétaire (premier user) */}
                      {org.owner && (
                        <div className="flex items-center gap-2 mt-2">
                          <UserCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Propriétaire: <span className="font-medium text-gray-900 dark:text-gray-100">{org.owner.name}</span>
                          </span>
                        </div>
                      )}

                      {/* Affichage du nombre total d'utilisateurs */}
                      {org.users.length > 1 && (
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {org.users.length} utilisateur{org.users.length > 1 ? "s" : ""} attaché{org.users.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(org)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteDialog(org)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {org.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Adresse
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {org.address}
                          {org.city && `, ${org.city}`}
                          {org.postalCode && ` ${org.postalCode}`}
                        </p>
                      </div>
                    </div>
                  )}
                  {org.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Téléphone
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{org.phone}</p>
                      </div>
                    </div>
                  )}
                  {org.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Email
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{org.email}</p>
                      </div>
                    </div>
                  )}
                  {org.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Site web
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{org.website}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Liste des utilisateurs attachés */}
                {org.users.length > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Utilisateurs de l&apos;organisation ({org.users.length})
                    </h4>
                    <div className="grid gap-2">
                      {org.users.map((user, index) => (
                        <div key={user.id} className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded">
                          <UserCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                              {user.name}
                              {index === 0 && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                                  Propriétaire
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                          <div className="flex gap-1">
                            {user.roles.map((role) => (
                              <span
                                key={role}
                                className="px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {org._count.products}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Produits</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {org._count.clients}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Clients</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {org._count.teams}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Équipes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {organizations.length === 0 && (
          <Card>
            <CardContent className="text-center py-16">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Aucune organisation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Commencez par créer votre première organisation
              </p>
            </CardContent>
          </Card>
        )}

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Modifier l&apos;organisation</DialogTitle>
              <DialogDescription>
                Modifiez les informations de l&apos;organisation
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEdit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nom *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-address">Adresse</Label>
                  <Input
                    id="edit-address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-city">Ville</Label>
                    <Input
                      id="edit-city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-postalCode">Code postal</Label>
                    <Input
                      id="edit-postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-country">Pays</Label>
                  <Input
                    id="edit-country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-phone">Téléphone</Label>
                    <Input
                      id="edit-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-website">Site web</Label>
                  <Input
                    id="edit-website"
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-order">Ordre d&apos;affichage</Label>
                  <Input
                    id="edit-order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer l&apos;organisation &quot;{selectedOrg?.name}&quot; ?
                Cette action est irréversible et supprimera toutes les données associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700"
              >
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Supprimer
              </AlertDialogAction> 
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
