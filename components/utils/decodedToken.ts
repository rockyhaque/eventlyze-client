import { TTokenUser } from "@/types/tokenTypes";
import { jwtDecode } from "jwt-decode";

export const decodedToken = (token?: string): TTokenUser | null => {
  if (!token) {
    return null;
  }

  try {
    return jwtDecode<TTokenUser>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
