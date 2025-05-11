import { EventsFilter } from "@/components/events-filter";
import { EventsGrid } from "@/components/events-grid";
import { PageHeader } from "@/components/page-header";
import { EventsHero } from "@/components/events-hero";
import { EventCategories } from "@/components/event-categories";
import { FeaturedOrganizers } from "@/components/featured-organizers";
import { UpcomingEvents } from "@/components/upcoming-events";
import { Newsletter } from "@/components/newsletter";
import { getAllEvents } from "@/services/EventServices";

import { loadSearchParams } from "../search-params";
import type { SearchParams } from "nuqs/server";
import { revalidateTag } from "next/cache";
import { NotFoundData } from "@/components/modules/Shared/NotFoundData/NotFoundData";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EventsPage({ searchParams }: PageProps) {
  const { searchTerm, isPaid, sortBy, sortOrder, category } = await loadSearchParams(searchParams);

  const events = await getAllEvents({
    searchTerm,
    isPaid,
    sortBy,
    sortOrder,
    category,
  });

  async function refetchEvents() {
    "use server";

    revalidateTag("events");
  }

  return (
    <div>
      <EventsHero refetchEvents={refetchEvents} />
      <div className="container max-w-7xl py-10">
        <PageHeader
          title="Discover Events"
          description="Find and join amazing events happening around you"
        />

        <EventsFilter refetchEvents={refetchEvents} />

        {!events || !events?.data || events?.data?.length === 0 ? (
          <NotFoundData />
        ) : (
          <EventsGrid eventsData={events?.data} />
        )}
      </div>
      <EventCategories />
      <UpcomingEvents data={events?.data} />
      <FeaturedOrganizers />
      <Newsletter />
    </div>
  );
}
