import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    subtitle: "Tableau de bord & contrôle de gestion",
    desc: "Résumé hebdomadaire des données de chaque département : ventes, stock, finance…",
    price: "20 000",
    features: [
      "Tableaux de bord standard",
      "Suivi hebdomadaire par département",
      "Indicateurs clés (CA, stock, marge)",
      "Support email",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    subtitle: "Analyses & rapports avancés",
    desc: "Analyse détaillée des tableaux de bord avec rapports automatisés pour le management.",
    price: "35 000",
    features: [
      "Tout le pack Basic",
      "Rapports automatiques personnalisés",
      "Analyses avancées des indicateurs",
      "Support prioritaire",
      "Export multi-formats",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    subtitle: "Analyses + recommandations IA",
    desc: "Analyse des rapports et recommandations intelligentes pour optimiser la performance.",
    price: "50 000",
    features: [
      "Tout le pack Pro",
      "Recommandations IA personnalisées",
      "Scénarios et simulations prédictives",
      "Accompagnement stratégique dédié",
      "API & intégrations avancées",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="tarifs" className="py-24 relative bg-muted/30">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Des abonnements SaaS modulaires, adaptés à votre budget
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Budgets constatés sur le marché : 20 000 – 35 000 DA et +50 000 DA/mois.
            Timd propose 3 packs modulaires pour répondre à chaque besoin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-6 sm:p-8 flex flex-col relative ${
                plan.highlighted
                  ? "border-primary/60 ring-1 ring-primary/30 sm:scale-[1.02]"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Populaire
                </span>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-sm text-primary font-medium mt-1">{plan.subtitle}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{plan.desc}</p>

              <div className="mt-6 mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm"> DA/mois</span>
                <p className="text-xs text-muted-foreground mt-1">À partir de</p>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                }`}
              >
                Parler à un conseiller
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
