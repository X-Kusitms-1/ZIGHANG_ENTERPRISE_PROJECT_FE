"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const filterButtonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer [&_img]:transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-bg-base border border-border-tertiary hover:bg-bg-info hover:border-border-secondary text-text-secondary hover:text-text-info data-[selected=true]:bg-bg-info-focused data-[selected=true]:border-border-secondary data-[selected=true]:text-text-info [&_img]:brightness-0 [&_img]:saturate-100 hover:[&_img]:brightness-0 hover:[&_img]:saturate-100 hover:[&_img]:hue-rotate-[210deg] data-[selected=true]:[&_img]:brightness-0 data-[selected=true]:[&_img]:saturate-100 data-[selected=true]:[&_img]:hue-rotate-[210deg]",
        neutral:
          "bg-bg-base border border-border-tertiary hover:bg-bg-base-hovered hover:border-border-inverse text-text-secondary data-[selected=true]:bg-bg-base-focused data-[selected=true]:border-border-inverse [&_img]:brightness-0 [&_img]:saturate-100 hover:[&_img]:brightness-0 hover:[&_img]:saturate-100 data-[selected=true]:[&_img]:brightness-0 data-[selected=true]:[&_img]:saturate-100",
        filled:
          "bg-bg-neutral hover:bg-bg-neutral-hovered !text-text-tertiary data-[selected=true]:bg-bg-info data-[selected=true]:border-border-secondary data-[selected=true]:!text-text-info [&_img]:brightness-0 [&_img]:saturate-100 [&_img]:opacity-70 hover:[&_img]:opacity-80 data-[selected=true]:[&_img]:brightness-0 data-[selected=true]:[&_img]:saturate-100 data-[selected=true]:[&_img]:hue-rotate-[210deg] data-[selected=true]:[&_img]:opacity-100",
        today:
          "bg-bg-neutral border border-border-tertiary hover:bg-bg-neutral-hovered hover:border-border-tertiary !text-text-secondary data-[selected=true]:bg-bg-info data-[selected=true]:border-border-primary [&_img]:brightness-0 [&_img]:saturate-100 [&_img]:opacity-70 hover:[&_img]:opacity-80 data-[selected=true]:[&_img]:brightness-0 data-[selected=true]:[&_img]:saturate-100 data-[selected=true]:[&_img]:hue-rotate-[210deg] data-[selected=true]:[&_img]:opacity-100",
      },
      size: {
        sm: "h-8 rounded-sm px-3 py-[6px] text-14-500",
        md: "h-9 rounded-md px-3 py-2 text-14-500",
        lg: "h-9 rounded-sm px-4 py-[6px] text-16-500",
        xl: "rounded-sm px-4 px-6 text-16-600",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function FilterButton({
  className,
  variant,
  size,
  asChild = false,
  selected = false,
  onToggle,
  ...props
}: Omit<React.ComponentProps<"button">, "onToggle"> &
  VariantProps<typeof filterButtonVariants> & {
    asChild?: boolean;
    selected?: boolean;
    // eslint-disable-next-line no-unused-vars
    onToggle?: (selected: boolean) => void;
  }) {
  const Comp = asChild ? Slot : "button";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onToggle?.(!selected);
    props.onClick?.(e);
  };

  return (
    <Comp
      data-slot="button"
      data-selected={selected}
      className={cn(filterButtonVariants({ variant, size, className }))}
      {...props}
      onClick={handleClick}
    >
      {props.children}
    </Comp>
  );
}

export { FilterButton, filterButtonVariants };
