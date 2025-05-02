"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { ReactNode } from "react";

interface EFormCheckboxProps {
  name: string;
  label?: string;
  description?: ReactNode;
  control: Control<any>;
  required?: boolean;
}

const EFormCheckbox = ({
  name,
  label,
  description,
  control,
  required = false,
}: EFormCheckboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default EFormCheckbox;
