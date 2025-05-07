"use server"

import app_axios from "@/lib/axios";


// Get all Notification
export const getAllNotification = async () => {
    try {
        const res = await app_axios.get(`notifications/all-notification`);
        // console.log("notification", res);

        return res.data;
    } catch (error: any) {
        console.log("error while getting all notification", error);
        const message =
            error?.response?.data?.message ||
            "Something went wrong while getting a notification!";
        return new Error(message);
    }
};
