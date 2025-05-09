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

export const getAllInvitesForPerticipents = async ()=>{
  try {
    const res = await app_axios.get(`/invitation/all-participant-invitations`);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting the invitations!";
    return new Error(message);
  }
}

export const updatePerticipentsStatus = async (data: any)=>{
  try {
    console.log("payload Data",data)
    const res = await app_axios.patch(`/invitation/update-status`, data);
    console.log("update response server", res)
    return res;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating invitation status!!";
    return new Error(message);
  }
}