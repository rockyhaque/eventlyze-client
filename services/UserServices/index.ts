"use server"
import app_axios from "@/lib/axios";

export const getAllUser = async () => {
    try {
        const response = await app_axios.get("/user/all-users");
        return response.data;
    } catch (error: any) {
        console.log("error while fetching user", error)
        const message = error?.response?.data?.message || "Something went wrong!";
        return new Error(message);
    }
};
