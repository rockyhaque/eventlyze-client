"use server"
import app_axios from "@/lib/axios";
import { FieldValues } from "react-hook-form";


export const createReview = async (reviewData: FieldValues) => {
  try {
    const res = await app_axios.post("/reviews", reviewData);
    console.log("res event review", res);
    return res.data;
  } catch (error: any) {
    console.log("error while creating review", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while creating the review!";
    return new Error(message);
  }
};

export const getAllReviews = async () => {
    try {
      const res = await app_axios.get(`/reviews`);
      return res.data
    } catch (error: any) {
      console.log("error while getting single", error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong while getting stats!";
      return new Error(message);
    }
  };