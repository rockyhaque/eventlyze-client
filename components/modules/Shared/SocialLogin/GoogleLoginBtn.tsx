import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import { ChromeIcon as Google } from "lucide-react";

const GoogleLoginBtn = () => {
  // google login function
  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <Button
      onClick={handleLogin}
      variant="outline"
      className="h-11 w-full gap-2 bg-white text-black hover:bg-white/90 hover:text-black"
    >
      <Google className="h-5 w-5" />
      <span>Sign up with Google</span>
    </Button>
  );
};

export default GoogleLoginBtn;
