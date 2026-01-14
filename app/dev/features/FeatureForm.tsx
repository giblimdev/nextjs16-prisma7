// @/app/dev/features/FeatureForm.tsx
"use client";

import { useState, useEffect } from "react";
import {
  FeaturePriority,
  FeatureStatus,
  FeatureType,
} from "@/lib/generated/prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Types pour les relations
type FeatureUser = {
  id: string;
  name: string;
  email: string;
};

type FeatureOrganization = {
  id: string;
  name: string;
};

type FeatureParent = {
  id: string;
  title: string;
};

// Type pour les données du formulaire
export type FeatureFormData = {
  title: string;
  slug?: string | null;
  description?: string | null;
  type: FeatureType;
  status: FeatureStatus;
  priority: FeaturePriority;
  order?: number;
  dueDate?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  estimatedPoints?: number | null;
  estimatedHours?: number | null;
  parentId?: string | null;
  organizationId?: string | null;
  assigneeId?: string | null;
};

// Type pour initialData
type InitialFeatureData = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  type: FeatureType;
  status: FeatureStatus;
  priority: FeaturePriority;
  order: number;
  dueDate: string | null;
  startedAt: string | null;
  completedAt: string | null;
  estimatedPoints: number | null;
  estimatedHours: number | null;
  parentId: string | null;
  organizationId: string | null;
  assigneeId: string | null;
  creatorId: string | null;
};

interface FeatureFormProps {
  initialData?: InitialFeatureData | null;
  onClose: () => void;
  onSubmit: (data: FeatureFormData) => void | Promise<void>;
  availableParents?: FeatureParent[];
  availableUsers?: FeatureUser[];
  availableOrganizations?: FeatureOrganization[];
  presetType?: FeatureType;
  presetParentId?: string | null;
}

/**
 * Formulaire de feature avec preset de type
 */
export default function FeatureForm({
  initialData,
  onClose,
  onSubmit,
  availableUsers = [],
  presetType,
  presetParentId,
}: FeatureFormProps) {
  const [form, setForm] = useState<FeatureFormData>({
    title: "",
    slug: null,
    description: null,
    type: presetType || "FEATURE",
    status: "BACKLOG",
    priority: "MEDIUM",
    order: 0,
    dueDate: null,
    startedAt: null,
    completedAt: null,
    estimatedPoints: null,
    estimatedHours: null,
    parentId: presetParentId || null,
    organizationId: null,
    assigneeId: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!initialData) return;

    setForm({
      title: initialData.title,
      slug: initialData.slug,
      description: initialData.description,
      type: initialData.type,
      status: initialData.status,
      priority: initialData.priority,
      order: initialData.order,
      dueDate: initialData.dueDate
        ? new Date(initialData.dueDate).toISOString().split("T")[0]
        : null,
      startedAt: initialData.startedAt
        ? new Date(initialData.startedAt).toISOString().split("T")[0]
        : null,
      completedAt: initialData.completedAt
        ? new Date(initialData.completedAt).toISOString().split("T")[0]
        : null,
      estimatedPoints: initialData.estimatedPoints,
      estimatedHours: initialData.estimatedHours,
      parentId: initialData.parentId,
      organizationId: initialData.organizationId,
      assigneeId: initialData.assigneeId,
    });
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const cleanedData: FeatureFormData = {
        title: form.title.trim(),
        slug: form.slug?.trim() || null,
        description: form.description?.trim() || null,
        type: form.type,
        status: form.status,
        priority: form.priority,
        order: form.order || 0,
        dueDate: form.dueDate || null,
        startedAt: form.startedAt || null,
        completedAt: form.completedAt || null,
        estimatedPoints: form.estimatedPoints || null,
        estimatedHours: form.estimatedHours || null,
        parentId: form.parentId || null,
        organizationId: form.organizationId || null,
        assigneeId: form.assigneeId || null,
      };

      await onSubmit(cleanedData);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStringChange = (field: keyof FeatureFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value || null }));
  };

  const handleNumberChange = (field: keyof FeatureFormData, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    setForm((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleSelectChange = <T extends string>(field: keyof FeatureFormData, value: T) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNullableSelectChange = (field: keyof FeatureFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value === "none" ? null : value }));
  };

  const getTypeLabel = (type: FeatureType) => {
    const labels: Record<FeatureType, string> = {
      EPIC: "Epic",
      FEATURE: "Feature",
      TASK: "Task",
      BUG: "Bug"
    };
    return labels[type];
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData 
              ? `Modifier ${getTypeLabel(form.type)}`
              : `Nouvelle ${getTypeLabel(form.type)}`
            }
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations. Les champs marqués * sont obligatoires.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Informations de base
            </h3>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleStringChange("title", e.target.value)}
                  placeholder={`Ex: ${form.type === "EPIC" ? "Système d'authentification" : "Ajouter OAuth"}`}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description ?? ""}
                  onChange={(e) => handleStringChange("description", e.target.value)}
                  placeholder="Décrivez en détail..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Classification
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status">Statut *</Label>
                <Select
                  value={form.status}
                  onValueChange={(value: FeatureStatus) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BACKLOG">BACKLOG</SelectItem>
                    <SelectItem value="TODO">TODO</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                    <SelectItem value="DONE">DONE</SelectItem>
                    <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priorité *</Label>
                <Select
                  value={form.priority}
                  onValueChange={(value: FeaturePriority) => handleSelectChange("priority", value)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">LOW</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                    <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {availableUsers.length > 0 && (
                <div>
                  <Label htmlFor="assigneeId">Assigné à</Label>
                  <Select
                    value={form.assigneeId ?? "none"}
                    onValueChange={(value) => handleNullableSelectChange("assigneeId", value)}
                  >
                    <SelectTrigger id="assigneeId">
                      <SelectValue placeholder="Non assigné" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Non assigné</SelectItem>
                      {availableUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Dates clés
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dueDate">Date limite</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={form.dueDate ?? ""}
                  onChange={(e) => handleStringChange("dueDate", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="startedAt">Date de début</Label>
                <Input
                  id="startedAt"
                  type="date"
                  value={form.startedAt ?? ""}
                  onChange={(e) => handleStringChange("startedAt", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="completedAt">Date de fin</Label>
                <Input
                  id="completedAt"
                  type="date"
                  value={form.completedAt ?? ""}
                  onChange={(e) => handleStringChange("completedAt", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Estimations */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Estimations
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="estimatedPoints">Points estimés</Label>
                <Input
                  id="estimatedPoints"
                  type="number"
                  value={form.estimatedPoints ?? ""}
                  onChange={(e) => handleNumberChange("estimatedPoints", e.target.value)}
                  placeholder="Ex: 5"
                />
              </div>

              <div>
                <Label htmlFor="estimatedHours">Heures estimées</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  step="0.5"
                  value={form.estimatedHours ?? ""}
                  onChange={(e) => handleNumberChange("estimatedHours", e.target.value)}
                  placeholder="Ex: 8.5"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : (initialData ? "Mettre à jour" : "Créer")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
