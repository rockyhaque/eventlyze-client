import { getAllEvents } from "@/services/EventServices";
import { HeroSection } from "./hero-section";

export async function HeroSectionWrapper() {
  const events = await getAllEvents();
  return <HeroSection data={events} />;
}
