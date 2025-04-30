import { z } from "zod"

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to terms" }),
  }),
})

export type FormData = z.infer<typeof formSchema>




export const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    const strengthText = ["Weak", "Fair", "Good", "Strong"]
    const strengthColor = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"]

    return {
      strength,
      text: strengthText[strength - 1] || "",
      color: strengthColor[strength - 1] || "",
    }
  }

 