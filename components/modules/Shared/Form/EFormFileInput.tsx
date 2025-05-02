"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
interface FileInputProps {
  name: string;
  label?: string;
  control: Control<any>;
  required?: boolean;
}

const EFormFileInput = ({
  name,
  label,
  control,
  required = false,
}: FileInputProps) => {
  return (
    <div className="relative">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                  type="file"
                  required={required}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EFormFileInput;
