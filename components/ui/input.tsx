import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1.5 font-outfit text-sm text-foreground outline-none transition-colors",
        "file:-my-1 file:-ml-1.5 file:mr-3 file:inline-flex file:h-7 file:cursor-pointer file:items-center file:rounded-md file:border-0 file:bg-gray-200 file:px-3 file:text-xs file:font-medium file:text-gray-800 file:transition-colors hover:file:bg-gray-300 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600",
        "placeholder:font-normal placeholder:text-gray-400 placeholder:opacity-50 dark:placeholder:text-gray-500",
        "focus-visible:ring-ring/40 focus-visible:border-ring focus-visible:ring-2",
        "disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
