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

export const createPayment = async (eventId: any) => {
  try {
    const res = await app_axios.post("/payments/create", eventId);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while creating the event!";
    return new Error(message);
  }
};



// Get all Participant
export const getAllParticipants = async () => {
  try {
    const res = await app_axios.get(`participation/all-participants`);

    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting a notification!";
    return new Error(message);
  }
};


// Participator status update
export const updatedParticipatStatus = async (id: string, data: any) => {
  try {
    const response = await app_axios.patch(`/participation/update-status/${id}`, {
      role: data,
    });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating user role!";
    return new Error(message);
  }
};
