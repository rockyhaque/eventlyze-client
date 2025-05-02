"use server";

import { FieldValues } from "react-hook-form";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

export const createEvent = async (eventData: FieldValues) => {
  const res = await fetch(`${baseUrl}/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  const result = await res.json();

  return result;
};
