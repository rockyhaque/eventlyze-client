import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TEventFeedback } from "@/types/reviewTypes";
import { formatDate } from "./modules/Shared/DateTimeFormat/formatDate";

export function ReviewsList({ reviews }: { reviews: TEventFeedback[] }) {
  if (reviews?.length < 1 || !reviews) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="text-4xl">⭐</div>
        <h3 className="mt-4 text-lg font-medium text-white">No reviews</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't received any reviews yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" >
      {reviews?.map((review: TEventFeedback) => (
        <Card key={review?.id}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                   <Avatar>
                      <AvatarImage
                        src={review?.event?.eventBanner}
                        alt={review?.event?.title}
                      />
                      <AvatarFallback>
                        {review?.event?.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  <div>
                    <p className="text-sm text-white font-bold">
                      {review?.event?.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)]?.map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm">{review.content}</p>
              <div className="text-sm text-muted-foreground flex justify-between">
                {formatDate(review?.createdAt)}
                <span className="block text-violet-600 font-bold mt-1">
                  {formatDate(review?.createdAt, "h:mm A")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
