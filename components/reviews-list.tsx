import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ReviewType = "received" | "given"

interface ReviewsListProps {
  type: ReviewType
}

export function ReviewsList({ type }: ReviewsListProps) {
  // Mock data for different review types
  const reviews = {
    received: [
      {
        id: "1",
        reviewer: "Sarah Johnson",
        reviewerAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
        reviewerInitials: "SJ",
        eventName: "Tech Conference 2023",
        rating: 5,
        comment: "Excellent organization! The speakers were top-notch and the venue was perfect. Will definitely attend next year.",
        date: "Oct 16, 2023",
        helpful: 12,
        replied: true,
      },
      {
        id: "2",
        reviewer: "Michael Brown",
        reviewerAvatar: "/placeholder.svg?height=40&width=40&text=MB",
        reviewerInitials: "MB",
        eventName: "Product Launch Party",
        rating: 4,
        comment: "Great event overall. The product demos were impressive and the networking opportunities were valuable. The only downside was the limited parking.",
        date: "Nov 6, 2023",
        helpful: 8,
        replied: false,
      },
    ],
    given: [
      {
        id: "3",
        eventName: "Annual Team Retreat",
        organizer: "David Lee",
        organizerAvatar: "/placeholder.svg?height=40&width=40&text=DL",
        organizerInitials: "DL",
        rating: 5,
        comment: "Fantastic retreat! The activities were well-planned and the accommodations were excellent. Great team-building experience.",
        date: "Sep 12, 2023",
        helpful: 5,
      },
      {
        id: "4",
        eventName: "Design Workshop",
        organizer: "Emma Wilson",
        organizerAvatar: "/placeholder.svg?height=40&width=40&text=EW",
        organizerInitials: "EW",
        rating: 3,
        comment: "The content was good, but the workshop felt rushed. Would have preferred more hands-on time with the tools.",
        date: "Aug 15, 2023",
        helpful: 2,
      },
    ],
  }

  const currentReviews = reviews[type]

  if (currentReviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="text-4xl">⭐</div>
        <h3 className="mt-4 text-lg font-medium">No reviews</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {type === "received" && "You haven't received any reviews yet."}
          {type === "given" && "You haven't written any reviews yet."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {currentReviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={type === "received" ? review.reviewerAvatar : review.organizerAvatar} 
                      alt={type === "received" ? review.reviewer : review.organizer} 
                    />
                    <AvatarFallback>{type === "received" ? review.reviewerInitials : review.organizerInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{type === "received" ? review.reviewer : review.organizer}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          \
