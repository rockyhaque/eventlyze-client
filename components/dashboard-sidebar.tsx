import { getActiveUser } from "@/hooks/getActiveUser";
import { DashboardSidebarMenu } from "./dashboard-sidebar-menu";

export async function DashboardSidebar() {
  const data = await getActiveUser()
  return (
   <DashboardSidebarMenu data={data}/>
  );
}
