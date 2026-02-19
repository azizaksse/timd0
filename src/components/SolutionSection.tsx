import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Database, BarChart3, Brain, Puzzle, PiggyBank, ShieldCheck, Sparkles, Zap } from "lucide-react";

const features = [
  { icon: Database, label: "Centralisation et automatisation des données de gestion" },
  { icon: BarChart3, label: "Tableaux de bord et rapports automatisés" },
  { icon: Brain, label: "Analyse prédictive et recommandations IA" },
  { icon: Puzzle, label: "Solution simple, adaptable et évolutive" },
  { icon: PiggyBank, label: "Gain de temps et réduction des coûts opérationnels" },
  { icon: ShieldCheck, label: "Décisions basées sur des données fiables" },
];

const differentiators = [
  { icon: Zap, label: "Plus flexible et moins coûteux que les solutions existantes" },
  { icon: Sparkles, label: "IA intégrée au cœur de la plateforme" },
];

const SolutionSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="solution" className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Timd : votre cockpit <span className="gradient-text">ERP + BI + IA</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une plateforme tout-en-un qui réunit ERP, BI, IA et CRM. Plus simple,
            plus flexible et moins coûteuse que les grandes solutions du marché,
            pensée spécifiquement pour les entreprises algériennes.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
          {features.map((f) => (
            <div
              key={f.label}
              className="glass-card p-5 flex items-start gap-4 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-foreground leading-relaxed">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Differentiators */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">Pourquoi Timd se démarque ?</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {differentiators.map((d) => (
              <div
                key={d.label}
                className="glass-card p-5 border-accent/30 flex items-center gap-4"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                  <d.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm font-medium text-foreground">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
