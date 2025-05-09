"use server"

import app_axios from "@/lib/axios";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";


// Get all Notification
export const getAllNotification = async () => {
    try {
        const res = await app_axios.get(`notifications/all-notification`);

        return res.data;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            "Something went wrong while getting a notification!";
        return new Error(message);
    }
};


// All Notification update
export const updateAllNotification = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/notifications/update-notification`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["Notification"],
                revalidate: 10,
            },
        });
        revalidateTag("Notification");
        return res.json();

    } catch (error: any) {
        return Error(error);
    }
};


// Single Notification Update Function
export const updateSingleNotification = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/notifications/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["Notification"],
                revalidate: 10,
            },
        });

        revalidateTag("Notification");
        return res.json();

    } catch (error: any) {
        return Error(error);
    }
};

