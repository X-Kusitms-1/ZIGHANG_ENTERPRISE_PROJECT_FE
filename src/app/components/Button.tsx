import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNameMerge";

// 기본 아이콘으로 사용자 제공 SVG 사용 – inline 컴포넌트로 변환 (fill="white" 기본, className으로 오버라이드)
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.23362 4.12327C9.52228 3.45035 10.4763 3.45054 10.7652 4.12327L12.3668 7.86269C12.451 8.05936 12.608 8.21617 12.8046 8.30052L16.544 9.90208C17.2173 10.1907 17.2173 11.145 16.544 11.4337L12.8046 13.0352C12.6079 13.1195 12.451 13.2764 12.3668 13.473L10.7652 17.2125L10.7042 17.3305C10.3834 17.8466 9.61541 17.8466 9.29466 17.3305L9.23362 17.2125L7.63206 13.473C7.55824 13.301 7.4288 13.1593 7.26585 13.0702L7.19423 13.0352L3.45481 11.4337C2.78208 11.1448 2.7819 10.1907 3.45481 9.90208L7.19423 8.30052C7.39106 8.21622 7.54776 8.05951 7.63206 7.86269L9.23362 4.12327ZM8.78115 8.35504C8.57041 8.84696 8.1785 9.23887 7.68658 9.4496L4.84153 10.6679L7.68658 11.8861C8.17835 12.0968 8.57036 12.489 8.78115 12.9807L9.99941 15.8249L11.2177 12.9807L11.3047 12.8017C11.5276 12.3941 11.8817 12.0706 12.3122 11.8861L15.1565 10.6679L12.3122 9.4496C11.8205 9.23882 11.4283 8.84681 11.2177 8.35504L9.99941 5.50999L8.78115 8.35504Z" fill="currentColor"/>
  </svg>
);

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        "primary-filled": "bg-[var(--color-bg-interactive-primary)] text-[var(--color-text-interactive-inverse)] hover:bg-[var(--color-text-interactive-primary-hovered)]",
        "primary-neutral": "bg-[var(--color-bg-tertiary-light)] text-[var(--color-text-info)] hover:text-[var(--color-text-interactive-primary-hovered)] hover:bg-[var(--color-bg-interactive-base-hovered-darker)]",
        "primary-transparent": "bg-transparent text-[var(--color-text-interactive-primary)] hover:text-[var(--color-text-interactive-primary-hovered)] hover:bg-[var(--color-bg-transparent-dark)]",
        "primary-inversed": "bg-[var(--color-text-interactive-inverse)] text-[var(--color-text-interactive-primary)] hover:text-[var(--color-text-interactive-primary-hovered)] hover:bg-[var(--color-bg-interactive-base-hovered)]",
        "secondary-filled": "bg-[var(--color-text-interactive-secondary)] text-[var(--color-text-interactive-inverse)]",
        "secondary-inversed": "bg-[var(--color-text-interactive-inverse)] text-[var(--color-text-primary)]",
        "secondary-neutral": "bg-transparent text-[var(--color-text-primary)]",
        "secondary-outlined": "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-secondary-filled)]",
        "secondary-transparent": "bg-transparent text-[var(--color-text-interactive-secondary)]",
        "secondary-translucent": "bg-[var(--color-translucent-bg)] text-[var(--color-text-interactive-secondary)]",
        "disabled": "bg-[var(--color-bg-disabled)] text-[var(--color-text-transparent-dark)] cursor-not-allowed",
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
      variant: "primary-filled",
      size: "md",
      shape: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      "primary-filled": "text-[var(--color-icon-interactive-inverse)]",
      "primary-neutral": "text-[var(--color-icon-info)]",
      "primary-transparent": "text-[var(--color-icon-interactive-primary)]",
      "primary-inversed": "text-[var(--color-icon-interactive-primary)]",
      "secondary-filled": "text-[var(--color-icon-interactive-inverse-subtle)]",
      "secondary-inversed": "text-[var(--color-icon-tertiary)]",
      "secondary-neutral": "text-[var(--color-icon-tertiary)]",
      "secondary-outlined": "text-[var(--color-icon-tertiary)]",
      "secondary-transparent": "text-[var(--color-icon-transparent-darker)]",
      "secondary-translucent": "text-[var(--color-icon-transparent-darker)]",
      "disabled": "text-[var(--color-icon-transparent-dark)]",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconSize?: string;
  loading?: boolean;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, leftIcon, rightIcon, iconSize = "20px", children, disabled, loading = false, ...props }, ref) => {
    const iconVariant = disabled || loading ? "disabled" : variant;
    const iconClass = cn(
      iconVariants({ variant: iconVariant }),
      `[&>svg]:w-[${iconSize}] [&>svg]:h-[${iconSize}]`
    );

    // leftIcon/rightIcon이 true면 기본 StarIcon을 렌더링
    const renderIcon = (icon: React.ReactNode) => {
      if (icon === true) {
        return <StarIcon className={iconClass} />;
      }
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon, { className: iconClass }as any);
      }
      return icon;
    };

    return (
      <button
        className={cn(buttonVariants({ variant: disabled || loading ? "disabled" : variant, size, shape }), className)}
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

export { buttonVariants, StarIcon };