import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Building2, Rocket, BarChart3, Cog } from "lucide-react";

const segments = [
  {
    icon: Building2,
    title: "PME & CMI",
    desc: "Vous gérez vos données sur Excel et manquez de visibilité sur votre activité ? Timd centralise tout en un seul tableau de bord.",
  },
  {
    icon: Rocket,
    title: "Startups en croissance",
    desc: "Votre croissance dépasse vos outils ? Timd s'adapte à votre rythme avec une solution intégrée ERP + BI + CRM.",
  },
  {
    icon: BarChart3,
    title: "Difficultés d'analyse",
    desc: "Vos rapports arrivent trop tard et manquent de fiabilité ? L'IA de Timd automatise vos analyses en temps réel.",
  },
  {
    icon: Cog,
    title: "Automatisation décisionnelle",
    desc: "Vous perdez du temps sur des tâches répétitives ? Timd automatise vos processus et recommande les meilleures actions.",
  },
];

const PourQuiSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="pour-qui" className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pour quelles entreprises ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Timd s'adresse aux PME, CMI et grandes entreprises algériennes déjà conscientes du
            besoin de digitalisation mais freinées par des outils inadaptés.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {segments.map((s) => (
            <div
              key={s.title}
              className="glass-card p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PourQuiSection;
