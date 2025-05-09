import { PageHeader } from "@/components/page-header"
import UpdatePasswordForm from "@/components/update-password-form";
import UpdateUserForm from "@/components/update-user-form";
import { getActiveUser } from "@/hooks/getActiveUser"

export default async function  SettingsPage() {
  const user = await getActiveUser();
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />
    {/* UPDATE USER FORM  */}
    <UpdateUserForm user={user}/>
    <UpdatePasswordForm/>
    </div>
  )
}
