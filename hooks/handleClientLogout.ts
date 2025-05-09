"use client"
import Cookies from "js-cookie";
export const handleClientLogout = () => {
    Cookies.remove("accessToken");
    window.location.href = "/login";
};
