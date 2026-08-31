"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import * as LucideIcons from "lucide-react";

const POPULAR_ICONS = [
  "Code",
  "Database",
  "Server",
  "Globe",
  "Smartphone",
  "Palette",
  "Zap",
  "Box",
  "Layers",
  "Layout",
  "Monitor",
  "Cpu",
  "Cloud",
  "Lock",
  "Shield",
  "Rocket",
  "Star",
  "Heart",
  "Award",
  "Briefcase",
  "GraduationCap",
  "MapPin",
  "Mail",
  "Phone",
  "Calendar",
  "Clock",
  "Settings",
  "Tool",
  "Wrench",
  "Package",
  "FileCode",
  "Terminal",
  "GitBranch",
  "Users",
  "User",
  "Target",
  "TrendingUp",
  "BarChart",
  "PieChart",
];

interface IconSelectorProps {
  label: string;
  value: string;
  onChange: (iconName: string) => void;
  disabled?: boolean;
}

export default function IconSelector({
  label,
  value,
  onChange,
  disabled = false,
}: IconSelectorProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIcons = POPULAR_ICONS.filter((iconName) =>
    iconName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.HelpCircle;
  };

  const handleSelectIcon = (iconName: string) => {
    onChange(iconName);
    setDialogOpen(false);
    setSearchQuery("");
  };

  const CurrentIcon = value ? getIconComponent(value) : LucideIcons.ImageIcon;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex h-20 w-20 items-center justify-center"
          onClick={() => setDialogOpen(true)}
          disabled={disabled}
        >
          <CurrentIcon className="h-10 w-10" />
        </Button>

        <div className="flex flex-1 flex-col justify-center">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Icon name (e.g., Code, Database)"
            disabled={disabled}
          />
          <p className="mt-1 text-xs text-gray-500">
            Click icon preview to browse
          </p>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-hidden bg-white font-outfit sm:max-w-[600px] dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Select Icon</DialogTitle>
            <DialogDescription>
              Choose an icon from Lucide icon library
            </DialogDescription>
          </DialogHeader>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            <div className="grid grid-cols-6 gap-2 p-2">
              {filteredIcons.map((iconName) => {
                const IconComponent = getIconComponent(iconName);
                const isSelected = value === iconName;

                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleSelectIcon(iconName)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg border-2 p-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isSelected
                        ? "bg-primary/10 border-primary"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                    title={iconName}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="truncate text-[10px] text-gray-600 dark:text-gray-400">
                      {iconName}
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredIcons.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                <LucideIcons.Search className="mx-auto mb-2 h-8 w-8" />
                <p>No icons found</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
