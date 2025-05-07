import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentSubscriber({subscribers}:any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Subscriber</CardTitle>
        <CardDescription>People who have subscribe to your newsletter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscribers.map((subscriber: any) => (
            <div key={subscriber.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="uppercase">{subscriber.email.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">{subscriber?.email}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}