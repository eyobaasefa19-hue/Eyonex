import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "secondary" | "accent" | "neutral" | "success" | "warning" | "error";

const TONES: Record<Tone, string> = {
  primary: "bg-primary-500/10 text-primary-700 dark:text-primary-300",
  secondary: "bg-secondary-500/10 text-secondary-700 dark:text-secondary-300",
  accent: "bg-accent-500/10 text-accent-700 dark:text-accent-300",
  neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  success: "bg-success-500/10 text-success-700 dark:text-success-500",
  warning: "bg-warning-500/10 text-warning-700 dark:text-warning-500",
  error: "bg-error-500/10 text-error-700 dark:text-error-500",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "primary", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
