import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNameMerge";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer mb-[48px]",
  {
    variants: {
      // 추후 스타일 교체
      type: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        circle:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      },
      appearance: {
        fill: "bg-blue-500 text-white",
        outline: "border border-gray-200 text-gray-500",
        transparent: "bg-transparent text-gray-500",
        invers: "bg-gray-500 text-white",
      },
      size: {
        sm: "w-6 h-6 rounded-sm p-1",
        md: "w-10 h-10 rounded-md p-2",
        lg: "w-10 h-10 rounded-lg p-3",
      },
    },
    defaultVariants: {
      type: "primary",
      appearance: "fill",
      size: "md",
    },
  }
);

function IconButton({
  className,
  type,
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
      className={cn(buttonVariants({ type, appearance, size, className }))}
      {...props}
    >
      {iconSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSrc} alt="icon" className="w-4 h-4 object-contain" />
      )}
    </Comp>
  );
}

export { IconButton, buttonVariants };
