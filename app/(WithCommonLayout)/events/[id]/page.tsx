import { EventDetailsContent } from "@/components/event-details-content";
import { EventActions } from "@/components/event-actions";
import { EventReviews } from "@/components/event-reviews";
import { RelatedEvents } from "@/components/related-events";
import { EventCountdown } from "@/components/event-countdown";
import { EventAttendees } from "@/components/event-attendees";
import { getSingleEvent } from "@/services/EventServices";
import { EventDetailsHero } from "@/components/event-details-hero";
import { getActiveUser } from "@/hooks/getActiveUser";

export default async function EventDetailsPage({ params }: { params: any }) {
  const eventId = (await params).id;

  const res = await getSingleEvent(eventId as string);
  const eventDetails = res.data;

  const activeUser = await getActiveUser();

  console.log(eventDetails);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 h-[70vh] overflow-hidden pointer-events-none"></div>

      <div className="relative z-10">
        {eventDetails && <EventDetailsHero eventDetails={eventDetails} />}
      </div>

      <div className="relative z-20 bg-background">
        <div className="container max-w-7xl py-10">
          <div className="mb-8">
            <EventCountdown
              eventStartTime={eventDetails?.registrationEnd}
              title="Registration days left"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {activeUser && (
                <EventDetailsContent activeUser={activeUser} eventDetails={eventDetails} />
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-8">
                {activeUser && (
                  <EventActions
                    activeUser={activeUser}
                    eventDetails={eventDetails}
                  />
                )}
                <EventAttendees eventDetails={eventDetails} />
              </div>
            </div>
          </div>

          <div className="mt-16">
            {activeUser && (
              <EventReviews
                activeUser={activeUser}
                eventReviews={eventDetails}
              />
            )}
          </div>

          <div className="mt-16">
            <RelatedEvents />
          </div>
        </div>
      </div>
    </div>
  );
}
