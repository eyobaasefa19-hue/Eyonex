"use client";

import Link from "next/link";
import { LogoMark } from "./icons";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-5 py-12 dark:bg-neutral-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg dark:grid-bg-dark opacity-60" />
        <div className="absolute left-1/2 top-0 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-primary-500/15 blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] h-[260px] w-[260px] rounded-full bg-secondary-500/10 blur-[100px]" />
      </div>

      <Link
        href="/"
        className="absolute left-5 top-5 inline-flex items-center gap-2.5 sm:left-8 sm:top-7"
        aria-label="Eyonex home"
      >
        <LogoMark className="h-9 w-9" />
        <span className="font-display text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Eyonex
        </span>
      </Link>

      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
