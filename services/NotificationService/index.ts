"use server"

import app_axios from "@/lib/axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


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



// Get Current User
// export const getCurrentUser = async () => {
//     const accessToken = (await cookies()).get("accessToken")?.value;
//     let decodedData = null;

//     if (accessToken) {
//         decodedData = await jwtDecode(accessToken);
//         return decodedData;
//     } else {
//         return null;
//     }
// };
