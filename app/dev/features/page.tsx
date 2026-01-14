// @/app/dev/features/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  ChevronRight, 
  ChevronUp,
  ChevronDown,
  Plus, 
  Edit, 
  Trash2,
  Layers, 
  List, 
  CheckSquare, 
  Bug as BugIcon,
  Calendar,
  Clock,
  User,
  GripVertical,
  RefreshCw
} from "lucide-react";
import FeatureForm from "./FeatureForm";
import { 
  Feature, 
  FeatureType, 
  FeatureStatus, 
  FeaturePriority 
} from "@/lib/generated/prisma/client";
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
import { Button } from "@/components/ui/button";

// Types étendus pour l'affichage hiérarchique
type FeatureUser = {
  id: string;
  name: string;
  email: string;
};

type FeatureOrganization = {
  id: string;
  name: string;
};

type FeatureWithRelations = Omit<Feature, 'createdAt' | 'updatedAt' | 'dueDate' | 'startedAt' | 'completedAt'> & {
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  startedAt: string | null;
  completedAt: string | null;
  children?: FeatureWithRelations[];
  assignee?: FeatureUser | null;
  creator?: FeatureUser | null;
  organization?: FeatureOrganization | null;
  parent?: { id: string; title: string } | null;
};

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

/**
 * Icône selon le type de feature
 */
const getTypeIcon = (type: FeatureType) => {
  switch (type) {
    case "EPIC": return <Layers className="w-4 h-4" />;
    case "FEATURE": return <List className="w-4 h-4" />;
    case "TASK": return <CheckSquare className="w-4 h-4" />;
    case "BUG": return <BugIcon className="w-4 h-4" />;
  }
};

/**
 * Label selon le type
 */
const getTypeLabel = (type: FeatureType) => {
  const labels: Record<FeatureType, string> = {
    EPIC: "Epic",
    FEATURE: "Feature",
    TASK: "Task",
    BUG: "Bug"
  };
  return labels[type];
};

/**
 * Badge de statut coloré
 */
const StatusBadge = ({ status }: { status: FeatureStatus }) => {
  const colors: Record<FeatureStatus, string> = {
    BACKLOG: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    TODO: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    IN_PROGRESS: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    DONE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    ARCHIVED: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
  };

  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

/**
 * Badge de priorité
 */
const PriorityBadge = ({ priority }: { priority: FeaturePriority }) => {
  const colors: Record<FeaturePriority, string> = {
    LOW: "bg-gray-100 text-gray-600",
    MEDIUM: "bg-blue-100 text-blue-600",
    HIGH: "bg-orange-100 text-orange-600",
    CRITICAL: "bg-red-100 text-red-600"
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded ${colors[priority]}`}>
      {priority}
    </span>
  );
};

/**
 * Badge de type avec couleur
 */
const TypeBadge = ({ type }: { type: FeatureType }) => {
  const colors: Record<FeatureType, string> = {
    EPIC: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    FEATURE: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    TASK: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    BUG: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${colors[type]}`}>
      {getTypeIcon(type)}
      <span className="font-medium">{getTypeLabel(type)}</span>
    </span>
  );
};

/**
 * Vérifie si targetId est un descendant de parentId
 */
function isDescendant(
  targetId: string, 
  parentId: string, 
  allFeatures: FeatureWithRelations[]
): boolean {
  const findChildren = (id: string): string[] => {
    const children = allFeatures.filter(f => f.parentId === id);
    return [
      ...children.map(c => c.id),
      ...children.flatMap(c => findChildren(c.id))
    ];
  };
  
  return findChildren(parentId).includes(targetId);
}

/**
 * Carte Feature avec support hiérarchique
 */
