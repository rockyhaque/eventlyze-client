"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  CalendarPlus,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Extend the JwtPayload to include custom properties
interface CustomJwtPayload extends JwtPayload {
  role: string;
  email: string;
  name?: string; // Optional property for the user's name
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const accessToken = Cookies.get("accessToken");
  let role = null;
  let decoded: CustomJwtPayload | null = null;

  try {
    if (accessToken) {
      decoded = jwtDecode<CustomJwtPayload>(accessToken);
      role = decoded?.role;
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Create Event",
      icon: CalendarPlus,
      href: "/dashboard/create-event",
      color: "text-violet-500",
    },
    {
      label: "My Events",
      icon: Calendar,
      href: "/dashboard/events",
      color: "text-violet-500",
    },
    {
      label: "Invitations",
      icon: Users,
      href: "/dashboard/invitations",
      color: "text-pink-500",
      badge: 3,
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      color: "text-orange-500",
      badge: 5,
    },
    {
      label: "Reviews",
      icon: Star,
      href: "/dashboard/reviews",
      color: "text-yellow-500",
    },
    ...(role === "Admin"
      ? [
          {
            label: "User Management",
            icon: UserCog,
            href: "/dashboard/manage-users",
            color: "text-primary",
          },
        ]
      : []),
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.href = "/login";
  };

  return (
    <div className="fixed left-0 top-0 w-full max-w-[300px]">
      <div className="flex flex-col border-r h-screen w-full">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <span className={cn(isCollapsed && "sr-only")}>Dashboard</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rotate-180 md:hidden"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === route.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                <span className={cn(isCollapsed && "hidden")}>
                  {route.label}
                </span>
                {route.badge && (
                  <span
                    className={cn(
                      "ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground",
                      isCollapsed && "hidden"
                    )}
                  >
                    {route.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="mt-auto border-t p-4">
          <div
            className={cn(
              "flex items-center justify-between gap-2",
              isCollapsed && "flex-col"
            )}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32&text=JD"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className={cn(isCollapsed && "hidden")}>
                {" "}
                <p className="text-xs text-muted-foreground">
                  {decoded?.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
