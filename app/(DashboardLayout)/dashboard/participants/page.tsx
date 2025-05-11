export const dynamic = "force-dynamic";

import ParticipantClientComponents from "@/components/modules/Participants/participantClientComponents";
import { getAllParticipants } from "@/services/Participant";



const ParticipantsServerComponents = async () => {
    const allParticipants = await getAllParticipants();
    const participants = allParticipants?.data


    return (
        <div>
            <ParticipantClientComponents participant={participants} />
        </div>
    );
};

export default ParticipantsServerComponents;
