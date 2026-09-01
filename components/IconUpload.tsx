"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

interface IconUploadProps {
  value: string;
  onUploadSuccess: (url: string) => void;
  category?:
    | "PROJECTS"
    | "EXPERIENCES"
    | "SERVICES"
    | "TECHSTACKS"
    | "ABOUT"
    | "GENERAL";
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function IconUpload({
  value,
  onUploadSuccess,
  category = "ABOUT",
  placeholder = "🎓 or URL",
  onChange,
}: IconUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 1) {
      toast.error("Icon size must be less than 1MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      const response = await axiosInstance.post("/upload/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url } = response.data.data;

      onUploadSuccess(url);

      toast.success("Icon uploaded successfully!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to upload icon";
      toast.error(message);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
        disabled={isUploading}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleUploadClick}
        disabled={isUploading}
        title="Upload icon image"
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
