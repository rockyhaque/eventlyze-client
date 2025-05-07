"use client";
import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Mail,
  Lock,
  ChromeIcon as Google,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EFormInput from "@/components/modules/Shared/Form/EFormInput";
import { loginSchema } from "@/components/modules/Auth/login/loginValidation";
import { signInUser } from "@/services/AuthServices";
import { toast } from "sonner";
import {useRouter} from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      email: "ran@gmail.com",
      password: "000000",
    }
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await signInUser(data);
      console.log(res)
      if (res.success) {
        toast.success("Login successful!");
        router.push("/")
      } else {
        toast.error(res.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-xl border bg-card p-1 md:grid-cols-2 md:p-0">
        {/* Form Side */}
        <motion.div
          className="flex flex-col justify-center p-6 md:p-8 lg:p-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    {/* Form input */}
                    <EFormInput
                      name="email"
                      label="Username"
                      placeholder="name@example.com"
                      type="text"
                      control={form.control}
                      icon={<Mail size={20} />}
                      required={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                  
                      <Link
                        href="/forgot-password"
                        className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Form input */}
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
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me for 30 days
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
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          className="relative hidden overflow-hidden rounded-r-xl md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background"></div>
          <Image
            src="/placeholder.svg?height=800&width=600&text=Event+Login"
            alt="Login"
            width={600}
            height={800}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold">
              Discover Amazing Events
            </h2>
            <p className="mb-4 max-w-md text-sm text-white/80">
              Join thousands of event enthusiasts and create unforgettable
              memories with Eventify.
            </p>
            <Button variant="secondary" className="gap-2">
              <span>Explore Events</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
