import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 font-medium whitespace-nowrap transition-colors focus:outline-none disabled:pointer-events-none font-[500] rounded-lg",
  {
    variants: {
      variant: {
        filled:
          "bg-bg-primary text-text-inverse hover:bg-bg-primary-hovered focus:bg-bg-primary-focused",
        neutral:
          "bg-bg-neutral text-text-secondary hover:bg-bg-neutral-hovered focus:bg-bg-neutral-focused",
        outlined:
          "bg-bg-base text-text-secondary border border-border-inverse hover:bg-bg-base-hovered focus:bg-neutral-100",
        inversed:
          "bg-bg-base text-text-secondary hover:bg-bg-base-hovered focus:bg-bg-base-focused",
        disabled: "bg-bg-disabled text-text-disabled cursor-not-allowed",
      },
      size: {
        sm: "h-9 px-3 py-2 leading-5 text-[14px]",
        md: "h-11 px-3 py-3 leading-5 text-[14px]",
        lg: "h-12 px-4 py-3 leading-6 text-[16px]",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      filled: "text-icon-inverse",
      neutral: "text-icon-secondary",
      outlined: "text-icon-secondary",
      inversed: "text-icon-secondary",
      disabled: "text-icon-disabled",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode | boolean;
  rightIcon?: React.ReactNode | boolean;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const effectiveVariant = disabled ? "disabled" : variant;
    const iconClass = cn(
      iconVariants({ variant: effectiveVariant }),
      "flex-shrink-0"
    );

    const renderIcon = (icon: React.ReactNode | boolean) => {
      if (icon === true) {
        return <Icon className={iconClass} />;
      }
      if (React.isValidElement(icon)) {
        return React.cloneElement(
          icon as React.ReactElement,
          { className: iconClass } as any
        );
      }
      return icon;
    };

    return (
      <button
        className={cn(
          buttonVariants({ variant: effectiveVariant, size }),
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled ? "true" : undefined}
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
