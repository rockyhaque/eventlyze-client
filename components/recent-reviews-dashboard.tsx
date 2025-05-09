import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageHeader } from "./page-header"

export function RecentReviewsDashboard({ reviews }: any) {

  if (reviews?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="text-4xl">⭐</div>
        <h3 className="mt-4 text-lg font-medium">No reviews</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't received any reviews yet.
        </p>
      </div>
    )
  }

  return (
    <Card className="space-y-4 p-5">
      <PageHeader title="Recent Reviews" description="Recent Reviews on your events! Every words counts!" />
      {reviews?.map((review: any) => (
        <Card key={review?.id}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {review?.user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">

                    <p className="text-sm text-white font-bold">
                      {review?.user?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{review?.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
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

            </div>
          </CardContent>
        </Card>
      ))}
    </Card>
  )
}
