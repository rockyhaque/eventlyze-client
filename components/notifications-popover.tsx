
// "use client"

// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { Bell } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { cn } from "@/lib/utils"
// import { toast } from "sonner"
// import { getAllNotification, updateAllNotification, updateSingleNotification } from "@/services/NotificationService"
// import { getActiveUserClient } from "@/hooks/getActiveUserClient"

// type Notification = {
//   id: string
//   userId: string
//   eventId: string
//   message: string
//   read: boolean
//   readUser: boolean
//   createdAt: string
//   updatedAt: string
//   avatar?: string
//   avatarFallback: string
// }

// interface NotificationResponse {
//   data: {
//     totalUnReadNotification: number
//     allNotifications: Notification[]
//   }
// }

// export function NotificationsPopover() {
//   const [open, setOpen] = useState(false)
//   const [user, setUser] = useState<any>()
//   const [notifs, setNotifs] = useState<NotificationResponse | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [showAll, setShowAll] = useState(false)

//   const unreadCount = notifs?.data?.totalUnReadNotification || 0
//   const allNotifs = notifs?.data?.allNotifications || []
//   const displayedNotifs = showAll ? allNotifs : allNotifs.slice(0, 5)
//   const hasMore = allNotifs.length > 5

//   // Current user data get
//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const user = await getActiveUserClient()
//         setUser(user)
//       } catch (err) {
//         console.error("Fetch error:", err)
//         setUser(null)
//       }
//     };

//     getUserData();
//   }, []);


//   const [notifs, setNotifs] = useState<NotificationResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);




//   const unreadCount = notifs?.data?.totalUnReadNotification as number
//   const notifsdata = notifs?.data?.allNotifications
//   const notifsLength = notifs?.data?.allNotifications.length
//     getUserData()
//   }, [])

//   // All Notification Update
//   const markAllAsReadUser = async () => {
//     try {
//       const result = await updateAllNotification()
//       result?.success
//         ? toast.success(result.message)
//         : toast.error(result?.message)
//     } catch (error: any) {
//       toast.error(error.message)
//     }
//   }


//   // Single Notification Update
//   const handleUpdateSingleNotification = async (id: string) => {
//     try {
//       const result = await updateSingleNotification(id)
//       result?.success
//         ? toast.success(result.message)
//         : toast.error(result?.message)
//     } catch (error: any) {
//       toast.error(error.message)
//     } 
//   }

//   // notification data fetching Function
//   useEffect(() => {
//     const getNotificationData = async () => {
//       setLoading(true)
//       setError(null)

//       try {
//         const data = await getAllNotification()
//         if (data instanceof Error) {
//           setError(data.message)
//         } else {
//           setNotifs(data)
//         }
//       } catch (err) {
//         console.error("Fetch error:", err)
//         setError("Failed to fetch notifications")
//       } finally {
//         setLoading(false)
//       }
//     }

//     getNotificationData()
//   }, [])

//   // date Formatting
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffInMilliseconds = now.getTime() - date.getTime()

//     const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
//     const diffInMinutes = Math.floor(diffInSeconds / 60)
//     const diffInHours = Math.floor(diffInMinutes / 60)
//     const diffInDays = Math.floor(diffInHours / 24)

//     if (diffInDays > 7) {
//       return date.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric'
//       })
//     } else if (diffInDays > 0) {
//       return `${diffInDays}d ago`
//     } else if (diffInHours > 0) {
//       return `${diffInHours}h ago`
//     } else if (diffInMinutes > 0) {
//       return `${diffInMinutes}m ago`
//     } else {
//       return 'Just now'
//     }
//   }

//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative hidden md:flex" aria-label="Notifications">
//           <Bell className="h-5 w-5" />
//           {unreadCount > 0 && (
//             <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
//               {unreadCount}
//             </span>
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-0" align="end">
//         <div className="flex items-center justify-between border-b p-3">
//           <h3 className="font-medium">Notifications</h3>
//           {unreadCount > 0 && (
//             <Button variant="ghost" size="sm" onClick={markAllAsReadUser} className="h-auto text-xs">
//               Mark all as read
//             </Button>
//           )}
//         </div>

