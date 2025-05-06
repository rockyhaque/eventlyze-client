"use server"
import app_axios from "@/lib/axios";
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