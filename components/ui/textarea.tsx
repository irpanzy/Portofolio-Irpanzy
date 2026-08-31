import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content focus-visible:ring-ring/40 disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80 flex min-h-16 w-full rounded-lg border border-input bg-transparent px-3 py-2 font-outfit text-sm text-foreground outline-none transition-colors placeholder:font-normal placeholder:text-gray-400 placeholder:opacity-50 focus-visible:border-ring focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-gray-500",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
