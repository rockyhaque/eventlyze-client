"use client";
import Cookies from "js-cookie";
import axios from "axios";

export const getActiveUserClient = async () => {
  try {
    const token = Cookies.get("accessToken");

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const user = res.data.data;
    const userData = {
      name: user.name,
      email: user.email,
      userId: user.id,
      role: user.role,
      status: user.status,
    };

    return userData;
  } catch (error: any) {
    console.error("Error while getting user:", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting profile and role!";
    throw new Error(message);
  }
};
