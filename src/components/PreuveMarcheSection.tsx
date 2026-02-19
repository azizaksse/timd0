import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 19, suffix: "", label: "entreprises interrogées", sub: "PME, CMI et grandes entreprises" },
  { value: 61, suffix: "%", label: "intéressées par Timd", sub: "27,8 % supplémentaires en « peut-être »" },
  { value: 10, suffix: "", label: "prêtes à tester", sub: "Prospects réels et engagés" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
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

  return (
    <section id="preuve" className="py-24 relative bg-muted/30">
      <div ref={ref} className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Un besoin confirmé par le marché</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notre étude de marché auprès de 19 entreprises algériennes confirme un intérêt
            fort pour une solution tout-en-un comme Timd.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {metrics.map((m) => (
            <div key={m.label} className="glass-card p-8 text-center">
              <AnimatedNumber target={m.value} suffix={m.suffix} />
              <p className="text-foreground font-semibold mt-3">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            <strong className="text-foreground">55,5 %</strong> des entreprises utilisent déjà un ERP
            et <strong className="text-foreground">27,8 %</strong> travaillent encore sur Excel — un
            marché conscient de ses besoins avec une opportunité majeure de migration vers Timd.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreuveMarcheSection;