//         <ScrollArea className="h-80">
//           <div className="flex flex-col">
//             {displayedNotifs.length > 0 ? (
//               displayedNotifs.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={cn(
//                     "flex items-start gap-3 border-b p-3 transition-colors hover:bg-muted/50",
//                     (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN")
//                       ? !notification.read && "bg-muted/30"
//                       : !notification.readUser && "bg-muted/30"
//                   )}
//                 >
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src={notification.avatar || "/placeholder.svg"} alt="" />
//                     <AvatarFallback>{notification.avatarFallback}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1 space-y-1">
//                     <p
//                       onClick={() => handleUpdateSingleNotification(notification.id)}
//                       className={cn(
//                         "text-sm font-medium hover:text-yellow-50 cursor-pointer",
//                         (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN")
//                           ? !notification.read && "font-semibold"
//                           : !notification.readUser && "font-semibold"
//                       )}
//                     >
//                       {notification.message}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {formatDate(notification.createdAt)}
//                     </p>
//                   </div>
//                   {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN")
//                     ? !notification.read && (
//                       <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
//                     )
//                     : !notification.readUser && (
//                       <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
//                     )
//                   }
//                 </div>
//               ))
//             ) : (
//               <div className="p-8 text-center text-sm text-muted-foreground">
//                 No notifications
//               </div>
//             )}
//           </div>
//         </ScrollArea>

//         {!showAll && hasMore && (
//           <div className="border-t p-2">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="w-full justify-center text-xs"
//               onClick={() => setShowAll(true)}
//             >
//               View all notifications
//             </Button>
//           </div>
//         )}
//       </PopoverContent>
//     </Popover>
//   )
// }


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
import { getAllNotification, updateAllNotification, updateSingleNotification } from "@/services/NotificationService"
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
    totalUnReadNotification: number
    allNotifications: Notification[]
  }
}

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [notifs, setNotifs] = useState<NotificationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const unreadCount = notifs?.data?.totalUnReadNotification || 0
  const allNotifs = notifs?.data?.allNotifications || []
  const displayedNotifs = showAll ? allNotifs : allNotifs.slice(0, 5)
  const hasMore = allNotifs.length > 5

  // Current user data get
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await getActiveUserClient()
        setUser(user)
      } catch (err) {
        console.error("Fetch error:", err)
        setUser(null)
      }
    }

    getUserData()
  }, [])

  // All Notification Update
  const markAllAsReadUser = async () => {
    try {
      const result = await updateAllNotification()
      if (result?.success) {
        toast.success(result.message)
        // Refresh notifications after marking all as read
        fetchNotifications()
      } else {
        toast.error(result?.message || "Failed to mark all as read")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    }
  }

  // Single Notification Update
  const handleUpdateSingleNotification = async (id: string) => {
    try {
      const result = await updateSingleNotification(id)
      if (result?.success) {
        toast.success(result.message)
        // Refresh notifications after updating single notification
        fetchNotifications()
      } else {
        toast.error(result?.message || "Failed to update notification")
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    }
  }

  // Notification data fetching Function
  const fetchNotifications = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getAllNotification()
      if (data instanceof Error) {
        setError(data.message)
      } else {
        setNotifs(data)
      }
    } catch (err) {
      console.error("Fetch error:", err)
      setError("Failed to fetch notifications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchNotifications()
    }
  }, [user])

  // date Formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMilliseconds = now.getTime() - date.getTime()

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays > 7) {
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } else if (diffInDays > 0) {
      return `${diffInDays}d ago`
    } else if (diffInHours > 0) {
      return `${diffInHours}h ago`
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes}m ago`
    } else {
      return 'Just now'
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

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
            <Button variant="ghost" size="sm" onClick={markAllAsReadUser} className="h-auto text-xs">
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-80">
          <div className="flex flex-col">
            {displayedNotifs.length > 0 ? (
              displayedNotifs.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 border-b p-3 transition-colors hover:bg-muted/50",
                    (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN")
                      ? !notification.read && "bg-muted/30"
                      : !notification.readUser && "bg-muted/30"
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={notification.avatar || "/placeholder.svg"} alt="" />
                    <AvatarFallback>{notification.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p
                      onClick={() => handleUpdateSingleNotification(notification.id)}
                      className={cn(
                        "text-sm font-medium hover:text-yellow-50 cursor-pointer",
                        (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN")
                          ? !notification.read && "font-semibold"
                          : !notification.readUser && "font-semibold"
                      )}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                  {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN")
                    ? !notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    )
                    : !notification.readUser && (
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    )
                  }
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            )}
          </div>
        </ScrollArea>

        {!showAll && hasMore && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-xs"
              onClick={() => setShowAll(true)}
            >
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}