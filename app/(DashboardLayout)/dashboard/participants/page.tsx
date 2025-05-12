export const dynamic = "force-dynamic";

import ParticipantClientComponents from "@/components/modules/Participants/participantClientComponents";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getActiveUser } from "@/hooks/getActiveUser";
import { getAllUserEvents } from "@/services/EventServices";
import { getAllHostParticipants, getAllParticipants } from "@/services/Participant";
import { TEvent } from "@/types/eventTypes";



const ParticipantsServerComponents = async () => {
    const allParticipation = await getAllParticipants();
    const myParticipationData = allParticipation.data
    const {data} = await getAllHostParticipants()

    return (
        <div>
            <div className="mb-10">
                <CardTitle>All Participants</CardTitle>
                <CardDescription>
                    Track and manage event participants
                </CardDescription>
            </div>
            <Tabs defaultValue="requests" className="w-full">


                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <TabsList>
                        <TabsTrigger value="requests">Requests</TabsTrigger>
                        <TabsTrigger value="participation">Participation</TabsTrigger>
                    </TabsList>

                </div>
                <TabsContent value="participation" className="mt-6">
                    <ParticipantClientComponents tableType="participation" participants={myParticipationData} />
                </TabsContent>
                <TabsContent value="requests" className="mt-6">
                    <ParticipantClientComponents tableType="request" participants={data} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ParticipantsServerComponents;
