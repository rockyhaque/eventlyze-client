"use server";
import app_axios from "@/lib/axios";
import { FieldValues } from "react-hook-form";

export const createEvent = async (eventData: FieldValues) => {
  try {
    const res = await app_axios.post("/event", eventData);
    console.log("res event crete", res);
    return res.data;
  } catch (error: any) {
    console.log("error while creating event", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while creating the event!";
    return new Error(message);
  }
};

export const getAllEvents = async () => {
  try {
    const res = await app_axios.get("/event/all-events");
    return res.data;
  } catch (error: any) {
    // console.log("error while getting events", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting events!";
    return new Error(message);
  }
};

export const getSingleEvent = async (id: string) => {
  try {
    const res = await app_axios.get(`/event/${id}`);

  } catch (error: any) {
    console.log("error while getting single", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting a event!";
    return new Error(message);
  }
};

export const updateEvent = async (id: string) => {
  try {
    const res = await app_axios.put(`/event/${id}`);
    console.log(res);
    return res.data;
  } catch (error: any) {
    console.log("error while updating event", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating event";
    return new Error(message);
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const res = await app_axios.delete(`/event/${id}`);
    console.log(res);
    return res.data;
  } catch (error: any) {
    console.log("error while deleting event", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while deleting event";
    return new Error(message);
  }
};
