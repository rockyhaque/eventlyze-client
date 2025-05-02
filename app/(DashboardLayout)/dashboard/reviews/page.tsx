import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewsList } from "@/components/reviews-list"

export default function ReviewsPage() {
  return (
    <div>
      <PageHeader title="Reviews" description="Manage reviews for your events and your reviews of other events" />

      <Tabs defaultValue="received" className="w-full">
        <TabsList>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="given">Given</TabsTrigger>
        </TabsList>
        <TabsContent value="received" className="mt-6">
          <ReviewsList type="received" />
        </TabsContent>
        <TabsContent value="given" className="mt-6">
          <ReviewsList type="given" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
