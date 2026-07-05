import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl border border-neutral-200/70 bg-white shadow-card dark:border-neutral-800/70 dark:bg-neutral-900",
          hover && "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";
