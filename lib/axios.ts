"use server";
import axios from "axios";
import { cookies } from "next/headers";

const app_axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  timeout: 0,
  withCredentials: true,
});

app_axios.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      config.headers.Authorization = `token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

app_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const cookieStore = await cookies();

    if (error.response.status === 401) {
      cookieStore.delete("jwt");
      cookieStore.delete("profile");
    }

    return Promise.reject(error);
  }
);

export default app_axios;