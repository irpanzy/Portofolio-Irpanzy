"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  label: string;
  value: string;
  fileId?: string;
  onUploadSuccess: (url: string, fileId: string) => void;
  category?:
    | "PROJECTS"
    | "EXPERIENCES"
    | "SERVICES"
    | "TECHSTACKS"
    | "ABOUT"
    | "EDUCATIONS"
    | "GENERAL";
  accept?: string;
  maxSize?: number;
  showPreview?: boolean;
}

export default function ImageUpload({
  label,
  value,
  onUploadSuccess,
  category = "GENERAL",
  accept = "image/*",
  maxSize = 5,
  showPreview = true,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    if (accept === "image/*" && !file.type.startsWith("image/")) {
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

      const { url, fileId: uploadedFileId } = response.data.data;

      setPreviewUrl(url);

      onUploadSuccess(url, uploadedFileId);

      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to upload image";
      toast.error(message);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = () => {
    setPreviewUrl("");
    onUploadSuccess("", "");
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {showPreview && previewUrl && (
        <div className="relative h-40 w-40 overflow-hidden rounded-lg border">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
            sizes="160px"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-1 top-1 h-6 w-6"
            onClick={handleRemove}
            disabled={isUploading}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
            className="cursor-pointer"
            id={`upload-${label.replace(/\s+/g, "-")}`}
          />
        </div>

        {isUploading && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading...</span>
          </div>
        )}
      </div>

      {value && !showPreview && (
        <p className="truncate text-xs text-gray-500">{value}</p>
      )}

      <p className="text-xs text-gray-500">
        Max size: {maxSize}MB. {accept === "image/*" ? "Images only" : ""}
      </p>
    </div>
  );
}
