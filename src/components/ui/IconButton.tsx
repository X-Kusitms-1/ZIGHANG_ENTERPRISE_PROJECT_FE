import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNameMerge";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer mb-[48px]",
  {
    variants: {
      // 추후 스타일 교체
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        circle: "shadow-xs !rounded-full",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      },
      appearance: {
        fill: "active:ring-2 active:ring-bg-interactive-primary active:ring-offset-2",
        outline:
          "active:ring-2 active:ring-bg-interactive-primary active:ring-offset-2",
        transparent:
          "active:ring-2 active:ring-bg-interactive-primary active:ring-offset-2",
        invers:
          "active:ring-2 active:ring-bg-interactive-primary active:ring-offset-2",
      },
      size: {
        sm: "w-6 h-6 rounded-sm p-1 [&_img]:w-4 [&_img]:h-4",
        md: "w-10 h-10 rounded-md p-2 [&_img]:w-6 [&_img]:h-6",
        lg: "w-12 h-12 rounded-lg p-3 [&_img]:w-8 [&_img]:h-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      appearance: "fill",
      size: "md",
    },
    compoundVariants: [
      {
        variant: "primary",
        appearance: "fill",
        class:
          "bg-bg-interactive-primary hover:bg-bg-interactive-primary-hovered active:bg-bg-interactive-primary text-white border border-transparent [&_img]:brightness-0 [&_img]:invert",
      },
      {
        variant: "primary",
        appearance: "outline",
        class:
          "bg-bg-interactive-base hover:bg-bg-interactive-base-hovered active:bg-bg-interactive-base border-1 border-blue-500 [&_img]:brightness-0 [&_img]:invert",
      },
      {
        variant: "primary",
        appearance: "transparent",
        class:
          "bg-transparent hover:bg-bg-transparent-dark active:bg-transparent",
      },
      {
        variant: "primary",
        appearance: "invers",
        class:
          "bg-transparent hover:bg-bg-interactive-base-hovered active:bg-transparent",
      },
      {
        variant: "secondary",
        appearance: "fill",
        class:
          "bg-bg-interactive-secondary hover:bg-bg-interactive-secondary-hovered active:bg-bg-interactive-secondary [&_img]:brightness-0 [&_img]:invert",
      },
      {
        variant: "secondary",
        appearance: "outline",
        class:
          "bg-bg-interactive-base hover:bg-bg-interactive-base-hovered active:bg-bg-interactive-base border-1 border-border-primary",
      },
      {
        variant: "secondary",
        appearance: "transparent",
        class:
          "bg-transparent hover:bg-bg-transparent-dark active:bg-transparent",
      },
      {
        variant: "secondary",
        appearance: "invers",
        class:
          "bg-transparent hover:bg-bg-interactive-base-hovered active:bg-transparent",
      },
      {
        variant: "circle",
        appearance: "outline",
        class:
          "bg-bg-interactive-base hover:bg-bg-interactive-base-hovered active:bg-bg-interactive-base border-1 border-border-secondary",
      },
      {
        variant: "circle",
        appearance: "transparent",
        class:
          "bg-bg-transparent-dark hover:bg-bg-transparent-semi-darker active:bg-bg-transparent-dark ",
      },
      {
        variant: "circle",
        appearance: "invers",
        class:
          "bg-bg-transparent-light hover:bg-bg-transparent-lighter active:bg-bg-transparent-light ",
      },
    ],
  }
);

function IconButton({
  className,
  variant,
  appearance,
  size,
  iconSrc,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    iconSrc: string;
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, appearance, size, className }))}
      {...props}
    >
      {iconSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSrc} alt="icon" className="object-contain" />
      )}
    </Comp>
  );
}

export { IconButton, buttonVariants };
