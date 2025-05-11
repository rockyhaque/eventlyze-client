export const dynamic = "force-dynamic";
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageList } from "@/components/message-list"
import { Plus, Search } from "lucide-react"

export default function MessagesPage() {
  return null
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="Messages" description="Communicate with event organizers and attendees" />
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search messages..." className="pl-9" />
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox" className="mt-6">
          <MessageList folder="inbox" />
        </TabsContent>
        <TabsContent value="sent" className="mt-6">
          <MessageList folder="sent" />
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          <MessageList folder="archived" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
