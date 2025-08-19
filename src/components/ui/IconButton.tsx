import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNameMerge";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer active:ring-2 active:ring-bg-interactive-primary active:ring-offset-2",
  {
    variants: {
      variant: {
        primaryFill:
          "bg-bg-interactive-primary hover:bg-bg-interactive-primary-hovered active:bg-bg-interactive-primary text-white border border-transparent [&_img]:brightness-0 [&_img]:invert",
        primaryOutline:
          "bg-bg-interactive-base hover:bg-bg-interactive-base-hovered active:bg-bg-interactive-base border-1 border-blue-500  active:ring-bg-interactive-primary-hovered",
        primaryTransparent:
          "bg-transparent hover:bg-bg-transparent-dark active:bg-transparent",
        primaryInvers:
          "bg-transparent hover:bg-bg-interactive-base-hovered active:bg-transparent",
        secondaryFill:
          "bg-bg-interactive-secondary hover:bg-bg-interactive-secondary-hovered active:bg-bg-interactive-secondary [&_img]:brightness-0 [&_img]:invert",
        secondaryOutline:
          "bg-bg-interactive-base hover:bg-bg-interactive-base-hovered active:bg-bg-interactive-base border-1 border-border-primary",
        secondaryTransparent:
          "bg-transparent hover:bg-bg-transparent-dark active:bg-transparent",
        secondaryInvers:
          "bg-transparent hover:bg-bg-interactive-base-hovered active:bg-transparent",
        circleOutline:
          "!rounded-full bg-bg-interactive-base hover:bg-bg-interactive-base-hovered active:bg-bg-interactive-base border-1 border-border-secondary",
        circleTransparent:
          "!rounded-full bg-bg-transparent-dark hover:bg-bg-transparent-semi-darker active:bg-bg-transparent-dark",
        circleInvers:
          "!rounded-full bg-bg-transparent-light hover:bg-bg-transparent-lighter active:bg-bg-transparent-light",
      },
      size: {
        sm: "w-6 h-6 rounded-sm p-1 [&_img]:w-4 [&_img]:h-4 [&_img]:p-[1px]",
        md: "w-10 h-10 rounded-md p-2 [&_img]:w-6 [&_img]:h-6 [&_img]:p-[1px]",
        lg: "w-12 h-12 rounded-lg p-3 [&_img]:w-6 [&_img]:h-6",
      },
    },
    defaultVariants: {
      variant: "primaryFill",
      size: "md",
    },
  }
);

function IconButton({
  className,
  variant,
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
      className={cn(buttonVariants({ variant, size, className }))}
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
