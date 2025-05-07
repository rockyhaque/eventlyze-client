"use server";
import app_axios from "@/lib/axios";

export const getAllUser = async () => {
  try {
    const response = await app_axios.get("/user/all-users");
    return response.data;
  } catch (error: any) {
    console.log("error while fetching user", error);
    const message = error?.response?.data?.message || "Something went wrong!";
    return new Error(message);
  }
};

// export const myProfile = async () => {
//   try {
//     const token = Cookies.get("accessToken");

//     // If no token is found, you can handle it by throwing an error or returning an error message
//     if (!token) {
//       throw new Error("No access token found");
//     }

//     const response = await app_axios.get("/user/me", {
//       headers: {
//         Authorization: token,
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     console.log("error while fetching user", error);
//     const message = error?.response?.data?.message || "Something went wrong!";
//     return new Error(message);
//   }
// };

export const updatedUser = async (data:any) => {
    try {
        const response = await app_axios.patch("/user/update-my-profile", data);
        return response.data;
    } catch (error: any) {
        console.log("error while fetching user", error)
        const message = error?.response?.data?.message || "Something went wrong updating user!";
        return new Error(message);
    }
};

export const updatedUserStatus = async (id: string, data: any) => {
  try {
    const response = await app_axios.patch(`/user/status/${id}`, {
      status: data,
    });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating user status!";
    return new Error(message);
  }
};
export const updatedUserRole = async (id: string, data: any) => {
  try {
    const response = await app_axios.patch(`/user/update-role/${id}`, {
      role: data,
    });
    return response.data;
  } catch (error: any) {
    console.log("error while fetching user", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating user role!";
    return new Error(message);
  }
};

export const softDeleteUser = async (id: string, data: any) => {
  try {
    const response = await app_axios.patch(`/user/update-role/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.log("error while fetching user", error);
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating user role!";
    return new Error(message);
  }
};
