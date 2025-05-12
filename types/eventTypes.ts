export type TParticipant = {
  id: string;
  eventId: string;
  userId: string;
  status: "JOINED" | "REQUESTED" | "APPROVED" | "REJECTED"; 
  user:{
    email:string,
    name:string,
    photo:string | null,
  }
  createdAt: string;
  updatedAt: string;
};

export type TReview = {
  id: string;
  eventId: string;
  userId: string;
  content: string;
  rating: number;
  user: {
    email: string;
    name: string;
    photo: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TEvent = {
  id: string;
  title: string;
  description: string;
  category: string; // e.g., "art"
  eventType: "OFFLINE" | "ONLINE";
  platform: string | null;
  meetingLink: string | null;
  meetingLinkPassword: string | null;
  location: string;
  eventBanner: string;
  price: number;
  isPaid: boolean;
  isPublic: boolean;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  seat: number;
  ownerId: string;

  owner:{
    name:string,
    email:string,
    photo:string | null,
  },


  inviteId: string | null;
  paymentId: string | null;
  reviewId: string | null;

  eventStartTime: string;
  eventEndTime: string;
  registrationStart: string;
  registrationEnd: string;

  createdAt: string;
  updatedAt: string;

  participant: TParticipant[];
  review: TReview[];
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
};

export type TEventResponse = {
  data: TEvent[];
  meta?: TMeta;
};
