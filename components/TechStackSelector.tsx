"use client";

import { useState } from "react";
import { useTechStack } from "@/hooks/useApi";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { TechStack } from "@/types";
import { Button } from "./ui/button";

interface TechStackSelectorProps {
  selected: Array<string | { title: string; icon?: string }>;
  onChange: (
    techStack: Array<string | { title: string; icon?: string }>
  ) => void;
  className?: string;
}

export default function TechStackSelector({
  selected,
  onChange,
  className,
}: TechStackSelectorProps) {
  const { data: techStacks } = useTechStack();
  const [open, setOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const selectedTitles = selected.map((item) =>
    typeof item === "string" ? item : item.title
  );

  const handleSelect = (techStack: TechStack) => {
    const title = techStack.title;
    const isSelected = selectedTitles.includes(title);

    if (isSelected) {
      onChange(
        selected.filter((item) =>
          typeof item === "string" ? item !== title : item.title !== title
        )
      );
    } else {
      onChange([
        ...selected,
        {
          title: techStack.title,
          icon: techStack.icon || "",
        },
      ]);
    }
  };

  const handleRemove = (index: number) => {
    onChange(selected.filter((_, i) => i !== index));
  };

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= selected.length) return;
    const newItems = [...selected];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    onChange(newItems);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    handleMove(draggedIndex, targetIndex);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className={cn("space-y-3 font-outfit", className)}>
      <div className="flex items-center justify-between">
        <Label>Tech Stack</Label>
        {selected.length > 1 && (
          <span className="text-[11px] text-gray-500 dark:text-gray-400">
            💡 Geser (drag) atau gunakan tombol panah untuk mengatur urutan
          </span>
        )}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item, index) => {
            const isObject = typeof item === "object";
            const title = isObject ? item.title : item;
            const icon = isObject ? item.icon : null;
            const isBeingDragged = draggedIndex === index;

            return (
              <Badge
                key={index}
                variant="secondary"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group flex cursor-grab select-none items-center gap-1.5 px-2 py-1.5 font-outfit transition-all active:cursor-grabbing",
                  isBeingDragged &&
                    "ring-primary/30 scale-95 border-dashed border-primary opacity-40 ring-2",
                  "hover:border-primary/40 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <GripVertical className="h-3.5 w-3.5 shrink-0 text-gray-400 opacity-50 transition-opacity group-hover:opacity-100" />

                {/* Move Left Button */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMove(index, index - 1);
                    }}
                    title="Pindah ke Kiri"
                    className="rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                )}

                {icon ? (
                  <Image
                    src={icon}
                    alt={title}
                    width={16}
                    height={16}
                    className="h-4 w-4 shrink-0 object-contain"
                  />
                ) : (
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-gray-200 text-[9px] font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {typeof title === "string"
                      ? title.substring(0, 2).toUpperCase()
                      : ""}
                  </div>
                )}

                <span className="text-xs font-medium">{title}</span>

                {/* Move Right Button */}
                {index < selected.length - 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMove(index, index + 1);
                    }}
                    title="Pindah ke Kanan"
                    className="rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  title="Hapus"
                  className="ml-0.5 rounded-full p-0.5 text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-outfit"
          >
            <span className="truncate">
              {selected.length > 0
                ? `${selected.length} tech stack dipilih`
                : "Select from library..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[400px] p-0 font-outfit shadow-2xl"
          align="start"
          sideOffset={4}
        >
          <Command className="font-outfit">
            <CommandInput placeholder="Search tech stack..." />
            <CommandList className="max-h-[260px] overflow-y-auto">
              <CommandEmpty>No tech stack found.</CommandEmpty>
              <CommandGroup>
                {techStacks?.map((tech) => {
                  const isSelected = selectedTitles.includes(tech.title);
                  return (
                    <CommandItem
                      key={tech._id}
                      value={tech.title}
                      onSelect={() => {
                        handleSelect(tech);
                      }}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-2 px-3 py-2 transition-colors",
                        isSelected &&
                          "bg-[#77BEF0]/15 font-medium dark:bg-[#77BEF0]/20"
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        {tech.icon ? (
                          <Image
                            src={tech.icon}
                            alt={tech.title}
                            width={20}
                            height={20}
                            className="h-5 w-5 shrink-0 object-contain"
                          />
                        ) : (
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gray-200 text-[10px] font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {tech.title.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="truncate">{tech.title}</span>
                      </div>

                      <div
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                          isSelected
                            ? "border-[#77BEF0] bg-[#77BEF0] text-gray-950 dark:text-white"
                            : "border-gray-300 dark:border-gray-600"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>

            {/* Bottom bar with counter and Done button */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-3 py-2 dark:border-gray-800 dark:bg-gray-900/80">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {selected.length} tech stack dipilih
              </span>
              <Button
                type="button"
                size="sm"
                className="h-7 bg-[#77BEF0] px-3 text-xs font-semibold text-gray-950 hover:bg-[#64b0e6]"
                onClick={() => setOpen(false)}
              >
                Selesai
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>

      <p className="text-xs text-gray-500">
        Klik item untuk memilih sekaligus banyak, lalu klik &quot;Selesai&quot;
      </p>
    </div>
  );
}
