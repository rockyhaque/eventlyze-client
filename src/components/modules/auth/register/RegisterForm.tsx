"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"
import { FormData, formSchema, getPasswordStrength } from "./registerValidtion"
import { registerUser } from "@/services/AuthService"
import { toast } from "sonner"


const defaultValues: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: true,
  }




export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {register,handleSubmit,formState: { errors },watch,reset} = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  const password = watch("password")
  const passwordStrength = getPasswordStrength(password)

 
  const onSubmit = async (data: FormData) => {
     const newdata = {
       name: data.firstName + " " + data.lastName,
       email: data.email,
       password: data.password
     }
    try {
      setIsLoading(true);
      const res = await registerUser(newdata);
      setIsLoading(false);
      reset()
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  

  return (
   
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Eventlyze</h1>
          <p className="text-purple-200 mt-2">Create your account</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("firstName")} placeholder="John" />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("lastName")} placeholder="Doe" />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="name@example.com" />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder= {showPassword ? "Entery your password" : "**********"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

                {password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span>{passwordStrength.text}</span>
                      <span>
                        {password.length < 8 ? (
                          "Minimum 8 characters"
                        ) : (
                          <Check className="h-3 w-3 text-green-500" />
                        )}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" {...register("agreeTerms")} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-800">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-800">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-sm text-red-500">{errors.agreeTerms.message}</p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 mt-4">
              <Button
                type="submit"
                className="w-full  hover:bg-purple-900"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-purple-200 hover:text-white text-sm flex items-center justify-center">
            <ArrowRight className="mr-2 h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    
  )
}
