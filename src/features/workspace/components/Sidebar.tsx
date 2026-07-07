"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { cn } from "@/lib/utils";
import { 
  Calculator, 
  FlaskConical, 
  LineChart, 
  BarChart2, 
  Grid3X3, 
  Cpu,
  BookOpen,
  History,
  Star,
  Settings,
  Info
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_GROUPS = [
  {
    label: "Calculators",
    items: [
      { id: "standard", label: "Standard", icon: Calculator, href: "/workspace/standard" },
      { id: "scientific", label: "Scientific", icon: FlaskConical, href: "/workspace/scientific" },
      { id: "graphing", label: "Graphing", icon: LineChart, href: "/workspace/graphing" },
    ]
  },
  {
    label: "Advanced Modules",
    items: [
      { id: "matrix", label: "Matrix", icon: Grid3X3, href: "/workspace/matrix" },
      { id: "analytics", label: "Analytics", icon: BarChart2, href: "/workspace/analytics" },
      { id: "developer", label: "Developer", icon: Cpu, href: "/workspace/developer" },
      { id: "library", label: "Formula Library", icon: BookOpen, href: "/workspace/library" },
    ]
  },
  {
    label: "Application",
    items: [
      { id: "history", label: "History", icon: History, href: "/workspace/history" },
      { id: "favorites", label: "Favorites", icon: Star, href: "/workspace/favorites" },
      { id: "settings", label: "Settings", icon: Settings, href: "/workspace/settings" },
      { id: "about", label: "About", icon: Info, href: "/workspace/about" },
    ]
  }
];

export function Sidebar() {
  const { isSidebarOpen } = useWorkspaceStore();
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isSidebarOpen ? 260 : 0, 
        opacity: isSidebarOpen ? 1 : 0 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full flex-shrink-0 bg-surface/80 backdrop-blur-3xl border-r border-border-default overflow-hidden flex flex-col"
    >
      <div className="w-[260px] h-full flex flex-col overflow-y-auto no-scrollbar py-6 px-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-6">
            <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
              {group.label}
            </h4>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname.includes(item.href);
                return (
                  <li key={item.id}>
                    <Link href={item.href}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer relative",
                          isActive 
                            ? "text-primary-foreground bg-primary shadow-sm" 
                            : "text-text-secondary hover:text-text-primary hover:bg-white/5 dark:hover:bg-white/10"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")} />
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active-indicator"
                            className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-full"
                          />
                        )}
                      </motion.div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}
