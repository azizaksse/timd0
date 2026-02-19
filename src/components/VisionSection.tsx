import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Target, ShieldCheck, Eye, Rocket, Lock, CreditCard } from "lucide-react";

const visionItems = [
  { icon: Target, text: "Intégrer au moins 10 entreprises qui confirment que Timd résout leurs problèmes." },
  { icon: Rocket, text: "Cibler plusieurs secteurs : production, commerce, services…" },
  { icon: Eye, text: "Finaliser le MVP, lancer le produit et trouver un investisseur." },
];

const engagements = [
  { icon: ShieldCheck, text: "Conformité à la loi 18-07 pour la protection des données." },
  { icon: Lock, text: "Cybersécurité et infrastructure cloud sécurisée." },
  { icon: CreditCard, text: "Prise en charge du paiement numérique." },
];

const VisionSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="vision" className="py-24 relative">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Notre vision et nos engagements</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Vision */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6 gradient-text">Vision à 1 an</h3>
            <div className="space-y-4">
              {visionItems.map((v) => (
                <div key={v.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <v.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Engagements */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold mb-6 text-accent">Engagements</h3>
            <div className="space-y-4">
              {engagements.map((e) => (
                <div key={e.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                    <e.icon className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
