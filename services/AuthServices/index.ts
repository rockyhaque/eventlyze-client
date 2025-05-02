"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

export const signUpUser = async (userData: FieldValues) => {
  if (!userData || typeof userData !== "object") {
    console.error("Invalid userData:", userData);
    throw new Error("userData must be a valid object");
  }

  if (!userData) {
    throw new Error("userData is undefined");
  }

  const res = await fetch(`${baseUrl}/user/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const userInfo = await res.json();


  return userInfo;
};

export const signInUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong!");
    }

    console.log(result);

    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
