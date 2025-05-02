"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface EFormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  control: Control<any>;
  options: Option[];
  required?: boolean;
}

const EFormSelect = ({
  name,
  label,
  placeholder = "Select an option",
  control,
  options,
  required = true,
}: EFormSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            value={field.value}
            // defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="rounded-md">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EFormSelect;
