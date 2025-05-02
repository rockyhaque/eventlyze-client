import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
  contactNumber: z
    .string({ required_error: "Contact number is required" })
    .min(10, "Contact number must be at least 10 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, "Password must be at least 5 characters"),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be one of 'MALE', 'FEMALE",
  }),
  photo: z.any().optional(),
});
