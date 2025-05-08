"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { getAllNotification } from "@/services/NotificationService"
import Cookies from "js-cookie";
import { getActiveUser } from "@/hooks/getActiveUser"
import { getActiveUserClient } from "@/hooks/getActiveUserClient"


type Notification = {
  id: string
  userId: string
  eventId: string
  message: string
  read: boolean
  readUser: boolean
  createdAt: string
  updatedAt: string
  avatar?: string
  avatarFallback: string
}

interface NotificationResponse {
  data: {
    totalUnReadNotification: number;
    allNotifications: any
  };
}


export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const [user, setUser]=useState<any>()


  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await getActiveUserClient()
        setUser(user)
      } catch (err) {
        console.error("Fetch error:", err);
        setUser(null);
      }
    };

    getUserData();
  }, []);

  console.log("Current user", user);

  const [notifs, setNotifs] = useState<NotificationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const { role } = await getActiveUser();
  //       console.log("role", role);

  //       setUser(role || null);
  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //       setUser(null);
  //     }
  //   };

  //   getUserData();
  // }, []);

  // console.log("Current user", user);


  // console.log("main notification",notifs);
  // console.log("ss", notificationss);


  const unreadCount = notifs?.data?.totalUnReadNotification as number
  const notifsdata = notifs?.data?.allNotifications
  const notifsLength = notifs?.data?.allNotifications.length

  // const markAllAsRead = () => {
  //   setNotifs(notifs.data?.allNotifications.map((n: any) => ({ ...n, readUser: true })))
  // }

  const markAllAsRead = () => {
    if (!notifs) return; // Handle null case

    setNotifs({
      ...notifs,
      data: {
        ...notifs.data,
        allNotifications: notifs.data.allNotifications.map((n: Notification) => ({ ...n, readUser: true }))
      }
    });
  }

  // notification data fatching Function
  useEffect(() => {
    const getNotificationData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllNotification();

        if (data instanceof Error) {
          setError(data.message);
        } else {
          // setNotifications(data);
          setNotifs(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    getNotificationData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  // date Formating
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 7) {
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else if (diffInDays > 0) {

      return `${diffInDays}d ago`;
    } else if (diffInHours > 0) {

      return `${diffInHours}h ago`;
    } else if (diffInMinutes > 0) {

      return `${diffInMinutes}m ago`;
    } else {

      return 'Just now';
    }
  };


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hidden md:flex" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto text-xs">
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-80">
          <div className="flex flex-col">
            {notifsLength > 0 ? (
              notifsdata.map((notification: Notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 border-b p-3 transition-colors hover:bg-muted/50",
                    !notification.readUser && "bg-muted/30",
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={notification.avatar || "/placeholder.svg"} alt="" />
                    <AvatarFallback>{notification.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm font-medium", !notification.readUser && "font-semibold")}>
                      {notification?.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(notification?.createdAt)}</p>
                  </div>
                  {!notification.readUser && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">No notifications</div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full justify-center text-xs" asChild>
            <Link href="/dashboard/notifications">View all notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
