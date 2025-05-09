"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";

interface IFormImageUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange" | "multiple"> {
  name: string;
  label?: string;
  control: any;
  onImageUpload: (file: File) => void;
  uploadImage?: string;
}

const EFormImageUpload = ({
  name,
  label,
  control,
  onImageUpload,
  uploadImage,
  ...rest
}: IFormImageUploadProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
    onImageUpload(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              {...rest}
            />
          </FormControl>

          {(previewImage || uploadImage) ? (
            <div className="relative mt-2 w-fit">
              <Image
                src={previewImage || uploadImage || "/placeholder.svg"}
                alt="Preview"
                width={250}
                height={100}
                className="rounded-md border h-[200px]"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute  rounded-md top-1 right-1 p-1 bg-red-600 shadow-md transition-transform"
                onClick={handleRemoveImage}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ) : null
          
          // <Image
          //   src="/placeholder.svg"
          //   alt="Preview"
          //   width={250}
          //   height={100}
          //   className="rounded-md border animate-pulse h-[200px]"
          // />
          }

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EFormImageUpload;
