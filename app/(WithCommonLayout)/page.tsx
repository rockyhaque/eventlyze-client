import { HeroSection } from "@/components/hero-section";
import { EventSlider } from "@/components/event-slider";
import { FeaturedCategories } from "@/components/featured-categories";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";
import { HeroSectionWrapper } from "@/components/hero-section-wrapper";

export default async function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* <HeroSection /> */}
      <HeroSectionWrapper />
      <EventSlider />
      <FeaturedCategories />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
