"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { Control } from "react-hook-form";

interface EFormTimeInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  description?: string;
  required?: boolean;
}

const EFormTimeInput = ({
  name,
  label,
  placeholder,
  control,
  description,
  required = true,
}: EFormTimeInputProps) => {
  return (
    <div className="relative space-y-2">
      <FormField
        control={control}
        name={name}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <FormControl>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id={name}
                  type="time"
                  className="pl-10 rounded-md"
                  placeholder={placeholder}
                  {...field}
                />
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EFormTimeInput;
