"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";



export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: unknown) {
     if(error instanceof Error) {
      return error
     }
     return error
  }
}

export const loginUser = async (userData: FieldValues) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await res.json();
  
      if (result?.success) {
        (await cookies()).set("accessToken", result?.data?.accessToken);
        (await cookies()).set("refreshToken", result?.data?.refreshToken);
      }
  
      return result;
    } catch (error:unknown) {
       if(error instanceof Error){
        return error.message;
       }
    }
  };