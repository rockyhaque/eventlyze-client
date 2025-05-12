export const dynamic = "force-dynamic";

import ParticipantClientComponents from "@/components/modules/Participants/participantClientComponents";
import { getActiveUser } from "@/hooks/getActiveUser";
import { getAllParticipants } from "@/services/Participant";



const ParticipantsServerComponents = async () => {
    const allParticipants = await getAllParticipants();
    const user = await getActiveUser();
    const participants = allParticipants?.data


    return (
        <div>
            <ParticipantClientComponents participant={participants} user={user} />
        </div>
    );
};

export default ParticipantsServerComponents;
