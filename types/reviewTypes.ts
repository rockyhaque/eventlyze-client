import { TEvent } from "./eventTypes";

export interface TEventFeedback {
  id: string;
  userId: string;
  eventId: string;
  content: string;
  rating: number;
  createdAt: string; // or Date, if you plan to parse it
  updatedAt: string;
  event:TEvent
}
