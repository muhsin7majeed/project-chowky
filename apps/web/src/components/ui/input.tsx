import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  required?: boolean;
  isInvalid?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

function Input({ className, type, id, isInvalid, prefixIcon, suffixIcon, ...props }: InputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-2 relative">
      {prefixIcon && <div className="absolute left-2 top-1/2 -translate-y-1/2 scale-75">{prefixIcon}</div>}

      <input
        id={inputId}
        type={type}
        data-slot="input"
        aria-invalid={isInvalid ? "true" : "false"}
        className={cn(
          "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 ",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          isInvalid ? "border-destructive ring-destructive/20 focus-visible:ring-destructive/20" : "",
          prefixIcon ? "pl-8" : "",
          suffixIcon ? "pr-8" : "",
          className,
        )}
        {...props}
      />
      {suffixIcon && <div className="absolute right-2 top-1/2 -translate-y-1/2 scale-75">{suffixIcon}</div>}
    </div>
  );
}

export { Input };
export type { InputProps };
