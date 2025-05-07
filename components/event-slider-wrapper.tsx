import { getAllEvents } from "@/services/EventServices";
import { EventSlider } from "./event-slider";

export async function EventSliderWrapper() {
  const events = await getAllEvents();
  console.log(events);

  return <EventSlider data={events} />;
}
