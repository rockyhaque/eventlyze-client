


export type TParticipantUser = {
    id: string;
    eventId: string;
    event: {
        title: string;
        category: string;
    }
    userId: string;
    user: {
        name: string;
        email: string;
        photo: string;
    }
    status: "JOINED" | "REQUESTED" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;
};