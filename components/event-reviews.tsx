"use client";

import { useState } from "react";
import { Star, Flag, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TEvent, TReview } from "@/types/eventTypes";
import { formatDate } from "./modules/Shared/DateTimeFormat/formatDate";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "./ui/form";
import EFormTextarea from "./modules/Shared/Form/EFtextArea";
import { createReview } from "@/services/Reviews";
import { toast } from "sonner";
import { TActiveUser } from "@/types/userTypes";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type EventReviewsProps = {
  eventReviews: TEvent;
  activeUser: TActiveUser;
};

export function EventReviews({ eventReviews }: { eventReviews: TEvent[] }) {
  const form = useForm();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [userId, setUserId] = useState<string | null>(null);

  // Fetch userId once on mount
  useEffect(() => {
    const fetchUserId = async () => {
      const { userId } = await getActiveUser();
      setUserId(userId);
    };

    fetchUserId();
  }, []);

  // Optional: avoid running `.some` until userId is loaded
  const isUserParticipant =
    !!userId &&
    eventReviews.some((event) => event?.participant?.includes(userId));

  // console.log(isUserParticipant);
  // console.log(isUserParticipant);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
export function EventReviews({ eventReviews, activeUser }: EventReviewsProps) {
  const form = useForm();

  const { userId } = activeUser;

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // const participantUser = eventReviews?.participant?.some(
  //   (p) => p.userId === userId && p.status === "JOINED"
  // );

  const participantUser = eventReviews?.participant?.some(
    (p) => p.userId === userId
  );

  console.log(userId);

  console.log(participantUser);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const reviewData = {
        eventId: eventReviews.id,
        content: data.content,
        rating: rating,
      };

      const result = await createReview(reviewData);

      if (result?.success) {
        toast.success(result.message || "Review created successfully!");
        form.reset();
      }
    } catch (error: any) {
      toast.error(error.message || "Review created failed!");
    }
  };

  return (
    <div className="mt-12 space-y-6">
      <h2 className="font-display text-2xl font-bold">Reviews & Ratings</h2>

      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="rounded-xl border p-6">
              <h3 className="mb-4 font-medium">Write a Review</h3>
      {participantUser && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-bold">Reviews & Ratings</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          (hoveredRating || rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
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
                            (hoveredRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

              {/* <Textarea
                placeholder="Share your experience with this event..."
                className="mb-4 min-h-[100px]"
              /> */}

              <EFormTextarea
                name="content"
                placeholder="Share your experience with this event..."
                control={form.control}
                required
              />

              <Button className="my-3" type="submit">Submit Review</Button>
            </div>
          </form>
        </Form>
                {/* <Textarea
            placeholder="Share your experience with this event..."
            className="mb-4 min-h-[100px]"
          /> */}

                <EFormTextarea
                  name="content"
                  placeholder="Share your experience with this event..."
                  control={form.control}
                  required
                />

                <Button className="my-3" type="submit">
                  Submit Review
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

        <div className="space-y-6">
          {eventReviews?.review &&
            eventReviews?.review?.map((review: TReview) => (
              <div key={review.id} className="rounded-xl border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* <Avatar>
                    <AvatarImage
                      src={review.user.image || "/placeholder.svg"}
                      alt={review.user.name}
                    />
                    <AvatarFallback>
                      {review.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar> */}
                    <div>
                      {/* <div className="font-medium">{review.user.name}</div> */}
                      <div className="text-xs text-muted-foreground">
                        {formatDate(review.createdAt)}:{" "}
                        {formatDate(review.createdAt, "h:mm A")}
                      </div>
                    </div>
                  </div>
      <div className="space-y-6">
        {eventReviews?.review &&
          eventReviews?.review?.map((review: TReview) => (
            <>
              <h2 className="font-display text-2xl font-bold">
                Reviews & Ratings
              </h2>

              <div key={review.id} className="rounded-xl border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={review.user.photo}
                        alt={review.user.name}
                      />
                      <AvatarFallback>
                        {review.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      {/* <div className="font-medium">{review.user.name}</div> */}
                      <div className="text-xs text-muted-foreground">
                        {formatDate(review.createdAt)}:{" "}
                        {formatDate(review.createdAt, "h:mm A")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-8 w-8"
                        >
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-8 w-8"
                        >
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
                <p className="mb-4 text-muted-foreground">{review.content}</p>

                {/* <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-muted-foreground"
                onClick={() => handleLike(review.id)}
              >
                <ThumbsUp className={cn("h-4 w-4", review.isLiked && "fill-primary text-primary")} />
                <span>{review.likes} found this helpful</span>
              </Button> */}
              </div>
            ))}
        </div>
                {/* <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-muted-foreground"
            onClick={() => handleLike(review.id)}
          >
            <ThumbsUp className={cn("h-4 w-4", review.isLiked && "fill-primary text-primary")} />
            <span>{review.likes} found this helpful</span>
          </Button> */}
              </div>
            </>
          ))}
      </div>
    </div>
  )
}
