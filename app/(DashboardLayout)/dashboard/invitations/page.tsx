export const dynamic = "force-dynamic";
import { getAllInvitesForPerticipents } from "@/services/Invitation"
import InvitationWrapper from "@/components/invitation-wrapper"

export default async function InvitationsPage() {
  const invitationsDataRaw = await getAllInvitesForPerticipents()

  return (
    <div>
      <InvitationWrapper data={invitationsDataRaw?.data}/>
    </div>
  )
}
