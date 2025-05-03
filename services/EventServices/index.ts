"use server";
import app_axios from "@/lib/axios";
import { FieldValues } from "react-hook-form";

export const createEvent = async (eventData: FieldValues) => {
  try {
    console.log("event data", eventData)
    const res = await app_axios.post("/event", eventData);
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
