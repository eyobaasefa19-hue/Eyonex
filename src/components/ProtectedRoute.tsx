"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { LogoMark } from "./icons";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white dark:bg-neutral-950">
        <LogoMark className="h-12 w-12 animate-pulse" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading your dashboard…</p>
        <span className="mt-1 inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-500" />
      </div>
    );
  }

  return <>{children}</>;
}
