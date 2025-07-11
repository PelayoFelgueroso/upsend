import { LandingFeatures } from "@/landingPage/components/LandingFeatures";
import { LandingFooter } from "@/landingPage/components/LandingFooter";
import { LandingHeader } from "@/landingPage/components/LandingHeader";
import { LandingHero } from "@/landingPage/components/LandingHero";
import { LandingPricing } from "@/landingPage/components/LandingPricing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}
