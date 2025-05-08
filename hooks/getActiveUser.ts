import app_axios from "@/lib/axios";

export const getActiveUser = async () => {
    try {
      const res = await app_axios.get(`/user/me`);
      
      if(res?.data?.success){
        const user = res?.data?.data;
        const userData = {
          name: user?.name,
          email: user?.email,
          userId: user?.id,
          role: user?.role,
          status: user?.status,
        };
    
        return userData;
      }
  
      return null
  
    } catch (error: any) {
      console.error("Error while getting user:", error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong while getting profile and role!";
      throw new Error(message);
    }
  };
  
