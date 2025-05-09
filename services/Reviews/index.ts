"use server";
import app_axios from "@/lib/axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createReview = async (reviewData: FieldValues) => {
  try {
    const res = await app_axios.post("/reviews", reviewData);
    revalidateTag("reviews");
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while creating the review!";
    return new Error(message);
  }
};

export const getAllReviews = async () => {
  try {
    const res = await app_axios.get(`/reviews`);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting stats!";
    return new Error(message);
  }
};
