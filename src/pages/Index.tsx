import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PourQuiSection from "@/components/PourQuiSection";
import ProblemesSection from "@/components/ProblemesSection";
import SolutionSection from "@/components/SolutionSection";
import PreuveMarcheSection from "@/components/PreuveMarcheSection";
import AccompagnementSection from "@/components/AccompagnementSection";
import VisionSection from "@/components/VisionSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <PourQuiSection />
      <ProblemesSection />
      <SolutionSection />
      <PreuveMarcheSection />
      <AccompagnementSection />
      <VisionSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
