"use server";
import app_axios from "@/lib/axios";
import { FieldValues } from "react-hook-form";

export const sentInvitation = async (
  eventId: string,
  eventData: FieldValues
) => {
  try {
    const res = await app_axios.post(`/invitation/${eventId}`, eventData);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while creating the event!";
    return new Error(message);
  }
};
