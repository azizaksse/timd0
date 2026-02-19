import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote } from "lucide-react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./ThreeDScrollTrigger";

const testimonials = [
  {
    name: "Karim B.",
    role: "Directeur Général",
    company: "PME — Secteur agroalimentaire",
    comment:
      "Avant Timd, on passait des heures à consolider nos données sur Excel. Maintenant, tout est centralisé et nos rapports sont générés automatiquement.",
  },
  {
    name: "Amina H.",
    role: "Responsable financière",
    company: "CMI — Distribution",
    comment:
      "Le suivi de rentabilité par produit était un cauchemar. Avec Timd, j'ai une vue claire sur mes marges en temps réel.",
  },
  {
    name: "Youcef M.",
    role: "CEO",
    company: "Startup tech — Alger",
    comment:
      "On cherchait un outil qui grandisse avec nous. Timd nous offre ERP, BI et CRM dans une seule plateforme, c'est exactement ce qu'il nous fallait.",
  },
  {
    name: "Fatima Z.",
    role: "Directrice des opérations",
    company: "Grande entreprise — Industrie",
    comment:
      "Les recommandations IA de Timd nous ont permis d'optimiser notre chaîne de production et de réduire nos coûts de 15 %.",
  },
  {
    name: "Mehdi R.",
    role: "Responsable commercial",
    company: "PME — Services B2B",
    comment:
      "Le CRM intégré à Timd a transformé notre suivi client. On ne perd plus aucune opportunité commerciale.",
  },
  {
    name: "Nadia L.",
    role: "Comptable",
    company: "Cabinet comptable — Oran",
    comment:
      "Je recommande Timd à tous mes clients. La conformité loi 18-07 et les rapports automatisés simplifient énormément notre travail.",
  },
];

const TestimonialCard = ({
  name,
  role,
  company,
  comment,
}: (typeof testimonials)[0]) => (
  <div className="glass-card p-6 mx-3 w-[340px] flex-shrink-0 whitespace-normal">
    <Quote className="w-5 h-5 text-primary/40 mb-3" />
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
      "{comment}"
    </p>
    <div>
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="text-xs text-primary">{role}</p>
      <p className="text-xs text-muted-foreground">{company}</p>
    </div>
  </div>
);

const ClientsSection = () => {
  const ref = useScrollReveal();

  const firstHalf = testimonials.slice(0, 3);
  const secondHalf = testimonials.slice(3);

  return (
    <section id="clients" className="py-24 relative overflow-hidden">
      <div ref={ref} className="section-fade-in">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des entreprises algériennes qui transforment leur gestion avec Timd.
          </p>
        </div>

        <ThreeDScrollTriggerContainer className="space-y-6">
          <ThreeDScrollTriggerRow baseVelocity={3} direction={1}>
            {firstHalf.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </ThreeDScrollTriggerRow>

          <ThreeDScrollTriggerRow baseVelocity={2} direction={-1}>
            {secondHalf.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </ThreeDScrollTriggerRow>
        </ThreeDScrollTriggerContainer>
      </div>
    </section>
  );
};

export default ClientsSection;
