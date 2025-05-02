

"use server"

import { revalidateTag } from "next/cache";

// add Newsletter
export const addNewsLetter = async (email: string): Promise<any> => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscribe`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        revalidateTag("Subscribe");
        return res.json();
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};