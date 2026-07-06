"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeftIcon, LogoMark, SignOutIcon } from "@/components/icons";
import { NAV_GROUPS } from "../navItems";

const COLLAPSED_WIDTH = 80;
const EXPANDED_WIDTH = 264;

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();
  const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onCloseMobile}
        className={`fixed inset-0 z-40 bg-neutral-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-neutral-200/70 bg-white transition-[width,transform] duration-300 ease-out dark:border-neutral-800/70 dark:bg-neutral-900 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width }}
        aria-label="Sidebar navigation"
      >
        {/* Brand */}
        <div className={`flex h-16 items-center border-b border-neutral-200/70 dark:border-neutral-800/70 ${collapsed ? "justify-center px-3" : "px-5"}`}>
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onCloseMobile}>
            <LogoMark className="h-9 w-9 shrink-0" />
            {!collapsed && (
              <span className="font-display text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Eyonex
              </span>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.heading} className="mb-5">
              {!collapsed && (
                <p className="px-5 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {group.heading}
                </p>
              )}
              <ul className="space-y-1 px-2.5">
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onCloseMobile}
                        title={collapsed ? item.label : undefined}
                        className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          collapsed ? "justify-center" : ""
                        } ${
                          active
                            ? "bg-primary-500/10 text-primary-700 dark:text-primary-300"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary-500" />
                        )}
                        <Icon className={`h-5 w-5 shrink-0 ${active ? "text-primary-600 dark:text-primary-400" : ""}`} />
                        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                        {!collapsed && item.badge && (
                          <span className="rounded-full bg-primary-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer: collapse toggle (desktop) + sign out */}
        <div className="border-t border-neutral-200/70 p-2.5 dark:border-neutral-800/70">
          <button
            onClick={onToggleCollapse}
            className={`hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white lg:flex ${
              collapsed ? "justify-center" : ""
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronsLeftIcon className={`h-5 w-5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
            {!collapsed && <span>Collapse</span>}
          </button>
          <Link
            href="/"
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <SignOutIcon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Exit dashboard</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}
