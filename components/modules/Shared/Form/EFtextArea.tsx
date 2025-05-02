"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface EFormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  description?: string;
  required?: boolean;
  className?: string;
}

const EFormTextarea = ({
  name,
  label,
  placeholder,
  control,
  description,
  required = true,
  className = "resize-none",
}: EFormTextareaProps) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={className}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EFormTextarea;
