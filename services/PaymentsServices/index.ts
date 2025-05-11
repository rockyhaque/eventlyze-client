"use server";
import app_axios from "@/lib/axios";
import { unstable_cache } from "next/cache";
import { FieldValues } from "react-hook-form";

// interface IGetPaymentsParams {
//   searchTerm?: string;
//   isPaid?: string;
//   sortBy?: string;
//   sortOrder?: string;
//   category?: string;
// }

export const getAllPayments = async () => {
  try {
    const res = await app_axios.get("/payments/all-payments");

    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting events!";
    return new Error(message);
  }
};
