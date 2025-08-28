import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 font-medium whitespace-nowrap transition-colors focus:outline-none disabled:pointer-events-none font-[500]",
  {
    variants: {
      variant: {
        primaryFilled: "bg-bg-primary text-text-inverse hover:bg-bg-primary-hovered focus:bg-bg-primary-focused",
        primaryNeutral: "bg-bg-neutral text-text-secondary hover:bg-bg-neutral-hovered focus:bg-bg-neutral-focused",
        primaryOutlined: "bg-bg-base text-text-secondary border border-border-inverse hover:bg-bg-base-hovered focus:bg-neutral-100",
        primaryInversed: "bg-bg-base text-text-secondary hover:bg-bg-base-hovered focus:bg-bg-base-focused",
        disabled: "bg-bg-disabled text-text-disabled cursor-not-allowed",
      },
      size: {
        sm: "h-12 px-3 py-2 leading-5",
        md: "h-11 px-3 py-3 leading-5",
        lg: "h-12 px-4 py-3 leading-6",
      },
      shape: {
        default: "rounded-lg",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primaryFilled",
      size: "md",
      shape: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      primaryFilled: "text-icon-inverse",
      primaryNeutral: "text-icon-secondary",
      primaryOutlined: "text-icon-secondary",
      primaryInversed: "text-icon-secondary",
      disabled: "text-icon-disabled",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode | boolean;
  rightIcon?: React.ReactNode | boolean;
  iconSize?: string;
  loading?: boolean;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, leftIcon, rightIcon, iconSize = "16px", children, disabled, loading = false, ...props }, ref) => {
    const effectiveVariant = disabled || loading ? "disabled" : variant;
    const iconClass = cn(
      iconVariants({ variant: effectiveVariant }),
      `flex-shrink-0 min-w-[${iconSize}] min-h-[${iconSize}] [&>svg]:w-[${iconSize}] [&>svg]:h-[${iconSize}]`  // flex-shrink-0 + min-w/h for 크기 고정, shrink 방지
    );

    const renderIcon = (icon: React.ReactNode | boolean) => {
      if (icon === true) {
        return <Icon className={iconClass} />;
      }
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement, { className: iconClass }as any);
      }
      return icon;
    };

    return (
      <button
        className={cn(buttonVariants({ variant: effectiveVariant, size, shape }), className)}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading ? "true" : undefined}
        aria-busy={loading ? "true" : undefined}
        {...props}
      >
        {leftIcon && renderIcon(leftIcon)}
        {children}
        {rightIcon && renderIcon(rightIcon)}
      </button>
    );
  }
);

ButtonComponent.displayName = "Button";

export const Button = ButtonComponent;

export { buttonVariants };