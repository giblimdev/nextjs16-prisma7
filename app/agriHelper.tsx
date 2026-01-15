"use client"
import React, { useState } from 'react';
import { 
  Bug, Sprout, Flower2, Leaf, ThermometerSun, 
  CloudRain, Check, X, UtensilsCrossed, Shield 
} from 'lucide-react';

interface Plant {
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
}

const PlantHelperCard = ({ plant }: { plant: Plant }) => {
  return (
    <div className="plant-card">
      <div className="plant-header">
        <h3 className="plant-name">{plant.name}</h3>
        <span className={`plant-type ${plant.type}`}>
          {plant.type}
        </span>
      </div>
      
      <div className="plant-badges">
        {plant.isEdible && (
          <span className="badge edible">
            <UtensilsCrossed size={14} /> Comestible
          </span>
        )}
        {plant.isAdaptedToPopayan && (
          <span className="badge adapted">
            <Check size={14} /> Adapté à Popayán
          </span>
        )}
        {!plant.isAdaptedToPopayan && (
          <span className="badge not-adapted">
            <X size={14} /> Non adapté
          </span>
        )}
      </div>
      
      <p className="plant-description">{plant.description}</p>
      
      <div className="plant-details">
        <div className="detail-group">
          <h4><Shield size={16} /> Actions principales</h4>
          <ul className="action-list">
            {plant.actions.map((action, idx) => (
              <li key={idx}>{action}</li>
            ))}
          </ul>
        </div>
        
        <div className="detail-group">
          <h4><Bug size={16} /> Cibles principales</h4>
          <div className="targets">
            {plant.targets.map((target, idx) => (
              <span key={idx} className="target-tag">{target}</span>
            ))}
          </div>
        </div>
        
        <div className="detail-group">
          <h4><Leaf size={16} /> Culture associée</h4>
          <div className="companions">
            {plant.companionPlants.map((plant, idx) => (
              <span key={idx} className="companion-tag">{plant}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="plant-tips">
        <strong>Conseils pour Popayán :</strong> {plant.tipsForPopayan}
      </div>
    </div>
  );
};

const PlantsHelperSection = () => {
  const [filter, setFilter] = useState('all');
  
  const helperPlants = [
    {
      id: 1,
      name: "Géranium odorant",
      type: "répulsive",
      isEdible: false,
      isAdaptedToPopayan: true,
      description: "Plante vivace aux feuilles très aromatiques qui repousse efficacement les insectes volants.",
      actions: ["Repousse moustiques", "Éloigne aleurodes", "Protège contre pucerons"],
      targets: ["Moustiques", "Aleurodes", "Pucerons"],
      companionPlants: ["Tomates", "Poivrons", "Choux"],
      tipsForPopayan: "Planter en bordure de serre ou en pots. Excellente adaptation au climat de Popayán. Fleurs décoratives."
    },
    {
      id: 2,
      name: "Œillet d'Inde (Tagète)",
      type: "répulsive/nématocide",
      isEdible: true,
      isAdaptedToPopayan: true,
      description: "Fleur annuelle dont les racines sécrètent une substance toxique pour les nématodes.",
      actions: ["Élimine nématodes", "Repousse aleurodes", "Attire auxiliaires"],
      targets: ["Nématodes", "Aleurodes", "Mildiou"],
      companionPlants: ["Tomates", "Pommes de terre", "Aubergines"],
      tipsForPopayan: "Planter densément avant cultures sensibles. S'adapte parfaitement à l'altitude. Fleurs comestibles."
    },
    {
      id: 3,
      name: "Basilic",
      type: "répulsive/comestible",
      isEdible: true,
      isAdaptedToPopayan: true,
      description: "Herbe aromatique culinaire qui repousse naturellement les mouches blanches et moustiques.",
      actions: ["Repousse mouches blanches", "Protège tomates", "Améliore saveur voisines"],
      targets: ["Aleurodes", "Moustiques", "Thrips"],
      companionPlants: ["Tomates", "Poivrons", "Asperges"],
      tipsForPopayan: "Cultiver en plein soleil, protéger des fortes pluies. Production continue possible."
    },
    {
      id: 4,
      name: "Menthe",
      type: "répulsive/comestible",
      isEdible: true,
      isAdaptedToPopayan: true,
      description: "Plante vivace très vigoureuse qui éloigne de nombreux ravageurs par son arôme puissant.",
      actions: ["Repousse fourmis", "Éloigne pucerons", "Protège choux"],
      targets: ["Fourmis", "Pucerons", "Altises"],
      companionPlants: ["Choux", "Carottes", "Tomates"],
      tipsForPopayan: "CULTIVER UNIQUEMENT EN POT (invasif). Excellente adaptation au climat frais."
    },
    {
      id: 5,
      name: "Capucine",
      type: "plante-piège/comestible",
      isEdible: true,
      isAdaptedToPopayan: true,
      description: "Plante qui attire les pucerons, les détournant ainsi des cultures principales.",
      actions: ["Attire pucerons", "Protège fruitiers", "Fleurs comestibles"],
      targets: ["Pucerons (piège)", "Altises", "Chenilles"],
      companionPlants: ["Arbres fruitiers", "Choux", "Haricots"],
      tipsForPopayan: "Planter près des cultures précieuses. Variétés grimpantes sur treillis."
    },
    {
      id: 6,
      name: "Ail",
      type: "fongicide/comestible",
      isEdible: true,
      isAdaptedToPopayan: true,
      description: "Bulbe aux propriétés antifongiques naturelles qui protège contre de nombreuses maladies.",
      actions: ["Prévient mildiou", "Repousse insectes", "Protège racines"],
      targets: ["Mildiou", "Oïdium", "Rouille"],
      companionPlants: ["Tomates", "Fraises", "Rosiers"],
      tipsForPopayan: "Planter en bordure de bacs. Excellente adaptation à l'altitude."
    },
    {
      id: 7,
      name: "Bourrache",
      type: "attractive/comestible",
      isEdible: true,
      isAdaptedToPopayan: true,
      description: "Plante mellifère qui attire massivement les pollinisateurs et auxiliaires bénéfiques.",
      actions: ["Attire pollinisateurs", "Éloigne vers", "Améliore croissance voisines"],
      targets: ["Attire abeilles", "Attire syrphes", "Repousse vers"],
      companionPlants: ["Tomates", "Fraises", "Courges"],
      tipsForPopayan: "Semer en bordure de serre. Fleurs bleues comestibles très décoratives."
    },
    {
      id: 8,
      name: "Romarin",
      type: "répulsive/comestible",
      isEdible: true,
      isAdaptedToPopayan: true,
      description: "Arbuste aromatique persistant qui éloigne de nombreux ravageurs par son odeur camphrée.",
      actions: ["Repousse mouches carotte", "Protège choux", "Antifongique naturel"],
      targets: ["Mouche carotte", "Piéride chou", "Altises"],
      companionPlants: ["Carottes", "Choux", "Haricots"],
      tipsForPopayan: "Bonne résistance à l'humidité si sol bien drainé. Planter en plein soleil."
    },
    {
      id: 9,
      name: "Absinthe",
      type: "répulsive",
      isEdible: false,
      isAdaptedToPopayan: true,
      description: "Plante médicinale très amère dont l'odeur forte repousse la plupart des insectes.",
      actions: ["Repousse insectes", "Éloigne limaces", "Protège bordures"],
      targets: ["Fourmis", "Pucerons", "Limaces"],
      companionPlants: ["En bordure uniquement", "Éloigner des légumes"],
      tipsForPopayan: "Planter uniquement en bordure extérieure. Odeur trop forte pour la serre."
    },
    {
      id: 10,
      name: "Phacélie",
      type: "engrais vert/attractive",
      isEdible: false,
      isAdaptedToPopayan: true,
      description: "Engrais vert exceptionnel qui améliore le sol et attire les auxiliaires bénéfiques.",
      actions: ["Améliore sol", "Attire auxiliaires", "Étouffe mauvaises herbes"],
      targets: ["Attire syrphes", "Attire abeilles", "Nourrit sol"],
      companionPlants: ["Toutes cultures", "Semer entre rotations"],
      tipsForPopayan: "Semer après récolte. Cycle court adapté aux rotations rapides sous serre."
    }
  ];

  const filteredPlants = filter === 'all' 
    ? helperPlants 
    : filter === 'edible' 
    ? helperPlants.filter(p => p.isEdible)
    : filter === 'adapted'
    ? helperPlants.filter(p => p.isAdaptedToPopayan)
    : helperPlants.filter(p => p.type.includes(filter));

  return (
    <section className="plants-helper-section">
      <div className="section-header">
        <h2>
          <Flower2 size={28} className="icon-title" />
          Plantes Auxiliaires pour votre Ferme à Popayán
        </h2>
        <p className="section-subtitle">
          Ces plantes aident naturellement à contrôler les ravageurs, attirer les auxiliaires 
          et protéger vos cultures. Spécialement sélectionnées pour le climat de Popayán.
        </p>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Toutes
        </button>
        <button 
          className={`filter-btn ${filter === 'edible' ? 'active' : ''}`}
          onClick={() => setFilter('edible')}
        >
          <UtensilsCrossed size={16} /> Comestibles
        </button>
        <button 
          className={`filter-btn ${filter === 'adapted' ? 'active' : ''}`}
          onClick={() => setFilter('adapted')}
        >
          <Check size={16} /> Adaptées à Popayán
        </button>
        <button 
          className={`filter-btn ${filter === 'répulsive' ? 'active' : ''}`}
          onClick={() => setFilter('répulsive')}
        >
          <Shield size={16} /> Répulsives
        </button>
      </div>

      <div className="climate-info">
        <div className="climate-card">
          <ThermometerSun size={20} />
          <div>
            <strong>Climat Popayán :</strong> Altitude 1 760m • 14-19°C • Humidité élevée
          </div>
        </div>
        <div className="climate-card">
          <CloudRain size={20} />
          <div>
            <strong>Adaptation :</strong> La plupart des plantes listées sont parfaitement adaptées
          </div>
        </div>
      </div>

      <div className="plants-grid">
        {filteredPlants.map(plant => (
          <PlantHelperCard key={plant.id} plant={plant} />
        ))}
      </div>

      <div className="key-takeaways">
        <h3>Points Clés pour Popayán</h3>
        <ul>
          <li>
            <Check size={18} /> <strong>Géranium</strong> : Le meilleur anti-moustique naturel pour les zones humides
          </li>
          <li>
            <Check size={18} /> <strong>Œillet d&apos;Inde</strong> : Essentiel contre les nématodes dans les sols chauds
          </li>
          <li>
            <Check size={18} /> Plantes <strong>comestibles + protectrices</strong> : double bénéfice (basilic, menthe, ciboulette)
          </li>
          <li>
            <Check size={18} /> <strong>Diversité</strong> : Mélanger plusieurs espèces pour une protection complète
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PlantsHelperSection;