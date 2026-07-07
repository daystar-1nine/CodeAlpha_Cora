"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useKeyboardShortcut } from "@/hooks";
import { Search, Calculator, LineChart, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen, toggleCommandPalette } = useWorkspaceStore();
  const router = useRouter();

  // Bind Ctrl+K / Cmd+K
  useKeyboardShortcut("k", toggleCommandPalette, true);
  // Bind Escape to close
  useKeyboardShortcut("escape", () => setCommandPaletteOpen(false), false);

  const [search, setSearch] = React.useState("");

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (path: string) => {
    setCommandPaletteOpen(false);
    router.push(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-modal flex items-start justify-center pt-[15vh]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandPaletteOpen(false)}
          className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl bg-surface/90 backdrop-blur-xl border border-border-strong rounded-xl shadow-elevated overflow-hidden flex flex-col"
        >
          {/* Input */}
          <div className="flex items-center px-4 py-3 border-b border-border-default">
            <Search className="w-5 h-5 text-text-muted mr-3" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for modules, settings, or execute calculations..."
              className="flex-1 bg-transparent border-none outline-none text-text-primary text-lg placeholder:text-text-muted"
            />
            <kbd className="hidden sm:inline-block font-mono text-[10px] bg-void px-1.5 py-0.5 rounded border border-border-default text-text-muted">
              ESC
            </kbd>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto no-scrollbar py-2">
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Suggestions
            </div>
            <ul>
              <li 
                onClick={() => navigateTo("/workspace/standard")}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 text-text-secondary hover:text-text-primary"
              >
                <Calculator className="w-5 h-5" />
                <span>Standard Calculator</span>
              </li>
              <li 
                onClick={() => navigateTo("/workspace/graph")}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 text-text-secondary hover:text-text-primary"
              >
                <LineChart className="w-5 h-5" />
                <span>Graphing Calculator</span>
              </li>
              <li 
                onClick={() => navigateTo("/workspace/settings")}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 text-text-secondary hover:text-text-primary"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
