import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardMockup from "./DashboardMockup";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-150"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-background/20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary/40 text-primary bg-background/80 px-4 py-1.5 text-xs backdrop-blur-sm">
              ERP + BI + IA pour les entreprises algériennes
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Le cockpit{" "}
              <span className="gradient-text">tout-en-un</span>{" "}
              pour piloter votre entreprise
            </h1>

            <p className="text-lg text-foreground/70 max-w-lg leading-relaxed">
              Centralisez vos données, automatisez vos rapports et prenez des décisions
              plus rapides grâce à l'intelligence artificielle. Timd réunit ERP, BI, IA
              et CRM dans une seule plateforme.
            </p>

            <Badge variant="outline" className="border-primary/40 text-primary bg-background/80 px-4 py-1.5 text-xs backdrop-blur-sm">
              Pour PME, CMI et grandes entreprises en Algérie
            </Badge>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Réserver une démo
              </Button>
              <Button size="lg" variant="outline" className="border-foreground/20 bg-background/60 backdrop-blur-sm hover:bg-background/80 text-foreground">
                Voir un exemple de tableau de bord
              </Button>
            </div>
          </div>

          {/* Right — Dashboard Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl -z-10" />
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
