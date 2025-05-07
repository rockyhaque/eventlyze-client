import { PageHeader } from "@/components/page-header"
import { ReviewsList } from "@/components/reviews-list"
import { getAllReviews } from "@/services/Reviews"

export default async function ReviewsPage() {
  const reviewData = await getAllReviews()
  const reviews = reviewData.data
  return (
    <div>
      <PageHeader title="Reviews" description="Manage reviews for your events and your reviews of other events" />
      <ReviewsList reviews={reviews} />
    </div>
  )
}
