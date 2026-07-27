import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] border text-sm font-medium transition-[background-color,border-color,box-shadow,opacity,transform] duration-[var(--duration-fast)] ease-[var(--ease-emphasized)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)] disabled:pointer-events-none disabled:opacity-55 data-[loading=true]:cursor-wait",
  {
    variants: {
      variant: {
        primary:
          "border-[var(--color-ink)] bg-[var(--color-ink)] text-white shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)] active:translate-y-0",
        secondary:
          "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] shadow-[var(--shadow-card)] backdrop-blur-[var(--blur-glass)] hover:-translate-y-0.5 hover:border-[rgb(29_29_31_/_18%)] active:translate-y-0",
        ghost:
          "border-transparent bg-transparent text-[var(--color-ink)] hover:bg-[rgb(255_255_255_/_56%)] active:bg-[rgb(255_255_255_/_72%)]",
      },
      size: {
        sm: "min-h-10 px-4 py-2 text-xs",
        md: "min-h-11 px-5 py-2.5",
        lg: "min-h-12 px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export function Button({ className, variant, size, asChild = false, loading = false, disabled, ...props }: ButtonProps): ReactElement {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      aria-busy={loading || undefined}
      data-loading={loading ? "true" : undefined}
      disabled={disabled || loading}
      {...props}
    />
  );
}
