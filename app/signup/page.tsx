"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  User,
  Mail,
  Lock,
  Github,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/components/modules/Auth/signUp/signupValidation";
import { Form } from "@/components/ui/form";
import EFormInput from "@/components/modules/Shared/Form/EFormInput";

import GoogleLoginBtn from "@/components/modules/Shared/SocialLogin/GoogleLoginBtn";
import { signUpUser } from "@/services/AuthServices";
import { toast } from "sonner";

export default function SignupPage() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = {
        ...data,
      };
      const result = await signUpUser(formData);
      if (result?.success) {
        toast.success(result.message || "User signed up successfully!");
        form.reset();
      }
    } catch (error: any) {
      toast.error(error.message || "Error signing up. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-xl border bg-card p-1 md:grid-cols-2 md:p-0">
        {/* Image Side */}
        <motion.div
          className="relative hidden overflow-hidden rounded-l-xl md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/20 to-background"></div>
          <Image
            src="https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sign Up"
            width={600}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold">
              Create & Join Events
            </h2>
            <p className="mb-4 max-w-md text-sm text-white/80">
              Sign up today to create your own events or join thousands of
              exciting events happening around you.
            </p>
            <Button variant="secondary" className="gap-2">
              <span>Learn More</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div
          className="flex flex-col justify-center p-6 md:p-8 lg:p-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Create an account
              </h1>
              <p className="text-muted-foreground">
                Sign up to start creating and joining events
              </p>
            </div>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="mt-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {/* input for name */}
                        <EFormInput
                          name="name"
                          label="Full Name"
                          placeholder="Your Name"
                          type="text"
                          control={form.control}
                          icon={<User size={20} />}
                          required={true}
                        />
                      </div>
                      {/*  input for email */}
                      <div className="space-y-2">
                        <EFormInput
                          name="email"
                          label="Email"
                          placeholder="Your Email"
                          type="text"
                          control={form.control}
                          icon={<Mail size={20} />}
                          required={true}
                        />
                      </div>
                      {/*  input for password */}
                      <div className="space-y-2">
                        <EFormInput
                          name="password"
                          label="Password"
                          placeholder="password"
                          type="password"
                          control={form.control}
                          icon={<Lock size={20} />}
                          required={true}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm font-normal">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-primary underline-offset-4 hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-primary underline-offset-4 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <span>Sign Up</span>
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="social" className="mt-4 space-y-4">
                <div className="grid gap-3">
                  <GoogleLoginBtn />
                  <Button
                    variant="outline"
                    className="h-11 w-full gap-2 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90 hover:text-white"
                  >
                    <Twitter className="h-5 w-5" />
                    <span>Sign up with Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 w-full gap-2 bg-[#24292E] text-white hover:bg-[#24292E]/90 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                    <span>Sign up with GitHub</span>
                  </Button>
                </div>
                <div className="text-center text-xs text-muted-foreground">
                  By signing up with social login, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
