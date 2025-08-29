import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap shrink-0 [&>svg]:size-4 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,background-color,box-shadow] duration-200 ease-in-out overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-bg-info !text-text-info hover:bg-bg-info-hovered h-8 text-14-500 rounded-md px-3 py-[6px]",
        rounded:
          "border-transparent bg-bg-info !text-text-info hover:bg-bg-info-hovered h-5 text-12-500 rounded-lg px-2 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Chip({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="chip"
      className={cn(chipVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Chip, chipVariants };
