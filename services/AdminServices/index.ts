"use server"
import app_axios from "@/lib/axios";
export const getStats = async () => {
    try {
      const res = await app_axios.get(`/admin/stats`);
      return res.data
    } catch (error: any) {
      console.log("error while getting stats ", error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong while getting stats!";
      return new Error(message);
    }
  };