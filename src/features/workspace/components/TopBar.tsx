"use client";

import * as React from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useTheme } from "next-themes";
import { PanelLeft, Search, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export function TopBar() {
  const { toggleSidebar, toggleCommandPalette } = useWorkspaceStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-14 w-full flex items-center justify-between px-4 bg-surface/50 backdrop-blur-xl border-b border-border-default z-docked shrink-0">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-text-secondary hover:text-text-primary" aria-label="Toggle Sidebar">
          <PanelLeft className="w-5 h-5" />
        </Button>
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          {/* Subtle Cora Logo */}
          <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center bg-black">
            <Image src="/logo.png" alt="Cora" width={24} height={24} className="object-cover" />
          </div>
          <span className="font-display font-semibold text-sm tracking-wide hidden sm:block">Cora Workspace</span>
        </Link>
      </div>

      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <button 
          onClick={toggleCommandPalette}
          aria-label="Open Command Palette"
          className="w-full h-9 bg-void/50 border border-border-default rounded-md flex items-center px-3 text-sm text-text-muted hover:bg-void/80 hover:border-border-strong transition-all focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
        >
          <Search className="w-4 h-4 mr-2 opacity-50" />
          <span>Search modules, formulas, history...</span>
          <div className="ml-auto flex items-center gap-1 opacity-50">
            <kbd className="font-mono text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border-default">⌘</kbd>
            <kbd className="font-mono text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border-default">K</kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")} 
          className="text-text-secondary hover:text-text-primary"
          aria-label="Toggle Theme"
        >
          {mounted ? (
            theme === "dark" ? <Moon className="w-4 h-4" /> : theme === "light" ? <Sun className="w-4 h-4" /> : <Monitor className="w-4 h-4" />
          ) : (
            <div className="w-4 h-4" />
          )}
        </Button>
        <Link href="/workspace/portfolio">
          <div 
            className="w-10 h-10 rounded-full overflow-hidden ml-2 border border-border-strong hover:border-primary/50 transition-all cursor-pointer shadow-[0_0_15px_rgba(234,179,8,0.1)] bg-black"
            style={{ backgroundImage: 'url(/avatar.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </Link>
      </div>
    </header>
  );
}
