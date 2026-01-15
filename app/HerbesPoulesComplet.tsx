// components/HerbesPoulesComplet.tsx
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // shadcn/ui
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

type Herbe = {
  nom: string;
  emoji: string;
  bienfaits: string[];
  utilisation: string[];
  extra?: string;
};

const herbes: Herbe[] = [
  {
    nom: 'Menthe',
    emoji: '🌿',
    bienfaits: [
      'Refroidit la température corporelle en été',
      'Odeur calmante : réduit le stress',
      'Repousse mouches & insectes',
    ],
    utilisation: [
      'Feuilles écrasées dans l’eau de boisson',
      'Menthe fraîche broyée dans la baignoire de poussière ou les nids',
      'Suspendre des bouquets autour du poulailler',
    ],
  },
  {
    nom: 'Lavande',
    emoji: '💜',
    bienfaits: [
      'Effet relaxant pour poules et humains',
      'Repousse les insectes',
      'Favorise la bonne circulation sanguine',
    ],
    utilisation: [
      'Petits bouquets dans le poulailler ou les nids',
      'Brindilles dans la zone de bain de poussière',
    ],
  },
  {
    nom: 'Origan',
    emoji: '🍃',
    bienfaits: [
      'Antibactérien & antiparasitaire',
      'Riche en vitamines, calcium, antioxydants',
      'Soutient l’appareil respiratoire',
    ],
    utilisation: [
      'Feuilles fraîches hachées mélangées à la ration',
      'Suspendre des bouquets dans l’enclos',
      'Facile à cultiver : plus vous cueillez, plus il pousse',
    ],
  },
  {
    nom: 'Consoude',
    emoji: '🌱',
    bienfaits: [
      'Cicatrisante & régénérante (plaies, égratignures)',
      'Aide la digestion',
      'Traditionnellement utilisée pour os cassés',
    ],
    utilisation: [
      'Pousses fraîches données à volonté',
      'Préparer un onguent : feuilles sèches + huile d’olive + cire d’abeille',
    ],
  },
  {
    nom: 'Calendula (Souci)',
    emoji: '🌼',
    bienfaits: [
      'Inflammations, coupures, bec & pattes',
      'Coloration jaune-orange des jaunes d’œufs',
      'Antioxydant & antibactérien',
    ],
    utilisation: [
      'Fleurs fraîches dans la ration',
      'Onguent de calendula sur plaies ou anus prolapsé',
      'Floraison mi-été → mi-automne : cueillir souvent',
    ],
  },
  {
    nom: 'Thym',
    emoji: '🌿',
    bienfaits: [
      'Antibiotique naturel respiratoire',
      'Antibactérien & répulsif',
      'Odeur citronnée (thym citron) très efficace contre insectes',
    ],
    utilisation: [
      'Brins suspendus ou dans les nids',
      'Dans la ration (sec ou frais)',
      'À cultiver en pot (s’étend vite)',
    ],
  },
  {
    nom: 'Basilic',
    emoji: '🌿',
    bienfaits: [
      'Antibactérien',
      'Entretient santé des muqueuses respiratoires',
    ],
    utilisation: [
      'Dans les nids ou accroché',
      'Petites quantités dans la ration quotidienne',
    ],
  },
  {
    nom: 'Ail',
    emoji: '🧄',
    bienfaits: [
      'Antibactérien & antifongique',
      'Stimule immunité, circulation, digestion',
    ],
    utilisation: [
      '1 gousse fraîche écrasée / litre d’eau potable (48 h max)',
      'Si refus : 1 gousse écrasée/semaine dans la nourriture',
      'Peaux & tiges dans les nids → élimine acariens',
    ],
    extra: 'L’odeur peut décourager la consommation d’eau : surveiller la déshydratation. Trop d’ail peut altérer le goût des œufs.',
  },
  {
    nom: 'Marjolaine',
    emoji: '✨',
    bienfaits: [
      'Stimulant de ponte',
      'Anti-inflammatoire & décongestionnant',
      'Améliore la circulation sanguine',
    ],
    utilisation: [
      'Dans les nids ou ration quotidienne',
      'Infusion dans l’eau en cas de problèmes respiratoires',
    ],
  },
];

export default function HerbesPoulesComplet() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-slate-800">
      {/* EN-TÊTE */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          9 herbes médicinales pour les poules
        </h1>
        <p className="text-slate-600 mt-2">
          Guide complet pour utiliser les plantes naturellement et éviter les traitements chimiques
          inutiles.
        </p>
      </header>

      {/* INTRODUCTION */}
      <section className="mb-8 space-y-4 text-slate-700">
        <p>
          Les poules sont des animaux fragiles face aux maladies infectieuses. Prévenir avec des
          herbes est plus simple, économique et doux que guérir une maladie déclarée.
        </p>
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <span>
            <strong>Parasites internes confirmés ?</strong> Les herbes seules sont souvent
            insuffisantes ; un traitement chimique reste parfois indispensable.
          </span>
        </div>
        <p>
          Deux façons simples d’administrer :{' '}
          <span className="font-semibold">mélange secs/frais dans la ration</span> ou{' '}
          <span className="font-semibold">infusion ajoutée à l’eau de boisson</span>.
        </p>
      </section>

      {/* LISTE DES HERBES */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Herbes & modes d’emploi détaillés</h2>
        <Accordion type="single" collapsible className="w-full">
          {herbes.map((h) => (
            <AccordionItem key={h.nom} value={h.nom}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{h.emoji}</span>
                  <span className="text-lg font-medium">{h.nom}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 pt-2">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Bienfaits</h3>
                    <ul className="list-disc space-y-1 pl-5 text-slate-700">
                      {h.bienfaits.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Utilisation</h3>
                    <ul className="list-disc space-y-1 pl-5 text-slate-700">
                      {h.utilisation.map((u) => (
                        <li key={u}>{u}</li>
                      ))}
                    </ul>
                  </div>

                  {h.extra && (
                    <div className="mt-3 flex gap-3 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
                      <InformationCircleIcon className="h-5 w-5 shrink-0" />
                      <span>{h.extra}</span>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* RAPPEL FINAL */}
      <footer className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <div className="flex items-start gap-3">
          <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <div>
            <p className="font-semibold text-slate-800 mb-1">Petit rappel</p>
            <p>
              Vérifiez toujours l’absence de toxicité avant d’introduire une nouvelle plante. Les
              herbes sont un soutien, pas un remplacement vétérinaire en cas d’épidémie sévère.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}