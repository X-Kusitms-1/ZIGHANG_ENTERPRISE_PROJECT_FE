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
        circle:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      },
      appearance: {
        fill: "bg-blue-500 text-white [&_img]:brightness-0 [&_img]:invert",
        outline: "border border-gray-200 text-gray-500",
        transparent: "bg-transparent text-gray-500",
        invers: "bg-gray-500 text-white [&_img]:brightness-0 [&_img]:invert",
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
        appearance: "outline",
        class: "[&_img]:invert",
      },
      {
        variant: "secondary",
        appearance: "outline",
        class: "[&_img]:opacity-50",
      },
      {
        variant: "secondary",
        appearance: "transparent",
        class: "",
      },
      {
        variant: "secondary",
        appearance: "invers",
        class: "",
      },
      {
        variant: "circle",
        appearance: "outline",
        class: "",
      },
      {
        variant: "circle",
        appearance: "transparent",
        class: "[&_img]:brightness-0 [&_img]:invert",
      },
      {
        variant: "circle",
        appearance: "invers",
        class: "[&_img]:brightness-0 [&_img]:invert",
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