interface FeatureCardProps {
  feature: FeatureWithRelations;
  onEdit: (f: FeatureWithRelations) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, newParentId: string | null) => void;
  onReorder: (id: string, direction: "up" | "down") => void;
  onAddChild: (parentId: string, type: FeatureType) => void;
  level?: number;
  allFeatures: FeatureWithRelations[];
  siblings: FeatureWithRelations[];
  index: number;
}

const FeatureCard = ({ 
  feature, 
  onEdit,
  onDelete,
  onMove,
  onReorder,
  onAddChild,
  level = 0,
  allFeatures,
  siblings,
  index
}: FeatureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const hasChildren = feature.children && feature.children.length > 0;

  const isFirst = index === 0;
  const isLast = index === siblings.length - 1;

  // Filtrer les parents possibles (pas soi-même ni ses descendants)
  const possibleParents = allFeatures.filter(f => 
    f.id !== feature.id && 
    !isDescendant(f.id, feature.id, allFeatures)
  );

  // Déterminer les types d'enfants possibles selon le type parent
  const getChildTypes = (parentType: FeatureType): Array<{ type: FeatureType; label: string }> => {
    switch (parentType) {
      case "EPIC":
        return [
          { type: "FEATURE", label: "Feature" },
          { type: "BUG", label: "Bug" }
        ];
      case "FEATURE":
        return [
          { type: "TASK", label: "Task" },
          { type: "BUG", label: "Bug" }
        ];
      case "TASK":
        return [
          { type: "BUG", label: "Bug" }
        ];
      case "BUG":
        return [];
      default:
        return [];
    }
  };

  const childTypes = getChildTypes(feature.type);

  return (
    <div className="border-l-2 border-gray-200 dark:border-gray-700">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        className={`group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${
          level > 0 ? "ml-6" : ""
        }`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            {/* Partie gauche */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Bouton expand/collapse */}
              {hasChildren ? (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                  aria-label={isExpanded ? "Réduire" : "Étendre"}
                >
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>
              ) : (
                <div className="w-6" />
              )}
              
              <div className="flex-1 min-w-0">
                {/* Titre et type */}
                <div className="flex items-center gap-2 mb-2">
                  <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                  <TypeBadge type={feature.type} />
                  <h3 
                    className="font-semibold text-gray-900 dark:text-gray-100 truncate cursor-pointer hover:text-indigo-600"
                    onClick={() => onEdit(feature)}
                  >
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                {feature.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 ml-6">
                    {feature.description}
                  </p>
                )}

                {/* Métadonnées */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 ml-6">
                  {feature.assignee && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{feature.assignee.name}</span>
                    </div>
                  )}
                  
                  {feature.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(feature.dueDate).toLocaleDateString("fr-FR")}</span>
                    </div>
                  )}

                  {feature.estimatedHours && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{feature.estimatedHours}h</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Partie droite - Badges et actions */}
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-1">
                <PriorityBadge priority={feature.priority} />
                <StatusBadge status={feature.status} />
              </div>
              
              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1 bg-gray-50 dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    {/* Flèches de réordonnancement */}
                    <div className="flex flex-col gap-0 border-r border-gray-200 dark:border-gray-700 pr-1">
                      <button
                        onClick={() => onReorder(feature.id, "up")}
                        disabled={isFirst}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Monter"
                        title="Monter"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onReorder(feature.id, "down")}
                        disabled={isLast}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Descendre"
                        title="Descendre"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Boutons d'ajout d'enfants */}
                    {childTypes.length > 0 && (
                      <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-1">
                        {childTypes.map(({ type, label }) => (
                          <Button
                            key={type}
                            size="sm"
                            variant="ghost"
                            onClick={() => onAddChild(feature.id, type)}
                            className="h-7 px-2 text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900"
                            title={`Ajouter ${label}`}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            {label}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Sélecteur de parent */}
                    <select
                      value={feature.parentId || ""}
                      onChange={(e) => onMove(feature.id, e.target.value || null)}
                      className="text-xs px-2 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-600"
                      onClick={(e) => e.stopPropagation()}
                      title="Déplacer vers"
                    >
                      <option value="">📁 Racine</option>
                      {possibleParents.map(p => (
                        <option key={p.id} value={p.id}>
                          📂 {p.title}
                        </option>
                      ))}
                    </select>

                    {/* Modifier */}
                    <button
                      onClick={() => onEdit(feature)}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition text-blue-600"
                      aria-label="Modifier"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    {/* Supprimer */}
                    <button
                      onClick={() => onDelete(feature.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded transition text-red-600"
                      aria-label="Supprimer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Enfants (récursif) */}
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pl-4 pb-4 space-y-2">
                {feature.children!.map((child, idx) => (
                  <FeatureCard
                    key={child.id}
                    feature={child}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMove={onMove}
                    onReorder={onReorder}
                    onAddChild={onAddChild}
                    level={level + 1}
                    allFeatures={allFeatures}
                    siblings={feature.children!}
                    index={idx}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/**
 * Page principale avec gestion hiérarchique
 */
export default function FeaturesPage() {
  const [features, setFeatures] = useState<FeatureWithRelations[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<FeatureWithRelations | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [availableUsers, setAvailableUsers] = useState<FeatureUser[]>([]);
  const [availableOrganizations, setAvailableOrganizations] = useState<FeatureOrganization[]>([]);
  const [newFeatureType, setNewFeatureType] = useState<FeatureType>("EPIC");
  const [newFeatureParentId, setNewFeatureParentId] = useState<string | null>(null);
  const [isNormalizing, setIsNormalizing] = useState(false);

  /**
   * Normalise les orders pour qu'ils soient séquentiels
   */
  const normalizeOrdersForFeatures = async () => {
    setIsNormalizing(true);
    
    const grouped = new Map<string, FeatureWithRelations[]>();
    
    features.forEach(f => {
      const key = f.parentId || "root";
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(f);
    });

    const updates: Promise<Response>[] = [];
    
    grouped.forEach((siblings) => {
      siblings.sort((a, b) => a.order - b.order);
      
      siblings.forEach((sibling, index) => {
        if (sibling.order !== index) {
          updates.push(
            fetch(`/api/feature/${sibling.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ order: index }),
            })
          );
        }
      });
    });

    if (updates.length > 0) {
      try {
        await Promise.all(updates);
        toast.success(`${updates.length} orders normalisés`);
        
        const updated = await fetch("/api/feature");
        if (updated.ok) {
          const data: FeatureWithRelations[] = await updated.json();
          setFeatures(data);
        }
      } catch (error) {
        console.error("Erreur normalisation:", error);
        toast.error("Erreur lors de la normalisation");
      }
    } else {
      toast.info("Les orders sont déjà normalisés");
    }
    
    setIsNormalizing(false);
  };

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const [featuresRes, usersRes, orgsRes] = await Promise.all([
          fetch("/api/feature"),
          fetch("/api/users"),
          fetch("/api/organizations")
        ]);

        if (!featuresRes.ok) throw new Error("Erreur de chargement des features");
        
        const featuresData: FeatureWithRelations[] = await featuresRes.json();
        
        if (!ignore) {
          setFeatures(featuresData);
          
          if (usersRes.ok) {
            const usersData: FeatureUser[] = await usersRes.json();
            setAvailableUsers(usersData);
          }
          
          if (orgsRes.ok) {
            const orgsData: FeatureOrganization[] = await orgsRes.json();
            setAvailableOrganizations(orgsData);
          }
        }
      } catch (error) {
        if (!ignore) {
          console.error(error);
          toast.error("Impossible de charger les features");
        }
      }
    };

    fetchData();
    return () => { ignore = true; };
  }, []);

  const buildTree = (items: FeatureWithRelations[]): FeatureWithRelations[] => {
    const map = new Map<string, FeatureWithRelations>();
    const roots: FeatureWithRelations[] = [];

    items.forEach(item => {
      map.set(item.id, { ...item, children: [] });
    });

    items.forEach(item => {
      const node = map.get(item.id)!;
      if (item.parentId) {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children!.push(node);
        } else {
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    // Trier par order
    const sortByOrder = (items: FeatureWithRelations[]) => {
      items.sort((a, b) => a.order - b.order);
      items.forEach(item => {
        if (item.children && item.children.length > 0) {
          sortByOrder(item.children);
        }
      });
    };

    sortByOrder(roots);
    return roots;
  };

  const tree = buildTree(features);

  const handleCreate = () => {
    setSelectedFeature(null);
    setNewFeatureParentId(null);
    setNewFeatureType("EPIC");
    setIsOpen(true);
  };

  const handleAddChild = (parentId: string, type: FeatureType) => {
    setSelectedFeature(null);
    setNewFeatureParentId(parentId);
    setNewFeatureType(type);
    setIsOpen(true);
  };

  const handleEdit = (feature: FeatureWithRelations) => {
    setSelectedFeature(feature);
    setIsOpen(true);
  };

  const handleSubmit = async (formData: FeatureFormData) => {
    const method = selectedFeature ? "PUT" : "POST";
    const url = selectedFeature
      ? `/api/feature/${selectedFeature.id}`
      : "/api/feature";

    // Si création, calculer l'order automatiquement
    let dataToSubmit = formData;
    
    if (!selectedFeature) {
      // Trouver les siblings pour déterminer le prochain order
      const siblings = features.filter(f => f.parentId === newFeatureParentId);
      const maxOrder = siblings.length > 0 
        ? Math.max(...siblings.map(s => s.order)) 
        : -1;
      
      dataToSubmit = { 
        ...formData, 
        parentId: newFeatureParentId, 
        type: newFeatureType,
        order: maxOrder + 1
      };
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erreur lors de la sauvegarde");
      }

      toast.success(
        selectedFeature ? "Feature mise à jour" : "Feature créée"
      );

      setIsOpen(false);
      
      const updated = await fetch("/api/feature");
      if (updated.ok) {
        const data: FeatureWithRelations[] = await updated.json();
        setFeatures(data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/feature/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erreur lors de la suppression");
      }

      toast.success("Feature supprimée");
      setFeatures(features.filter(f => f.id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression");
    }
  };

  const handleMove = async (id: string, newParentId: string | null) => {
    try {
      const res = await fetch(`/api/feature/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentId: newParentId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erreur lors du déplacement");
      }

      toast.success("Feature déplacée");
      
      const updated = await fetch("/api/feature");
      if (updated.ok) {
        const data: FeatureWithRelations[] = await updated.json();
        setFeatures(data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Erreur lors du déplacement");
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const feature = features.find(f => f.id === id);
    if (!feature) {
      console.error("Feature non trouvée:", id);
      return;
    }

    // Trouver les siblings (même parent) et les trier par order
    const siblings = features
      .filter(f => f.parentId === feature.parentId)
      .sort((a, b) => a.order - b.order);

    console.log("Siblings:", siblings.map(s => ({ id: s.id, title: s.title, order: s.order })));

    const currentIndex = siblings.findIndex(s => s.id === id);
    if (currentIndex === -1) {
      console.error("Index non trouvé");
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= siblings.length) {
      console.log("Impossible de déplacer:", { currentIndex, newIndex, siblingsLength: siblings.length });
      return;
    }

    const targetFeature = siblings[newIndex];

    console.log("Échange:", {
      current: { id: feature.id, title: feature.title, order: feature.order },
      target: { id: targetFeature.id, title: targetFeature.title, order: targetFeature.order }
    });

    try {
      // Échanger les valeurs d'order
      const currentOrder = feature.order;
      const targetOrder = targetFeature.order;

      // Mise à jour optimiste de l'UI
      const updatedFeatures = features.map(f => {
        if (f.id === id) {
          return { ...f, order: targetOrder };
        }
        if (f.id === targetFeature.id) {
          return { ...f, order: currentOrder };
        }
        return f;
      });
      setFeatures(updatedFeatures);

      // Échanger les orders dans la DB
      const results = await Promise.all([
        fetch(`/api/feature/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: targetOrder }),
        }),
        fetch(`/api/feature/${targetFeature.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: currentOrder }),
        }),
      ]);

      console.log("Résultats API:", {
        result1: { ok: results[0].ok, status: results[0].status },
        result2: { ok: results[1].ok, status: results[1].status }
      });

      // Vérifier que les deux requêtes ont réussi
      if (!results[0].ok || !results[1].ok) {
        const error1 = await results[0].json().catch(() => ({}));
        const error2 = await results[1].json().catch(() => ({}));
        console.error("Erreurs API:", { error1, error2 });
        throw new Error("Erreur lors de la mise à jour");
      }

      toast.success("Ordre mis à jour");

      // Rafraîchir pour synchroniser
      const updated = await fetch("/api/feature");
      if (updated.ok) {
        const data: FeatureWithRelations[] = await updated.json();
        setFeatures(data);
        console.log("Features rafraîchies:", data.length);
      }
    } catch (error) {
      console.error("Erreur handleReorder:", error);
      toast.error("Erreur lors du réordonnancement");
      
      // Recharger en cas d'erreur
      const updated = await fetch("/api/feature");
      if (updated.ok) {
        const data: FeatureWithRelations[] = await updated.json();
        setFeatures(data);
      }
    }
  };

  const possibleParents = features.filter(f => 
    !selectedFeature || (f.id !== selectedFeature.id && !isDescendant(f.id, selectedFeature.id, features))
  );

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
            Gestion des Features
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {features.length} item{features.length > 1 ? "s" : ""} au total
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreate} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un Epic
          </Button>
          
          <Button 
            onClick={normalizeOrdersForFeatures} 
            variant="outline"
            size="lg"
            disabled={isNormalizing}
            title="Réorganiser les orders séquentiellement (0, 1, 2...)"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isNormalizing ? 'animate-spin' : ''}`} />
            Normaliser Orders
          </Button>
        </div>
      </div>

      {/* Aide visuelle */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📚 Hiérarchie et Ordre
        </h3>
        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <p><strong>Epic</strong> → Peut contenir des Features et des Bugs</p>
          <p className="ml-4"><strong>Feature</strong> → Peut contenir des Tasks et des Bugs</p>
          <p className="ml-8"><strong>Task</strong> → Peut contenir des Bugs</p>
          <p className="ml-12"><strong>Bug</strong> → Ne peut pas avoir d&apos;enfants</p>
          <p className="mt-2"><strong>Ordre</strong>: Utilisez ↑ ↓ pour réorganiser les items. Cliquez sur &quot;Normaliser Orders&quot; si les orders semblent incorrects.</p>
        </div>
      </div>

      {/* Liste des features */}
      <div className="space-y-3">
        {tree.length > 0 ? (
          tree.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onEdit={handleEdit}
              onDelete={setDeleteId}
              onMove={handleMove}
              onReorder={handleReorder}
              onAddChild={handleAddChild}
              allFeatures={features}
              siblings={tree}
              index={index}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Aucune feature</p>
            <p className="text-sm">Commencez par ajouter un Epic</p>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isOpen && (
        <FeatureForm
          initialData={selectedFeature}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          availableParents={possibleParents.map(f => ({ id: f.id, title: f.title }))}
          availableUsers={availableUsers}
          availableOrganizations={availableOrganizations}
          presetType={selectedFeature ? undefined : newFeatureType}
          presetParentId={selectedFeature ? undefined : newFeatureParentId}
        />
      )}

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La feature et tous ses enfants seront supprimés définitivement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
