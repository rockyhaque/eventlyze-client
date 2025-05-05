"use server";
import app_axios from "@/lib/axios";

export const joinFreeEvent = async (eventId: string) => {
  try {
    console.log("event data", eventId);
    const res = await app_axios.post("participation/join-event", eventId);
    console.log(res);
    return res.data;
  } catch (error: any) {
    console.log("error while creating event", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while creating the event!";
    return new Error(message);
  }
};
