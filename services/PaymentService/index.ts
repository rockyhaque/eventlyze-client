"use server"

import { cookies } from "next/headers";


// get veryfy order
export const veryfyPayment = async (tran_id?: string) => {
    // const params = new URLSearchParams();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/payments/ipn?tran_id=${tran_id}`,
            {
                next: {
                    tags: ["Payment"],
                },
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }

        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};