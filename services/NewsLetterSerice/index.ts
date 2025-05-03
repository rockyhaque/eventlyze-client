

"use server"

import app_axios from "@/lib/axios";

// add Newsletter
export const addNewsLetter = async (email: string): Promise<any> => {
    try {
        const res = await app_axios.post("/subscribe", {email});
        return res.data;
        
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};