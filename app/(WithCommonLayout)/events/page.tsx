import { EventsFilter } from "@/components/events-filter"
import { EventsGrid } from "@/components/events-grid"
import { PageHeader } from "@/components/page-header"
import { EventsHero } from "@/components/events-hero"
import { EventCategories } from "@/components/event-categories"
import { FeaturedOrganizers } from "@/components/featured-organizers"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Newsletter } from "@/components/newsletter"

export default function EventsPage() {
  return (
    <div>
      <EventsHero />
      <div className="container max-w-7xl py-10">
        <PageHeader title="Discover Events" description="Find and join amazing events happening around you" />
        <EventsFilter />
        <EventsGrid />
      </div>
      <EventCategories />
      <UpcomingEvents />
      <FeaturedOrganizers />
      <Newsletter />
    </div>
  )
}
