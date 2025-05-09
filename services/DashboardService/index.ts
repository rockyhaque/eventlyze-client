"use server"
import app_axios from "@/lib/axios";

export const getChartData = async () =>{
    try {
        const res = await app_axios.get(`/dashboard/chart`);
        return res.data
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while getting a event!";
        return new Error(message);
      }
}