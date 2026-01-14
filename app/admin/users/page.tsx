// @/app/admin/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Shield,
  User,
  Calendar,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Types
type UserRole = "ADMIN" | "DEV" | "VENDOR" | "CLIENT" | "USER";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
};

// Configuration des rôles
const ROLE_CONFIG: Record<UserRole, { label: string; color: string; icon: string }> = {
  ADMIN: { label: "Admin", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", icon: "👑" },
  DEV: { label: "Dev", color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", icon: "💻" },
  VENDOR: { label: "Vendor", color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", icon: "🏪" },
  CLIENT: { label: "Client", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", icon: "🛒" },
  USER: { label: "User", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300", icon: "👤" },
};

// Badge de rôle
const RoleBadge = ({ role }: { role: UserRole }) => {
  const config = ROLE_CONFIG[role];
  return (
    <Badge className={`${config.color} border-0 font-medium`}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedRoleToAdd, setSelectedRoleToAdd] = useState<UserRole | "">("");
  const [searchQuery, setSearchQuery] = useState("");

  // Charger les utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Erreur de chargement");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger les utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un rôle
  const handleAddRole = async (userId: string, role: UserRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur");
      }

      const updatedUser = await response.json();
      setUsers(users.map(u => u.id === userId ? updatedUser : u));
      toast.success(`Rôle ${ROLE_CONFIG[role].label} ajouté`);
      setIsRoleDialogOpen(false);
      setSelectedRoleToAdd("");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'ajout du rôle");
    }
  };

  // Retirer un rôle
  const handleRemoveRole = async (userId: string, role: UserRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/roles`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur");
      }

      const updatedUser = await response.json();
      setUsers(users.map(u => u.id === userId ? updatedUser : u));
      toast.success(`Rôle ${ROLE_CONFIG[role].label} retiré`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression du rôle");
    }
  };

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Rôles disponibles pour ajout
  const getAvailableRoles = (user: User): UserRole[] => {
    return Object.keys(ROLE_CONFIG).filter(
      role => !user.roles.includes(role as UserRole)
    ) as UserRole[];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Gestion des utilisateurs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {users.length} utilisateur{users.length > 1 ? "s" : ""} enregistré{users.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <Input
          placeholder="Rechercher par nom ou email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Tableau des utilisateurs */}
      <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vérifié</TableHead>
              <TableHead>Rôles</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  {/* Utilisateur */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.image || undefined} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {user.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </TableCell>

                  {/* Vérifié */}
                  <TableCell>
                    {user.emailVerified ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Vérifié</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-400">
                        <XCircle className="w-4 h-4" />
                        <span className="text-xs">Non vérifié</span>
                      </div>
                    )}
                  </TableCell>

                  {/* Rôles */}
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <div key={role} className="group relative">
                          <RoleBadge role={role} />
                          {user.roles.length > 1 && (
                            <button
                              onClick={() => handleRemoveRole(user.id, role)}
                              className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                              title={`Retirer ${ROLE_CONFIG[role].label}`}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* Date de création */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsRoleDialogOpen(true);
                      }}
                      disabled={getAvailableRoles(user).length === 0}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter rôle
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog pour ajouter un rôle */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un rôle</DialogTitle>
            <DialogDescription>
              Sélectionnez un rôle à ajouter à {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Rôles actuels */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Rôles actuels
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedUser?.roles.map((role) => (
                  <RoleBadge key={role} role={role} />
                ))}
              </div>
            </div>

            {/* Sélection nouveau rôle */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Nouveau rôle
              </label>
              <Select
                value={selectedRoleToAdd}
                onValueChange={(value) => setSelectedRoleToAdd(value as UserRole)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {selectedUser &&
                    getAvailableRoles(selectedUser).map((role) => (
                      <SelectItem key={role} value={role}>
                        <div className="flex items-center gap-2">
                          <span>{ROLE_CONFIG[role].icon}</span>
                          <span>{ROLE_CONFIG[role].label}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsRoleDialogOpen(false);
                setSelectedRoleToAdd("");
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={() => {
                if (selectedUser && selectedRoleToAdd) {
                  handleAddRole(selectedUser.id, selectedRoleToAdd as UserRole);
                }
              }}
              disabled={!selectedRoleToAdd}
            >
              <Plus className="w-4 h-4 mr-1" />
              Ajouter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
