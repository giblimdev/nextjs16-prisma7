"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Bug,
  Sprout,
  Flower2,
  Leaf,
  ThermometerSun,
  CloudRain,
  Check,
  X,
  UtensilsCrossed,
  Shield,
} from "lucide-react";

type Plant = {
  id: number;
  name: string;
  type: string;
  isEdible: boolean;
  isAdaptedToPopayan: boolean;
  description: string;
  actions: string[];
  targets: string[];
  companionPlants: string[];
  tipsForPopayan: string;
};

const plantsData: Plant[] = [
  {
    id: 1,
    name: "Géranium odorant",
    type: "répulsive",
    isEdible: false,
    isAdaptedToPopayan: true,
    description:
      "Plante vivace aux feuilles très aromatiques qui repousse efficacement les insectes volants.",
    actions: ["Repousse moustiques", "Éloigne aleurodes", "Protège contre pucerons"],
    targets: ["Moustiques", "Aleurodes", "Pucerons"],
    companionPlants: ["Tomates", "Poivrons", "Choux"],
    tipsForPopayan:
      "Planter en bordure de serre ou en pots. Excellente adaptation au climat de Popayán. Fleurs décoratives.",
  },
  {
    id: 2,
    name: "Œillet d'Inde (Tagète)",
    type: "répulsive/nématocide",
    isEdible: true,
    isAdaptedToPopayan: true,
    description:
      "Fleur annuelle dont les racines sécrètent une substance toxique pour les nématodes.",
    actions: ["Élimine nématodes", "Repousse aleurodes", "Attire auxiliaires"],
    targets: ["Nématodes", "Aleurodes", "Mildiou"],
    companionPlants: ["Tomates", "Pommes de terre", "Aubergines"],
    tipsForPopayan:
      "Planter densément avant cultures sensibles. S'adapte parfaitement à l'altitude. Fleurs comestibles.",
  },
  {
    id: 3,
    name: "Basilic",
    type: "répulsive/comestible",
    isEdible: true,
    isAdaptedToPopayan: true,
    description:
      "Herbe aromatique culinaire qui repousse naturellement les mouches blanches et moustiques.",
    actions: ["Repousse mouches blanches", "Protège tomates", "Améliore saveur voisines"],
    targets: ["Aleurodes", "Moustiques", "Thrips"],
    companionPlants: ["Tomates", "Poivrons", "Asperges"],
    tipsForPopayan:
      "Cultiver en plein soleil, protéger des fortes pluies. Production continue possible.",
  },
  {
    id: 4,
    name: "Menthe",
    type: "répulsive/comestible",
    isEdible: true,
    isAdaptedToPopayan: true,
    description:
      "Plante vivace très vigoureuse qui éloigne de nombreux ravageurs par son arôme puissant.",
    actions: ["Repousse fourmis", "Éloigne pucerons", "Protège choux"],
    targets: ["Fourmis", "Pucerons", "Altises"],
    companionPlants: ["Choux", "Carottes", "Tomates"],
    tipsForPopayan: "CULTIVER UNIQUEMENT EN POT (invasif). Excellente adaptation au climat frais.",
  },
  {
    id: 5,
    name: "Capucine",
    type: "plante-piège/comestible",
    isEdible: true,
    isAdaptedToPopayan: true,
    description:
      "Plante qui attire les pucerons, les détournant ainsi des cultures principales.",
    actions: ["Attire pucerons", "Protège fruitiers", "Fleurs comestibles"],
    targets: ["Pucerons (piège)", "Altises", "Chenilles"],
    companionPlants: ["Arbres fruitiers", "Choux", "Haricots"],
    tipsForPopayan: "Planter près des cultures précieuses. Variétés grimpantes sur treillis.",
  },
  {
    id: 6,
    name: "Ail",
    type: "fongicide/comestible",
    isEdible: true,
    isAdaptedToPopayan: true,
    description:
      "Bulbe aux propriétés antifongiques naturelles qui protège contre de nombreuses maladies.",
    actions: ["Prévient mildiou", "Repousse insectes", "Protège racines"],
    targets: ["Mildiou", "Oïdium", "Rouille"],
    companionPlants: ["Tomates", "Fraises", "Rosiers"],
    tipsForPopayan:
      "Planter en bordure de bacs. Excellente adaptation à l'altitude.",
  },
  {
    id: 7,
    name: "Bourrache",
    type: "attractive/comestible",
    isEdible: true,
    isAdaptedToPopayan: true,
    description:
      "Plante mellifère qui attire massivement les pollinisateurs et auxiliaires bénéfiques.",
    actions: ["Attire pollinisateurs", "Éloigne vers", "Améliore croissance voisines"],
    targets: ["Attire abeilles", "Attire syrphes", "Repousse vers"],
    companionPlants: ["Tomates", "Fraises", "Courges"],
    tipsForPopayan:
      "Semer en bordure de serre. Fleurs bleues comestibles très décoratives.",
  },
  {
    id: 8,
    name: "Romarin",
    type: "répulsive/comestible",
    isEdible: true,
    isAdaptedToPopayan: true,
    description:
      "Arbuste aromatique persistant qui éloigne de nombreux ravageurs par son odeur camphrée.",
    actions: ["Repousse mouches carotte", "Protège choux", "Antifongique naturel"],
    targets: ["Mouche carotte", "Piéride chou", "Altises"],
    companionPlants: ["Carottes", "Choux", "Haricots"],
    tipsForPopayan:
      "Bonne résistance à l'humidité si sol bien drainé. Planter en plein soleil.",
  },
  {
    id: 9,
    name: "Absinthe",
    type: "répulsive",
    isEdible: false,
    isAdaptedToPopayan: true,
    description:
      "Plante médicinale très amère dont l'odeur forte repousse la plupart des insectes.",
    actions: ["Repousse insectes", "Éloigne limaces", "Protège bordures"],
    targets: ["Fourmis", "Pucerons", "Limaces"],
    companionPlants: ["En bordure uniquement", "Éloigner des légumes"],
    tipsForPopayan:
      "Planter uniquement en bordure extérieure. Odeur trop forte pour la serre.",
  },
  {
    id: 10,
    name: "Phacélie",
    type: "engrais vert/attractive",
    isEdible: false,
    isAdaptedToPopayan: true,
    description:
      "Engrais vert exceptionnel qui améliore le sol et attire les auxiliaires bénéfiques.",
    actions: ["Améliore sol", "Attire auxiliaires", "Étouffe mauvaises herbes"],
    targets: ["Attire syrphes", "Attire abeilles", "Nourrit sol"],
    companionPlants: ["Toutes cultures", "Semer entre rotations"],
    tipsForPopayan:
      "Semer après récolte. Cycle court adapté aux rotations rapides sous serre.",
  },
];

