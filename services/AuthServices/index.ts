"use server";

import app_axios from "@/lib/axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const signUpUser = async (userData: FieldValues) => {
  try {
    const res = await app_axios.post("/user/create-user", userData);
    return res.data;
  } catch (error: any) {
    console.error("Signup failed:", error);
    const message = error?.response?.data?.message || "Something went wrong during sign up!";
    throw new Error(message);
  }

};

export const signInUser = async (userData: FieldValues) => {
  try {
    const res = await app_axios.post("/auth/login", userData);
    const result = res.data;

    console.log(result);

    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    console.error(error);

    const message = error?.response?.data?.message || "Something went wrong!";
    return new Error(message);
  }
};


export const changePassword = async (data:any) => {
  try {
    const res = await app_axios.post("/auth/change-password", data);
    const result = res.data;


    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }

    return result;
  } catch (error: any) {
    console.error(error);

    const message = error?.response?.data?.message || "Something went wrong!";
    return new Error(message);
  }
};



