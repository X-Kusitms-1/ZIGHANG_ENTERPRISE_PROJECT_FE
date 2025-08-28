import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNameMerge";
import Icon from "./Icon"; // 기본 아이콘 컴포넌트

// 기본 아이콘으로 사용자 제공 SVG 사용 – inline 컴포넌트로 변환 (fill="currentColor"로 변경, className으로 색상/크기 오버라이드)


const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus-ring)] focus:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primaryFilled: "bg-bg-interactive-primary text-text-interactive-inverse hover:bg-text-interactive-primary-hovered",
        primaryNeutral: "bg-bg-tertiary-light text-text-info hover:text-text-interactive-primary-hovered hover:bg-bg-interactive-base-hovered-darker focus:border focus:border-border-brand focus:bg-bg-info-subtle",
        primaryTransparent: "bg-transparent text-text-interactive-primary hover:text-text-interactive-primary-hovered hover:bg-bg-transparent-dark",
        primaryInversed: "bg-bg-interactive-base text-text-interactive-primary hover:text-text-interactive-primary-hovered hover:bg-bg-interactive-base-hovered",
        secondaryFilled: "bg-bg-interactive-secondary text-text-interactive-inverse hover:text-text-interactive-inverse hover:bg-bg-interactive-secondary-hovered",
        secondaryInversed: "bg-text-interactive-base text-text-primary hover:bg-bg-interactive-base-hovered focus:bg-bg-interactive-base",
        secondaryNeutral: "bg-bg-tertiary-light text-text-primary hover:bg-bg-interactive-base-hovered-darker focus:border focus:border-[#000] focus:bg-bg-interactive-base",
        secondaryOutlined: "bg-transparent text-text-primary border border-border-tertiary hover:bg-bg-interactive-base-hovered",
        secondaryTransparent: "bg-transparent text-text-interactive-secondary hover:bg-bg-transparent-dark hover:text-text-interactive-secondary-hovered",
        secondaryTranslucent: "bg-bg-transparent-dark text-text-interactive-secondary hover:bg-bg-transparent-semi-darker hover:text-text-interactive-secondary-hovered",
        disabled: "bg-bg-disabled text-text-transparent-dark cursor-not-allowed",
      },
      size: {
        sm: "h-11 px-3 py-3 leading-5 body-sm-semibold",
        md: "h-9 px-4 py-2 leading-4 caption-md semibold",
        lg: "h-12 px-4 py-3 leading-6 body-lg-semibold",
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
      primaryFilled: "text-icon-interactive-inverse",
      primaryNeutral: "text-icon-info",
      primaryTransparent: "text-icon-interactive-primary",
      primaryInversed: "text-icon-interactive-primary",
      secondaryFilled: "text-icon-interactive-inverse-subtle",
      secondaryInversed: "text-icon-tertiary",
      secondaryNeutral: "text-icon-tertiary",
      secondaryOutlined: "text-icon-tertiary",
      secondaryTransparent: "text-icon-transparent-darker",
      secondaryTranslucent: "text-icon-transparent-darker",
      disabled: "text-icon-transparent-dark",
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
  ({ className, variant, size, shape, leftIcon, rightIcon, iconSize = "20px", children, disabled, loading = false, ...props }, ref) => {
    const effectiveVariant = disabled || loading ? "disabled" : variant;
    const iconClass = cn(
      iconVariants({ variant: effectiveVariant }),
      `flex-shrink-0 min-w-[${iconSize}] min-h-[${iconSize}] [&>svg]:w-[${iconSize}] [&>svg]:h-[${iconSize}]`  // flex-shrink-0 + min-w/h for 크기 고정, shrink 방지
    );

    // leftIcon/rightIcon이 true면 기본 Icon을 렌더링
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