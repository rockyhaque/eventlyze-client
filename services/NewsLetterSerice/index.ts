
"use server"

import { revalidateTag } from "next/cache";


// add Newsletter
export const addNewsLetter = async (data: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscribe`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        revalidateTag("Subscribe");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};