export default function PlantsHelperSection() {
  const [filter, setFilter] = useState<"all" | "edible" | "adapted" | "répulsive">("all");

  const filtered =
    filter === "all"
      ? plantsData
      : filter === "edible"
      ? plantsData.filter((p) => p.isEdible)
      : filter === "adapted"
      ? plantsData.filter((p) => p.isAdaptedToPopayan)
      : plantsData.filter((p) => p.type.includes("répulsive"));

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-slate-800">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3 text-slate-900">
          <Flower2 className="text-emerald-600" size={28} />
          Plantes Auxiliaires – Popayán
        </h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Ces plantes aident naturellement à contrôler les ravageurs, attirer les auxiliaires et
          protéger vos cultures – sélectionnées pour le climat de Popayán.
        </p>
      </div>

    
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {(["all", "edible", "adapted", "répulsive"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition ${
              filter === f
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f === "all" && <Sprout size={16} />}
            {f === "edible" && <UtensilsCrossed size={16} />}
            {f === "adapted" && <Check size={16} />}
            {f === "répulsive" && <Shield size={16} />}
            <span>
              {f === "all" && "Toutes"}
              {f === "edible" && "Comestibles"}
              {f === "adapted" && "Adaptées"}
              {f === "répulsive" && "Répulsives"}
            </span>
          </button>
        ))}
      </div>

      
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <ThermometerSun className="text-amber-500" size={20} />
          <div>
            <strong>Climat Popayán :</strong> Altitude 1 760 m • 14-19 °C • Humidité élevée
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <CloudRain className="text-sky-500" size={20} />
          <div>
            <strong>Adaptation :</strong> La plupart des plantes listées sont parfaitement adaptées
          </div>
        </div>
      </div>

      
      <Accordion type="single" collapsible className="w-full">
        {filtered.map((p) => (
          <AccordionItem key={p.id} value={String(p.id)}>
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <Leaf className="text-emerald-600" size={20} />
                <span className="text-lg font-semibold">{p.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  {p.type}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-3 pt-2 text-sm">
                <p className="text-slate-600">{p.description}</p>

                <div>
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2 mb-1">
                    <Shield size={16} /> Actions
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {p.actions.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2 mb-1">
                    <Bug size={16} /> Cibles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {p.targets.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-md bg-rose-100 text-rose-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2 mb-1">
                    <Sprout size={16} /> Associations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {p.companionPlants.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-2 py-1 rounded-md bg-sky-100 text-sky-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 mt-3">
                  <strong>Conseils Popayán :</strong> {p.tipsForPopayan}
                </div>

                <div className="flex gap-3 mt-3">
                  {p.isEdible && (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                      <UtensilsCrossed size={14} /> Comestible
                    </span>
                  )}
                  {p.isAdaptedToPopayan ? (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      <Check size={14} /> Adapté
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-700">
                      <X size={14} /> Non adapté
                    </span>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    
      <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
        <h3 className="font-semibold mb-3">Points clés pour Popayán</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Check size={18} className="shrink-0 mt-0.5" />
            <span>
              <strong>Géranium</strong> : le meilleur anti-moustique naturel pour zones humides.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={18} className="shrink-0 mt-0.5" />
            <span>
              <strong>Œillet d’Inde</strong> : essentiel contre les nématodes en sols chauds.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={18} className="shrink-0 mt-0.5" />
            <span>
              Plantes <strong>comestibles + protectrices</strong> : double bénéfice (basilic, menthe,
              etc.).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={18} className="shrink-0 mt-0.5" />
            <span>
              <strong>Diversité</strong> : mélanger plusieurs espèces pour une protection complète.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}