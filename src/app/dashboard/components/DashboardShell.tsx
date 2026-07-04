"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

const COLLAPSED_WIDTH = 80;
const EXPANDED_WIDTH = 264;

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Restore desktop collapse preference.
  useEffect(() => {
    setMounted(true);
    try {
      const pref = localStorage.getItem("eyonex-sidebar-collapsed");
      if (pref === "1") setCollapsed(true);
    } catch {}
  }, []);

  function toggleCollapse() {
    setCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem("eyonex-sidebar-collapsed", next ? "1" : "0");
      } catch {}
      return next;
    });
  }

  const width = mounted ? (collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH) : EXPANDED_WIDTH;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className="flex min-h-screen flex-col transition-[padding] duration-300 ease-out"
        style={{ paddingLeft: `var(--sb, ${width}px)` }}
      >
        {/* inline var keeps SSR/CSR in sync without layout jump after hydration */}
        <style>{`:root{--sb:${width}px}`}</style>
        <TopBar onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
