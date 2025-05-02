import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  eventBanner: z.string().min(1, "Event banner is required"),

  registrationStart: z
    .string()
    .datetime({ message: "Invalid registrationStart datetime" }),
  registrationEnd: z
    .string()
    .datetime({ message: "Invalid registrationEnd datetime" }),
  eventStartTime: z
    .string()
    .datetime({ message: "Invalid eventStartTime datetime" }),
  eventEndTime: z
    .string()
    .datetime({ message: "Invalid eventEndTime datetime" }),

  seat: z.number().int().positive(),
  isPaid: z.boolean(),
  price: z.number().nonnegative(),

  isPublic: z.boolean(),
  eventType: z.enum(["OFFLINE", "ONLINE"]),
  location: z.string().min(1, "Location is required"),

  paymentId: z.string().nullable(),
  reviewId: z.string().nullable(),
});
