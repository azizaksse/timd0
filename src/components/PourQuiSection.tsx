import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Building2, Rocket, BarChart3, Cog } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Building2, Rocket, BarChart3, Cog];

const PourQuiSection = () => {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="pour-qui" className="py-24 relative bg-muted/30">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.pourQui.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.pourQui.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.pourQui.segments.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="glass-card p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PourQuiSection;
