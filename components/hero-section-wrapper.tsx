import { getAllEvents } from "@/services/EventServices";
import { HeroSection } from "./hero-section";
import { getActiveUser } from "@/hooks/getActiveUser";

export async function HeroSectionWrapper() {
  const user = await getActiveUser()
  const events = await getAllEvents();
  return <HeroSection data={events} user={user} />;
}
