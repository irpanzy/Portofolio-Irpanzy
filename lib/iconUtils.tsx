import * as LucideIcons from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface DynamicIconProps {
  iconName: string | StaticImageData;
  className?: string;
  size?: number;
  fallbackUrl?: string;
}

export function DynamicIcon({
  iconName,
  className = "h-6 w-6",
  size = 24,
  fallbackUrl,
}: DynamicIconProps) {
  if (typeof iconName === "object" && "src" in iconName) {
    return (
      <div
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={iconName} alt="Icon" fill className="object-contain" />
      </div>
    );
  }

  const iconString = String(iconName);

  const IconComponent = (LucideIcons as any)[iconString];

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  if (iconString.startsWith("http://") || iconString.startsWith("https://")) {
    return (
      <div
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={iconString} alt="Icon" fill className="object-contain" />
      </div>
    );
  }

  if (/\p{Emoji}/u.test(iconString)) {
    return <span className="text-2xl">{iconString}</span>;
  }

  if (fallbackUrl) {
    return (
      <div
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={fallbackUrl} alt="Icon" fill className="object-contain" />
      </div>
    );
  }

  return <LucideIcons.HelpCircle className={className} />;
}

export function isLucideIcon(iconName: string): boolean {
  return !!(LucideIcons as any)[iconName];
}

export function isUrl(str: string): boolean {
  return str.startsWith("http://") || str.startsWith("https://");
}

export function isEmoji(str: string): boolean {
  return /\p{Emoji}/u.test(str);
}
