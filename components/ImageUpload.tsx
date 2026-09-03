"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import PdfThumbnail from "@/components/PdfThumbnail";
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
    | "DOCUMENTS"
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
  maxSize = 10,
  showPreview = true,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);

  useEffect(() => {
    setPreviewUrl(value);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    const isPdfFile =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    const isImageFile = file.type.startsWith("image/");

    if (accept === "image/*" && !isImageFile) {
      toast.error("Please upload an image file");
      return;
    }

    if (accept.includes("pdf") && !isImageFile && !isPdfFile) {
      toast.error("Please upload an image or PDF document");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("folder", category);

      const response = await axiosInstance.post("/upload/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url, fileId: uploadedFileId } = response.data.data;

      setPreviewUrl(url);
      onUploadSuccess(url, uploadedFileId);

      toast.success(
        isPdfFile
          ? "PDF document uploaded successfully!"
          : "Image uploaded successfully!"
      );
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to upload file";
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

  const isPdfPreview = previewUrl?.toLowerCase().includes(".pdf");

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {showPreview && previewUrl && (
        <div className="relative overflow-hidden rounded-lg border bg-gray-50 dark:border-gray-800 dark:bg-gray-800/40">
          {isPdfPreview ? (
            <div className="relative h-44 w-44 overflow-hidden rounded-lg">
              <PdfThumbnail
                url={previewUrl}
                title={label}
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="relative h-40 w-40">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          )}

          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-1 top-1 h-6 w-6"
            onClick={handleRemove}
            disabled={isUploading}
            title="Remove file"
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
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading...</span>
          </div>
        )}
      </div>

      {value && !showPreview && (
        <p className="truncate text-xs text-gray-500">{value}</p>
      )}

      <p className="text-xs text-gray-500">
        Max size: {maxSize}MB.{" "}
        {accept.includes("pdf")
          ? "Supports Images (PNG, JPG, WebP) & PDF Documents."
          : accept === "image/*"
            ? "Images only (PNG, JPG, WebP, SVG)."
            : ""}
      </p>
    </div>
  );
}
