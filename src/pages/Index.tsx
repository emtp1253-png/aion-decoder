import HeroSection from "@/components/HeroSection";
import TerminalSection from "@/components/TerminalSection";
import StepsSection from "@/components/StepsSection";
import PricingSection from "@/components/PricingSection"; // 🔍 Importación por default
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-void">
      <HeroSection />
      <TerminalSection />
      <StepsSection />
      <PricingSection /> 
      <FooterSection />
    </div>
  );
};

export default Index;
