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
import { toast } from "sonner";

interface IFormImageUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange"> {
  name: string;
  label?: string;
  control: any;
  multiple?: boolean;
  onImageUpload: (files: File[] | File) => void;
}

const EFormImageUpload = ({
  name,
  label,
  control,
  multiple = false,
  onImageUpload,
  ...rest
}: IFormImageUploadProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    setPreviewImages([]);
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (multiple && selectedFiles.length + files.length > 5) {
      toast.warning("You can only upload a maximum of 5 images.");
      return;
    }

    const newPreviewImages: string[] = [];
    const newFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newPreviewImages.push(URL.createObjectURL(file));
      newFiles.push(file);
    }

    setPreviewImages((prev) =>
      multiple ? [...prev, ...newPreviewImages] : newPreviewImages
    );
    setSelectedFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));

    onImageUpload(multiple ? [...selectedFiles, ...newFiles] : newFiles);
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
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
              multiple={multiple}
              onChange={handleImageChange}
              {...rest}
            />
          </FormControl>

          <div className="grid grid-cols-3 gap-3 mt-2">
            {previewImages.map((src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  alt={`Preview ${index}`}
                  width={250}
                  height={100}
                  className="rounded-md border"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0 p-1 bg-red-600 rounded-full shadow-md hover:scale-110 transition-transform"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EFormImageUpload;
