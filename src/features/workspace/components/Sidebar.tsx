"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
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
  const { isSidebarOpen, toggleSidebar } = useWorkspaceStore();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Auto close sidebar on mobile when navigating
  React.useEffect(() => {
    if (isMobile && isSidebarOpen) {
      toggleSidebar();
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="absolute inset-0 z-[40] bg-black/50 backdrop-blur-sm"
        />
      )}
      
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 260 : 0,
          x: isMobile && !isSidebarOpen ? -260 : 0,
          opacity: isMobile ? 1 : (isSidebarOpen ? 1 : 0) // On desktop hide width, on mobile keep width but slide offscreen
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "h-full flex-shrink-0 bg-surface/90 backdrop-blur-3xl border-r border-border-default overflow-hidden flex flex-col shadow-2xl",
          isMobile ? "absolute left-0 top-0 z-[50]" : "relative z-[10]"
        )}
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
                    <Link href={item.href} onClick={(e) => {
                      if (isMobile) {
                        // Let the useEffect handle the closing after path changes, but immediate feedback is nicer
                        setTimeout(toggleSidebar, 50);
                      }
                    }}>
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] md:py-2 md:text-sm font-medium md:rounded-lg transition-all duration-200 cursor-pointer relative",
                          isActive 
                            ? "text-primary-foreground bg-primary shadow-sm" 
                            : "text-text-secondary hover:text-text-primary hover:bg-white/5 dark:hover:bg-white/10"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5 md:w-4 md:h-4", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")} />
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
    </>
  );
}
