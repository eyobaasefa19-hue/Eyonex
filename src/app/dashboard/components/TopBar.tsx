"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { BellIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/components/AuthProvider";
import { NAV_GROUPS } from "../navItems";

export function TopBar({ onOpenMobile }: { onOpenMobile: () => void }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const title = pageTitle(pathname);

  async function handleSignOut() {
    await signOut();
    router.replace("/");
  }

  const initials = (user?.email ?? "U").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-neutral-200/70 bg-white/80 px-4 backdrop-blur-xl dark:border-neutral-800/70 dark:bg-neutral-950/80 sm:px-6">
      <button
        onClick={onOpenMobile}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 lg:hidden"
        aria-label="Open menu"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <h1 className="font-display text-base font-bold text-neutral-900 sm:text-lg dark:text-white">{title}</h1>

      {/* Search */}
      <div className="ml-auto hidden items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-400 transition-colors focus-within:border-primary-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500 md:flex md:w-64 lg:w-72">
        <SearchIcon className="h-4 w-4 shrink-0" />
        <input
          type="search"
          placeholder="Search lessons…"
          className="w-full bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none dark:text-neutral-200"
        />
      </div>

      <ThemeToggle className="ml-auto md:ml-0" />

      <button
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
        aria-label="Notifications"
      >
        <BellIcon className="h-5 w-5" />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white dark:ring-neutral-950" />
      </button>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 rounded-full border border-neutral-200 py-1 pl-1 pr-3 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
        aria-label="Account menu"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-xs font-bold text-white">
          {initials}
        </span>
        <span className="hidden max-w-[140px] truncate text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:inline">
          {user?.email}
        </span>
      </button>
    </header>
  );
}

function pageTitle(pathname: string): string {
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      if (item.href === "/dashboard" && pathname === "/dashboard") return item.label;
      if (pathname === item.href || pathname.startsWith(item.href + "/")) return item.label;
    }
  }
  return "Dashboard";
}
