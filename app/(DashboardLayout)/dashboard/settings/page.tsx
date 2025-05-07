import { PageHeader } from "@/components/page-header"
import UpdateUserForm from "@/components/update-user-form copy";
import { getActiveUser } from "@/hooks/getActiveUser"

export default async function  SettingsPage() {
  const user = await getActiveUser();
  

  console.log("fetch user", user)


 
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />
    {/* UPDATE USER FORM  */}
    <UpdateUserForm user={user}/>
    </div>
  )
}
