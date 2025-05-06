import { getAllEvents } from "@/services/EventServices";
import { HeroSection } from "./hero-section";

export async function HeroSectionWrapper() {
  const events = await getAllEvents();
  console.log(events);

  return <HeroSection data={events} />;
}
