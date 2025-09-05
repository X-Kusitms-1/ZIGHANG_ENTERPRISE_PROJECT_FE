"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  bgColor?: "primary" | "default";
};

function Checkbox({ className, bgColor = "default", ...props }: CheckboxProps) {
  const checkedBg =
    bgColor === "primary"
      ? "data-[state=checked]:bg-bg-primary"
      : "data-[state=checked]:bg-bg-primary data-[state=checked]:border-bg-primary";
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        `peer border-border-inverse dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-[16px] w-[16px] shrink-0 rounded-[4px] border transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 ${checkedBg}`,
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center transition-none"
      >
        <CheckIcon className="size-3.5 text-icon-inverese" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
export { Checkbox };
