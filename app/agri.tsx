

import React from 'react';

const Agri = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-sans space-y-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      {/* En-tête */}
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
        Document de Production et de Commercialisation Agricole – Serre de Popayán
      </h1>
      <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300">
        Synthèse Stratégique pour une Exploitation à Haute Valeur Ajoutée
      </h2>

      <p>
        Ce document présente une gamme de produits optimisée pour la production sous serre à Popayán,
        exploitant les bacs surélevés pour maximiser la rentabilité. La stratégie repose sur trois
        piliers complémentaires :
      </p>

      <ol className="list-decimal list-inside space-y-1">
        <li>Les graines germées (cycle ultra-rapide)</li>
        <li>Les micropousses (produit premium)</li>
        <li>Les légumes/herbes à cycle multiple (revenu régulier)</li>
      </ol>

      <p>
        Cette diversification permet de répondre à différents marchés et de garantir un flux de
        trésorerie continu.
      </p>

      {/* Section 1: Catalogue des Produits */}
      <h2 className="text-2xl font-bold mt-6">1. Catalogue des Produits Proposés</h2>

      {/* Graines Germées */}
      <h3 className="text-xl font-semibold mt-4">
        A. GAMME 1 : Graines Germées (Sprouts) – Cycle 2 à 7 jours
      </h3>
      <p>Produit « coup de cœur » : fraîcheur extrême, nutrition maximale.</p>

      <div className="overflow-x-auto">
        <table className="table-auto border border-gray-300 w-full text-left mt-2 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border px-2 py-1">Produit (Top 10 Vente)</th>
              <th className="border px-2 py-1">Cycle (jours)</th>
              <th className="border px-2 py-1">Goût &amp; Atout Principal</th>
              <th className="border px-2 py-1">Marché Cible Prioritaire</th>
              <th className="border px-2 py-1">Conditionnement Vendu</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Luzerne (Alfalfa)", "5–6", "Doux, croquant. Classique et universel.", "Grand public, épiceries, sandwichs.", "Barquette 100 g"],
              ["Lentille Verte/Corail", "2–3", "Sucré, poivré. Riche en fer, très rapide.", "Consommateurs santé, végétariens.", "Barquette 80 g ou mélange"],
              ["Radis (Daikon)", "4–6", "Piquant, relevé. Donne du caractère.", "Restauration, amateurs de saveurs fortes.", "Barquette 50 g"],
              ["Brocoli", "5–6", "Légèrement piquant. Argument superfood.", "Marché bio & santé", "Barquette 60 g"],
              ["Fenugrec", "6–7", "Épicé, amer (curry). Original et aromatique.", "Amateurs de curiosités culinaires", "Sachet 40 g"],
              ["Haricot Mungo (Soja Vert)", "3–5", "Croquant, légèrement sucré. Source de protéines et fibres.", "Grand public, restauration asiatique, sandwicheries.", "Barquette 120 g"],
            ].map(([produit, cycle, gout, marche, cond], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/20" : ""}>
                <td className="border px-2 py-1">{produit}</td>
                <td className="border px-2 py-1">{cycle}</td>
                <td className="border px-2 py-1">{gout}</td>
                <td className="border px-2 py-1">{marche}</td>
                <td className="border px-2 py-1">{cond}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 font-semibold">
        Stratégie commerciale clé : Vendre des mélanges thématiques
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Mélange Doux : Luzerne + Lentille + Tournesol → Salades fraîches</li>
        <li>Mélange Piquant : Radis + Brocoli + Moutarde → Sandwichs et wraps</li>
        <li>Mélange Original : Fenugrec + Radis + Trèfle → Cuisine créative</li>
        <li>Mélange Énergie : Haricot Mungo + Luzerne + Brocoli → Source de protéines végétales</li>
      </ul>

      {/* Micropousses */}
      <h3 className="text-xl font-semibold mt-4">
        B. GAMME 2 : Micropousses (Microgreens) – Cycle 7 à 21 jours
      </h3>
      <p>Produit gastronomique : intensité des saveurs, qualités nutritionnelles et esthétiques.</p>

      <div className="overflow-x-auto">
        <table className="table-auto border border-gray-300 w-full text-left mt-2 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border px-2 py-1">Produit</th>
              <th className="border px-2 py-1">Cycle (jours)</th>
              <th className="border px-2 py-1">Goût &amp; Texture</th>
              <th className="border px-2 py-1">Atout Commercial &amp; Visuel</th>
              <th className="border px-2 py-1">Marché Cible Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-50 dark:even:bg-gray-900/20">
              <td className="border px-2 py-1">Radis (Daikon/Pourpre)</td>
              <td className="border px-2 py-1">7–10</td>
              <td className="border px-2 py-1">Piquant intense, croquant</td>
              <td className="border px-2 py-1">Tige colorée, visuel haut de gamme</td>
              <td className="border px-2 py-1">Chefs, traiteurs</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-900/20">
              <td className="border px-2 py-1">Brocoli</td>
              <td className="border px-2 py-1">10–14</td>
              <td className="border px-2 py-1">Poivré, tendre</td>
              <td className="border px-2 py-1">Superaliment reconnu</td>
              <td className="border px-2 py-1">Paniers bio</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-900/20">
              <td className="border px-2 py-1">Tournesol</td>
              <td className="border px-2 py-1">10–12</td>
              <td className="border px-2 py-1">Noisette, juteux</td>
              <td className="border px-2 py-1">Excellent rendement, goût consensuel</td>
              <td className="border px-2 py-1">Tous marchés</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-900/20">
              <td className="border px-2 py-1">Pois Mange-Tout</td>
              <td className="border px-2 py-1">12–21</td>
              <td className="border px-2 py-1">Sucré, goût frais</td>
              <td className="border px-2 py-1">Volume impressionnant</td>
              <td className="border px-2 py-1">Restaurants gastronomiques</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-900/20">
              <td className="border px-2 py-1">Basilic (Genovese)</td>
              <td className="border px-2 py-1">20–25</td>
              <td className="border px-2 py-1">Saveur concentrée</td>
              <td className="border px-2 py-1">Produit premium</td>
              <td className="border px-2 py-1">Cuisine italienne</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-2 font-semibold">Proposition de valeur :</p>
      <p>
        Un concentré de saveur et de nutrition, récolté à la main pour les palais exigeants.
      </p>

      {/* Légumes et Herbes */}
      <h3 className="text-xl font-semibold mt-4">
        C. GAMME 3 : Légumes &amp; Herbes Aromatiques sous Serre – Cycles Multiples
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto border border-gray-300 w-full text-left mt-2 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border px-2 py-1">Catégorie</th>
              <th className="border px-2 py-1">Produits Phares</th>
              <th className="border px-2 py-1">Cycle / Rotation</th>
              <th className="border px-2 py-1">Avantage pour Popayán</th>
              <th className="border px-2 py-1">Forme de Vente</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-50 dark:even:bg-gray-900/20">
              <td className="border px-2 py-1">Légumes-Fruits</td>
              <td className="border px-2 py-1">Tomates cerises, Piments spéciaux, Mini-poivrons</td>
              <td className="border px-2 py-1">4–6 mois</td>
              <td className="border px-2 py-1">
                Adaptation au palissage vertical, valeur élevée au kilo
              </td>
              <td className="border px-2 py-1">Barquettes, mix coloré</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-900/20">
              <td className="border px-2 py-1">Légumes-Feuilles</td>
              <td className="border px-2 py-1">Laitues à couper, Épinards, Bettes colorées</td>
              <td className="border px-2 py-1">4–5 semaines</td>
              <td className="border px-2 py-1">Haut rendement, cycles rapides</td>
              <td className="border px-2 py-1">Sachets jeunes pousses</td>
            </tr>
            <tr className="even:bg-gray-50 dark:even:bg-gray-900/20">
              <td className="border px-2 py-1">Herbes Aromatiques</td>
              <td className="border px-2 py-1">Basilic, Coriandre, Menthe, Origan</td>
              <td className="border px-2 py-1">Continu</td>
              <td className="border px-2 py-1">Forte demande locale</td>
              <td className="border px-2 py-1">Pots ou bouquets frais</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2: Stratégie de Production en Cascade */}
      <h2 className="text-2xl font-bold mt-6">
        2. Stratégie de Production en Cascade &quot;Du Germoir à la Récolte Mature&quot;
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto border border-gray-300 w-full text-left mt-2 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border px-2 py-1">Plante</th>
              <th className="border px-2 py-1">Stade 1 : Graine Germée</th>
              <th className="border px-2 py-1">Stade 2 : Micropousse</th>
              <th className="border px-2 py-1">Stade 3 : Légume/Herbe</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Radis", "Germes piquants", "Micropousses colorées", "Racine + fanes (pesto)"],
              ["Brocoli", "Germes superfood", "Micropousses riches", "Jeunes tiges"],
              ["Pois", "Germes croquants", "Micropousses sucrées", "Cosses mange-tout"],
              ["Basilic", "Germes aromatiques", "Micropousses parfumées", "Feuilles fraîches"],
              ["Coriandre", "Germes lents, aromatiques", "Micropousses marquées", "Plante entière"],
              [
                "Haricot Mungo",
                "Germes croquants et riches en protéines",
                "(Non cultivé en micropousse classique)",
                "Jeunes pousses comestibles (niche asiatique)",
              ],
            ].map(([plante, s1, s2, s3], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/20" : ""}>
                <td className="border px-2 py-1">{plante}</td>
                <td className="border px-2 py-1">{s1}</td>
                <td className="border px-2 py-1">{s2}</td>
                <td className="border px-2 py-1">{s3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Techniques de Production */}
      <h2 className="text-2xl font-bold mt-6">3. Techniques de Production Essentielles</h2>
      
      <h3 className="text-xl font-semibold mt-4">
        Graines Germées – Exemple : Haricot Mungo
      </h3>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <strong>Méthode :</strong> Tremper les graines 8–10 h, puis répartir dans un germoir ou
          plateau perforé. Maintenir humidité élevée (95%) et obscurité partielle. Rincer 2–3 fois/jour
          avec de l&apos;eau potable (20–25 °C).
        </li>
        <li>
          <strong>Température idéale :</strong> 24–28 °C
        </li>
        <li>
          <strong>Durée du cycle :</strong> 3–5 jours
        </li>
        <li>
          <strong>Récolte :</strong> Germes 3–5 cm, avant la sortie des premières feuilles
        </li>
        <li>
          <strong>Stockage :</strong> Au frais (2–4 °C) dans barquettes ventilées, durée de vie 5–7 jours
        </li>
      </ul>

      {/* Section 4: Plantes Aromatiques et Utiles */}
      <h2 className="text-2xl font-bold mt-6">4. Plantes Aromatiques et Utiles Spécifiques</h2>

      {/* Christophine */}
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">A. CHRISTOPHINE (Chayote)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <h4 className="font-semibold">Caractéristiques :</h4>
            <ul className="list-disc list-inside">
              <li><strong>Type :</strong> Liane vivace</li>
              <li><strong>Cycle :</strong> 4-6 mois (première récolte)</li>
              <li><strong>Adaptation Popayán :</strong> Excellente</li>
              <li><strong>Comestible :</strong> Oui (fruit, pousses, racines)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Avantages :</h4>
            <ul className="list-disc list-inside">
              <li>Production abondante et rapide</li>
              <li>Peu exigeante en entretien</li>
              <li>Utilisation multiple (fruit, feuilles)</li>
              <li>Résistante aux maladies</li>
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold">Technique de production :</h4>
          <p>Planter un fruit entier en terre. Support nécessaire (treillis, pergola). Production continue pendant plusieurs années.</p>
        </div>
      </div>

      {/* Persil */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">B. PERSIL</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <h4 className="font-semibold">Caractéristiques :</h4>
            <ul className="list-disc list-inside">
              <li><strong>Type :</strong> Bisannuelle cultivée en annuelle</li>
              <li><strong>Cycle :</strong> 70-90 jours (semis à récolte)</li>
              <li><strong>Adaptation Popayán :</strong> Très bonne</li>
              <li><strong>Comestible :</strong> Oui</li>
              <li><strong>Variétés :</strong> Frisé (décoratif) ou Plat (saveur)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Avantages :</h4>
            <ul className="list-disc list-inside">
              <li>Demande constante toute l&apos;année</li>
              <li>Peut être cultivé en association</li>
              <li>Se vend bien en pots ou bouquets</li>
              <li>Résiste bien à la fraîcheur</li>
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold">Technique de production :</h4>
          <p>Semis direct ou repiquage. Sol riche et bien drainé. Récolte par taille régulière des tiges extérieures.</p>
        </div>
      </div>

      {/* Menthe */}
      <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">C. MENTHE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <h4 className="font-semibold">Caractéristiques :</h4>
            <ul className="list-disc list-inside">
              <li><strong>Type :</strong> Vivace vigoureuse</li>
              <li><strong>Cycle :</strong> Production continue</li>
              <li><strong>Adaptation Popayán :</strong> Excellente</li>
              <li><strong>Comestible :</strong> Oui</li>
              <li><strong>Variétés :</strong> Verte, Poivrée, Marocaine</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Avantages :</h4>
            <ul className="list-disc list-inside">
              <li>Croissance rapide et abondante</li>
              <li>Repousse naturelle des pucerons et fourmis</li>
              <li>Double usage : culinaire et répulsif</li>
              <li>Très bonnes marges commerciales</li>
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold">⚠️ Attention importante :</h4>
          <p className="text-red-600 dark:text-red-400 font-semibold">
            CULTIVER UNIQUEMENT EN POTS SÉPARÉS ! La menthe est très invasive par ses rhizomes.
          </p>
          <p className="mt-1">Multiplication par division de touffes ou boutures. Récolte avant floraison pour plus de saveur.</p>
        </div>
      </div>

      {/* Ciboulette */}
      <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
        <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-300">D. CIBOULETTE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <h4 className="font-semibold">Caractéristiques :</h4>
            <ul className="list-disc list-inside">
              <li><strong>Type :</strong> Vivace (Allium schoenoprasum)</li>
              <li><strong>Cycle :</strong> Production continue</li>
              <li><strong>Adaptation Popayán :</strong> Parfaite</li>
              <li><strong>Comestible :</strong> Oui (feuilles et fleurs)</li>
              <li><strong>Propriété :</strong> Antifongique naturelle</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Avantages :</h4>
            <ul className="list-disc list-inside">
              <li>Protège contre le mildiou et l&apos;oïdium</li>
              <li>Fleurs violettes comestibles et décoratives</li>
              <li>Repousse certains insectes ravageurs</li>
              <li>Se divise facilement pour multiplier</li>
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold">Technique de production :</h4>
          <p>Division de touffes ou semis. Sol bien drainé. Couper régulièrement pour stimuler la repousse. Les fleurs attirent les pollinisateurs.</p>
        </div>
      </div>

      {/* Géranium */}
      <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
        <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-300">E. GÉRANIUM ODORANT</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <h4 className="font-semibold">Caractéristiques :</h4>
            <ul className="list-disc list-inside">
              <li><strong>Type :</strong> Plante répulsive (Pelargonium)</li>
              <li><strong>Cycle :</strong> Vivace sous abri</li>
              <li><strong>Adaptation Popayán :</strong> Excellente</li>
              <li><strong>Comestible :</strong> Non</li>
              <li><strong>Action principale :</strong> Anti-moustiques puissant</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Avantages :</h4>
            <ul className="list-disc list-inside">
              <li>Repousse efficacement les moustiques et aleurodes</li>
              <li>Peut être utilisé pour extraire de l&apos;huile essentielle</li>
              <li>Protège les autres cultures en bordure</li>
              <li>Fleurs décoratives</li>
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold">Technique de production :</h4>
          <p>Bouturage facile. Planter en bordure de serre ou en pots périphériques. Plein soleil. Peu exigeant en eau.</p>
          <p className="mt-1 font-semibold text-green-600 dark:text-green-400">
            ⭐ Spécial Popayán : Indispensable pour lutter contre les moustiques en zone humide !
          </p>
        </div>
      </div>

      {/* Section 5: Tableau Synthèse des Plantes Aromatiques */}
      <h2 className="text-2xl font-bold mt-6">5. Synthèse des Plantes Aromatiques pour Popayán</h2>
      
      <div className="overflow-x-auto mt-4">
        <table className="table-auto border border-gray-300 w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border px-2 py-1">Plante</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Comestible</th>
              <th className="border px-2 py-1">Adaptation Popayán</th>
              <th className="border px-2 py-1">Cycle</th>
              <th className="border px-2 py-1">Valeur Ajoutée</th>
              <th className="border px-2 py-1">Conditionnement</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Christophine", "Légume-fruit", "Oui", "Excellente", "4-6 mois", "Production abondante", "Vente à l'unité"],
              ["Persil", "Aromatique", "Oui", "Très bonne", "70-90 jours", "Demande constante", "Bouquets/Pots"],
              ["Menthe", "Aromatique", "Oui", "Excellente", "Continu", "Répulsif naturel", "Pots/Bouquets"],
              ["Ciboulette", "Aromatique", "Oui", "Parfaite", "Continu", "Antifongique", "Bouquets/Pots"],
              ["Géranium", "Répulsif", "Non", "Excellente", "Vivace", "Anti-moustiques", "Pots décoratifs"],
            ].map(([plante, type, comestible, adaptation, cycle, valeur, conditionnement], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/20" : ""}>
                <td className="border px-2 py-1 font-semibold">{plante}</td>
                <td className="border px-2 py-1">{type}</td>
                <td className="border px-2 py-1">
                  <span className={`px-2 py-1 rounded ${comestible === "Oui" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {comestible}
                  </span>
                </td>
                <td className="border px-2 py-1">
                  <span className={`px-2 py-1 rounded ${
                    adaptation === "Excellente" || adaptation === "Parfaite" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {adaptation}
                  </span>
                </td>
                <td className="border px-2 py-1">{cycle}</td>
                <td className="border px-2 py-1">{valeur}</td>
                <td className="border px-2 py-1">{conditionnement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conclusion */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Conclusion Stratégique</h3>
        <p className="mt-2">
          Cette gamme diversifiée de produits permet de maximiser la rentabilité de votre serre à Popayán.
          En combinant cycles rapides (germes), produits premium (micropousses) et cultures stables
          (légumes et aromatiques), vous pouvez garantir un revenu régulier tout en répondant à la
          demande locale.
        </p>
        <p className="mt-2 font-semibold">
          Les plantes aromatiques ajoutées (christophine, persil, menthe, ciboulette, géranium)
          représentent des valeurs sûres parfaitement adaptées au climat de Popayán, avec des
          débouchés commerciaux stables et des techniques de production maîtrisables.
        </p>
      </div>
    </div>
  );
};

export default Agri;