import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardMockup from "./DashboardMockup";
import heroVideo from "@/assets/hero-video.mp4";
import { ArrowRight, Play } from "lucide-react";

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

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="border-primary/50 text-primary-foreground bg-primary/20 backdrop-blur-md px-4 py-1.5 text-xs"
            >
              ERP + BI + IA pour les entreprises algériennes
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Le cockpit{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-purple-500">
                tout-en-un
              </span>{" "}
              pour piloter votre entreprise
            </h1>

            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              Centralisez vos données, automatisez vos rapports et prenez des décisions
              plus rapides grâce à l'intelligence artificielle. Timd réunit ERP, BI, IA
              et CRM dans une seule plateforme.
            </p>

            <Badge
              variant="outline"
              className="border-white/20 text-white/80 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs"
            >
              Pour PME, CMI et grandes entreprises en Algérie
            </Badge>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/30"
              >
                Réserver une démo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white rounded-full"
              >
                <Play className="w-4 h-4 mr-2" />
                Voir un exemple
              </Button>
            </div>
          </div>

          {/* Right — Dashboard Mockup in glass card */}
          <div className="relative">
            {/* Gradient glow behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-[2rem] blur-3xl opacity-60" />
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-1 shadow-2xl shadow-black/20">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
