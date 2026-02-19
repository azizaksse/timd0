import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, ShieldCheck, Eye, Rocket, Lock, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const visionIcons = [Target, Rocket, Eye];
const engagementIcons = [ShieldCheck, Lock, CreditCard];

const VisionSection = () => {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="vision" className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.vision.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Vision */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6 gradient-text">{t.vision.visionTitle}</h3>
            <div className="space-y-4">
              {t.vision.visionItems.map((text, i) => {
                const Icon = visionIcons[i];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Engagements */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6 text-accent">{t.vision.engagementsTitle}</h3>
            <div className="space-y-4">
              {t.vision.engagements.map((text, i) => {
                const Icon = engagementIcons[i];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
