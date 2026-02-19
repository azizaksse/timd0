import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Database, BarChart3, Brain, Puzzle, PiggyBank, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const featureIcons = [Database, BarChart3, Brain, Puzzle, PiggyBank, ShieldCheck];
const diffIcons = [Zap, Sparkles];

const SolutionSection = () => {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="solution" className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.solution.title} <span className="gradient-text">{t.solution.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.solution.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
          {t.solution.features.map((label, i) => {
            const Icon = featureIcons[i];
            return (
              <div
                key={i}
                className="glass-card p-5 flex items-start gap-4 hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">{label}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6">{t.solution.diffTitle}</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.solution.differentiators.map((label, i) => {
              const Icon = diffIcons[i];
              return (
                <div
                  key={i}
                  className="glass-card p-5 border-accent/30 flex items-center gap-4"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
