import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PackageOpen, FileSpreadsheet, TrendingDown, Layers } from "lucide-react";

const problems = [
  {
    icon: PackageOpen,
    title: "Gestion de stock et production complexe",
    desc: "Suivi approximatif des stocks, erreurs de réapprovisionnement et perte de marchandise.",
  },
  {
    icon: FileSpreadsheet,
    title: "Rapports préparés à la main",
    desc: "27,8 % des entreprises utilisent encore Excel comme outil principal de reporting.",
  },
  {
    icon: TrendingDown,
    title: "Rentabilité difficile à suivre",
    desc: "Impossible de connaître la marge réelle par produit, client ou département en temps réel.",
  },
  {
    icon: Layers,
    title: "Outils éparpillés, aucune vue globale",
    desc: "ERP, CRM, tableurs… les données sont dispersées et les décisions prises à l'aveugle.",
  },
];

const ProblemesSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Les problèmes que nous voyons sur le terrain
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notre étude menée auprès de 19 entreprises algériennes révèle des difficultés
            récurrentes : suivi de stock, reporting manuel et manque de visibilité sur la performance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((p) => (
            <div
              key={p.title}
              className="glass-card p-6 border-destructive/20 hover:border-destructive/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                <p.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemesSection;
