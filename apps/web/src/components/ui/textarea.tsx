import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  required?: boolean;
  isInvalid?: boolean;
  rows?: number;
}

function Textarea({ className, id, isInvalid, rows = 4, ...props }: TextareaProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-2">
      <textarea
        id={inputId}
        data-slot="textarea"
        aria-invalid={isInvalid ? "true" : "false"}
        className={cn(
          "flex w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          isInvalid ? "border-destructive ring-destructive/20 focus-visible:ring-destructive/20" : "",
          className,
        )}
        rows={rows}
        {...props}
      />
    </div>
  );
}

export { Textarea };
export type { TextareaProps };
