"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";

interface PdfThumbnailProps {
  url: string;
  title?: string;
  className?: string;
  showBadge?: boolean;
}

export function getPdfThumbnailUrl(url?: string): string {
  if (!url) return "";
  const cleanUrl = url.split("?")[0].split("#")[0];

  if (cleanUrl.includes("ik.imagekit.io") || cleanUrl.includes("imagekit.io")) {
    return `${cleanUrl}/ik-thumbnail.jpg?tr=w-500,h-400,fo-auto`;
  }

  return cleanUrl;
}

export default function PdfThumbnail({
  url,
  title = "PDF Document",
  className = "",
  showBadge = true,
}: PdfThumbnailProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const cleanUrl = url ? url.split("?")[0].split("#")[0] : "";
  const isImageKit = cleanUrl.includes("imagekit.io");
  const thumbnailUrl = getPdfThumbnailUrl(url);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
    >
      {isImageKit && !hasImageError ? (
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <object
          data={`${cleanUrl}#page=1&view=FitH&toolbar=0&navpanes=0`}
          type="application/pdf"
          className="pointer-events-none h-full w-full overflow-hidden border-0 object-cover"
          title={title}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-rose-50/70 p-3 text-center dark:bg-rose-950/30">
            <FileText className="h-7 w-7 text-rose-500" />
            <span className="text-[10px] font-bold text-rose-600">
              PDF Document
            </span>
          </div>
        </object>
      )}

      {showBadge && (
        <div
          className="absolute right-1.5 top-1.5 z-10 flex items-center gap-1 rounded-full border border-white/20 bg-gray-950/75 px-1.5 py-0.5 shadow-sm backdrop-blur-md"
          title="PDF Document"
        >
          <FileText className="h-2.5 w-2.5 text-rose-400" />
          <span className="font-mono text-[9px] font-bold leading-none text-rose-300">
            PDF
          </span>
        </div>
      )}
    </div>
  );
}
