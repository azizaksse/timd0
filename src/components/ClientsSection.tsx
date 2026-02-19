import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote } from "lucide-react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./ThreeDScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

const ClientsSection = () => {
  const ref = useScrollReveal();
  const { t } = useLanguage();

  const testimonials = t.clients.testimonials;
  const firstHalf = testimonials.slice(0, 3);
  const secondHalf = testimonials.slice(3);

  return (
    <section id="clients" className="py-24 relative overflow-hidden">
      <div ref={ref} className="section-fade-in">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.clients.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.clients.subtitle}
          </p>
        </div>

        <ThreeDScrollTriggerContainer className="space-y-6">
          <ThreeDScrollTriggerRow baseVelocity={3} direction={1}>
            {firstHalf.map((testimonial) => (
              <div key={testimonial.name} className="glass-card p-5 sm:p-6 mx-2 sm:mx-3 w-[280px] sm:w-[340px] flex-shrink-0 whitespace-normal">
                <Quote className="w-5 h-5 text-primary/40 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-primary">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </ThreeDScrollTriggerRow>

          <ThreeDScrollTriggerRow baseVelocity={2} direction={-1}>
            {secondHalf.map((testimonial) => (
              <div key={testimonial.name} className="glass-card p-5 sm:p-6 mx-2 sm:mx-3 w-[280px] sm:w-[340px] flex-shrink-0 whitespace-normal">
                <Quote className="w-5 h-5 text-primary/40 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-primary">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </ThreeDScrollTriggerRow>
        </ThreeDScrollTriggerContainer>
      </div>
    </section>
  );
};

export default ClientsSection;
