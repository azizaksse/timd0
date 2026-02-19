import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PackageOpen, FileSpreadsheet, TrendingDown, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [PackageOpen, FileSpreadsheet, TrendingDown, Layers];

const ProblemesSection = () => {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.problems.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.problems.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.problems.items.map((p, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="glass-card p-6 border-destructive/20 hover:border-destructive/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemesSection;
