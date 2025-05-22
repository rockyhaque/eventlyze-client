

"use server"

import app_axios from "@/lib/axios";

// add Newsletter
export const addNewsLetter = async (email: string): Promise<any> => {
    try {
        const res = await app_axios.post("/subscribe", { email });
        return res.data;

    } catch (error: any) {
        return { success: false, message: error.message };
    }
};




// Get all Notification
export const getAllSubscriber = async () => {
    try {
        const res = await app_axios.get(`subscribe/get-all-subscribers`);

        return res.data;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            "Something went wrong while getting a subscriber!";
        return new Error(message);
    }
};