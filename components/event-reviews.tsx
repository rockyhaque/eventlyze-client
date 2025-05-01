"use client"

import { useState } from "react"
import { Star, ThumbsUp, Flag, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Sample reviews data
const reviews = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40&text=AJ",
    },
    rating: 5,
    date: "2 weeks ago",
    content:
      "This was an amazing event! The speakers were knowledgeable and engaging, and I learned so much about the latest tech trends. The networking opportunities were also fantastic. Definitely worth attending!",
    likes: 12,
    isLiked: false,
  },
  {
    id: 2,
    user: {
      name: "Sarah Miller",
      image: "/placeholder.svg?height=40&width=40&text=SM",
    },
    rating: 4,
    date: "1 month ago",
    content:
      "Great event overall. The content was valuable and the speakers were excellent. My only complaint is that some sessions were too crowded. Would recommend to colleagues in the industry.",
    likes: 8,
    isLiked: false,
  },
  {
    id: 3,
    user: {
      name: "David Chen",
      image: "/placeholder.svg?height=40&width=40&text=DC",
    },
    rating: 5,
    date: "2 months ago",
    content:
      "One of the best tech conferences I've attended. Well-organized with a great lineup of speakers and topics. The venue was perfect and the food was excellent. Looking forward to next year!",
    likes: 15,
    isLiked: false,
  },
]

export function EventReviews() {
  const [reviewsList, setReviewsList] = useState(reviews)
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleLike = (id: number) => {
    setReviewsList(
      reviewsList.map((review) =>
        review.id === id
          ? {
              ...review,
              likes: review.isLiked ? review.likes - 1 : review.likes + 1,
              isLiked: !review.isLiked,
            }
          : review,
      ),
    )
  }

  const handleSubmitReview = () => {
    if (newReview.trim() === "" || rating === 0) return

    // In a real app, this would be an API call
    const newReviewObj = {
      id: reviewsList.length + 1,
      user: {
        name: "You",
        image: "/placeholder.svg?height=40&width=40&text=You",
      },
      rating,
      date: "Just now",
      content: newReview,
      likes: 0,
      isLiked: false,
    }

    setReviewsList([newReviewObj, ...reviewsList])
    setNewReview("")
    setRating(0)
  }

  return (
    <div className="mt-12 space-y-6">
      <h2 className="font-display text-2xl font-bold">Reviews & Ratings</h2>

      <div className="space-y-6">
        <div className="rounded-xl border p-6">
          <h3 className="mb-4 font-medium">Write a Review</h3>

          <div className="mb-4 flex items-center">
            <div className="mr-2 text-sm font-medium">Your Rating:</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={cn(
                      "h-5 w-5",
                      (hoveredRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder="Share your experience with this event..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="mb-4 min-h-[100px]"
          />

          <Button onClick={handleSubmitReview} disabled={!rating || !newReview.trim()}>
            Submit Review
          </Button>
        </div>

        <div className="space-y-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="rounded-xl border p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.user.image || "/placeholder.svg"} alt={review.user.name} />
                    <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.user.name}</div>
                    <div className="text-xs text-muted-foreground">{review.date}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                        )}
                      />
                    ))}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-2 h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Flag className="h-4 w-4" />
                        <span>Report Review</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <p className="mb-4 text-muted-foreground">{review.content}</p>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-muted-foreground"
                onClick={() => handleLike(review.id)}
              >
                <ThumbsUp className={cn("h-4 w-4", review.isLiked && "fill-primary text-primary")} />
                <span>{review.likes} found this helpful</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
