"use server";
import app_axios from "@/lib/axios";

export const joinFreeEvent = async (eventId: any) => {
  try {
    const res = await app_axios.post("participation/join-event", eventId);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while creating the event!";
    return new Error(message);
  }
};
