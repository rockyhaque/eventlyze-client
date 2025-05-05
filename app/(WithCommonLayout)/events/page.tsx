import { EventsFilter } from "@/components/events-filter";
import { EventsGrid } from "@/components/events-grid";
import { PageHeader } from "@/components/page-header";
import { EventsHero } from "@/components/events-hero";
import { EventCategories } from "@/components/event-categories";
import { FeaturedOrganizers } from "@/components/featured-organizers";
import { UpcomingEvents } from "@/components/upcoming-events";
import { Newsletter } from "@/components/newsletter";
import { getAllEvents } from "@/services/EventServices";

export default async function EventsPage() {
  const events = await getAllEvents();

  // if (events instanceof Error) {
  //   console.error(events.message);
  // }

  return (
    <div>
      <EventsHero />
      <div className="container max-w-7xl py-10">
        <PageHeader
          title="Discover Events"
          description="Find and join amazing events happening around you"
        />
        <EventsFilter />
        <EventsGrid eventsData={events?.data} />
      </div>
      <EventCategories />
      <UpcomingEvents />
      <FeaturedOrganizers />
      <Newsletter />
    </div>
  );
}
