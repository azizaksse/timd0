import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const metricValues = [
  { value: 19, suffix: "" },
  { value: 61, suffix: "%" },
  { value: 10, suffix: "" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1200;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-5xl sm:text-6xl font-bold gradient-text">
      {count}{suffix}
    </span>
  );
}

const PreuveMarcheSection = () => {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="preuve" className="py-24 relative bg-muted/30">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.preuve.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.preuve.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {t.preuve.metrics.map((m, i) => (
            <div key={i} className="glass-card p-8 text-center">
              <AnimatedNumber target={metricValues[i].value} suffix={metricValues[i].suffix} />
              <p className="text-foreground font-semibold mt-3">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            <strong className="text-foreground">{t.preuve.bottomText.part1}</strong>
            {t.preuve.bottomText.text1}
            <strong className="text-foreground">{t.preuve.bottomText.part2}</strong>
            {t.preuve.bottomText.text2}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreuveMarcheSection;
