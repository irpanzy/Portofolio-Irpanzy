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
import { Check, ChevronsUpDown, X } from "lucide-react";
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

  const selectedTitles = selected.map((item) =>
    typeof item === "string" ? item : item.title
  );

  const handleSelect = (techStack: TechStack) => {
    console.log("📌 handleSelect called:", techStack.title);
    const title = techStack.title;
    const isSelected = selectedTitles.includes(title);

    if (isSelected) {
      console.log("❌ Removing:", title);
      onChange(
        selected.filter((item) =>
          typeof item === "string" ? item !== title : item.title !== title
        )
      );
    } else {
      console.log("✅ Adding:", title, "with icon:", techStack.icon);
      onChange([
        ...selected,
        {
          title: techStack.title,
          icon: techStack.icon || "",
        },
      ]);
    }

    setOpen(false);
  };

  const handleRemove = (index: number) => {
    onChange(selected.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-3 font-outfit", className)}>
      <Label>Tech Stack</Label>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item, index) => {
            const isObject = typeof item === "object";
            const title = isObject ? item.title : item;
            const icon = isObject ? item.icon : null;

            return (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1.5 font-outfit"
              >
                {icon && (
                  <Image
                    src={icon}
                    alt={title}
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                  />
                )}
                <span>{title}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="ml-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
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
            Select from library...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[400px] p-0 font-outfit"
          align="start"
          sideOffset={4}
        >
          <Command className="font-outfit">
            <CommandInput placeholder="Search tech stack..." />
            <CommandList>
              <CommandEmpty>No tech stack found.</CommandEmpty>
              <CommandGroup>
                {techStacks?.map((tech) => {
                  const isSelected = selectedTitles.includes(tech.title);
                  return (
                    <CommandItem
                      key={tech._id}
                      value={tech.title}
                      onSelect={() => {
                        console.log("🖱️ Tech selected:", tech.title);
                        handleSelect(tech);
                      }}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {tech.icon ? (
                        <Image
                          src={tech.icon}
                          alt={tech.title}
                          width={20}
                          height={20}
                          className="h-5 w-5 object-contain"
                        />
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-[10px] font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {tech.title.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span>{tech.title}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <p className="text-xs text-gray-500">Select tech stack from library</p>
    </div>
  );
}
