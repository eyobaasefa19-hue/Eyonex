"use client";

import type { ComponentType, SVGProps } from "react";
import { SparklesIcon } from "@/components/icons";
import { Card } from "./ui";

/**
 * Placeholder for dashboard sub-routes that aren't built yet. Shows a
 * polished "coming soon" state consistent with the dashboard aesthetic
 * so the navigation graph is complete and clickable end-to-end.
 */
export function PlaceholderSection({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        </div>
      </div>

      <Card className="relative overflow-hidden p-10 text-center">
        <div className="pointer-events-none absolute inset-0 grid-bg dark:grid-bg-dark opacity-50" />
        <div className="relative mx-auto max-w-md">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-glow">
            <SparklesIcon className="h-7 w-7" />
          </span>
          <h3 className="mt-5 font-display text-xl font-bold text-neutral-900 dark:text-white">
            Coming soon
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            This section is part of the Eyonex learning experience and will be available soon.
            Your progress here will be tracked automatically.
          </p>
        </div>
      </Card>
    </div>
  );
}
