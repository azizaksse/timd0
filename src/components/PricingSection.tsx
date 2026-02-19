import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Check, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const ref = useScrollReveal();
  const { t } = useLanguage();
  const highlightedIndex = 1;
  const [isAnnual, setIsAnnual] = useState(false);
  const [showPerSeat, setShowPerSeat] = useState(false);

  return (
    <section id="tarifs" className="py-24 relative bg-muted/30">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.pricing.subtitle}
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
              {t.pricing.monthly}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? "bg-primary" : "bg-muted-foreground/30"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${isAnnual ? "translate-x-7" : ""}`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
              {t.pricing.annual}
            </span>
            {isAnnual && (
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                {t.pricing.annualSave}
              </span>
            )}
          </div>

          {/* Per-seat toggle */}
          <button
            onClick={() => setShowPerSeat(!showPerSeat)}
            className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              showPerSeat
                ? "border-primary/40 bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            {t.pricing.perSeatLabel}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.pricing.plans.map((plan, i) => {
            const price = showPerSeat
              ? (isAnnual ? plan.perSeatAnnual : plan.perSeat)
              : (isAnnual ? plan.priceAnnual : plan.price);
            const currency = isAnnual ? t.pricing.currencyAnnual : t.pricing.currency;

            return (
              <div
                key={plan.name}
                className={`glass-card p-6 sm:p-8 flex flex-col relative transition-all duration-300 ${
                  i === highlightedIndex
                    ? "border-primary/60 ring-1 ring-primary/30 sm:scale-[1.02]"
                    : ""
                }`}
              >
                {i === highlightedIndex && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-sm text-primary font-medium mt-1">{plan.subtitle}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{plan.desc}</p>

                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold transition-all">{price}</span>
                    <span className="text-muted-foreground text-sm">{currency}</span>
                  </div>
                  {showPerSeat && (
                    <p className="text-xs text-primary/70 mt-1">/ {t.pricing.perSeatLabel}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{t.pricing.startingFrom}</p>
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
                    i === highlightedIndex
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
                >
                  {t.pricing.cta}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
