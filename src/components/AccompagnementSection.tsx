import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Settings, Headphones, GraduationCap, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Settings, Headphones, GraduationCap, RefreshCw];

const AccompagnementSection = () => {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.accompagnement.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.accompagnement.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="glass-card p-6 text-center hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccompagnementSection;
