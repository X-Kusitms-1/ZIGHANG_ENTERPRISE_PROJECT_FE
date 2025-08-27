import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        outlined:
          "bg-bg-base hover:bg-bg-base-hovered active:bg-bg-base-focused border border-border-inverse",
        inversed:
          "bg-bg-base hover:bg-bg-base-hovered active:bg-bg-base-focused",
        rounded:
          "!rounded-full bg-bg-transparent-mostdarkest hover:bg-bg-transparent-darkest active:bg-bg-transparent-mostdarkest [&_img]:brightness-0 [&_img]:invert",
      },
      size: {
        sm: "w-6 h-6 rounded-sm p-1 [&_img]:w-4 [&_img]:h-4 [&_img]:p-[1px]",
        md: "w-10 h-10 rounded-md p-2 [&_img]:w-6 [&_img]:h-6 [&_img]:p-[1px]",
        lg: "w-12 h-12 rounded-lg p-3 [&_img]:w-6 [&_img]:h-6",
      },
    },
    defaultVariants: {
      variant: "outlined",
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
