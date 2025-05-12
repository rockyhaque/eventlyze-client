import { Bell, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getActiveUser } from "@/hooks/getActiveUser";

export async function DashboardHeader() {
  const user = await getActiveUser();
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your upcoming events and
          invitations.
        </p>
      </div>
      <div className="flex items-center gap-2">
        {user?.role == "USER" && (
          <Button>
            <Link href="/dashboard/create-event">Create Event</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
