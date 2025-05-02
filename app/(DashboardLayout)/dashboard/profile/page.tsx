import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Edit, Share2 } from "lucide-react"
import { ProfileEvents } from "@/components/profile-events"

export default function ProfilePage() {
  return (
    <div>
      <PageHeader title="My Profile" description="View and manage your public profile" />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96&text=JD" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit profile picture</span>
                </Button>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>

              <div className="flex gap-2">
                <Badge variant="secondary">Event Organizer</Badge>
                <Badge variant="secondary">Speaker</Badge>
              </div>

              <div className="w-full space-y-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined March 2023</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>243 Connections</span>
                </div>
              </div>

              <div className="flex w-full gap-2 pt-4">
                <Button className="flex-1">Edit Profile</Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share profile</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Bio</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Event enthusiast and community organizer with over 5 years of experience creating memorable
                        experiences. Passionate about bringing people together through technology, arts, and education.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Interests</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline">Technology</Badge>
                        <Badge variant="outline">Music</Badge>
                        <Badge variant="outline">Education</Badge>
                        <Badge variant="outline">Networking</Badge>
                        <Badge variant="outline">Community</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <div className="mt-2 space-y-2 text-sm">
                        <p>Email: john@example.com</p>
                        <p>Website: johndoe.com</p>
                        <p>LinkedIn: linkedin.com/in/johndoe</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <ProfileEvents />
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No reviews yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
