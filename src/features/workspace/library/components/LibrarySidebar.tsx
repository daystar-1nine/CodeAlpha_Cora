"use client";

import * as React from "react";
import { FormulaCategory } from "@/data/formulas";
import { cn } from "@/lib/utils";
import { Search, BookOpen, Calculator, LineChart, Globe, DollarSign, Database, Hash } from "lucide-react";

interface LibrarySidebarProps {
  activeCategory: FormulaCategory | "All";
  setActiveCategory: (cat: FormulaCategory | "All") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function LibrarySidebar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }: LibrarySidebarProps) {
  
  const categories: { id: FormulaCategory | "All", icon: React.ReactNode }[] = [
    { id: "All", icon: <BookOpen className="w-4 h-4" /> },
    { id: "Mathematics", icon: <Calculator className="w-4 h-4" /> },
    { id: "Physics", icon: <Globe className="w-4 h-4" /> },
    { id: "Statistics", icon: <LineChart className="w-4 h-4" /> },
    { id: "Finance", icon: <DollarSign className="w-4 h-4" /> },
    { id: "Engineering", icon: <Database className="w-4 h-4" /> },
    { id: "Computer Science", icon: <Hash className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-surface/30 backdrop-blur-md border-r border-border-default">
      <div className="p-4 border-b border-border-default shrink-0 space-y-4">
        <h3 className="font-display font-medium text-text-primary flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Formula Library
        </h3>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search formulas, symbols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-void/50 border border-border-default rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-2">Categories</h4>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3",
              activeCategory === cat.id 
                ? "bg-primary/10 border border-primary/20 text-primary shadow-sm font-medium" 
                : "border border-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary"
            )}
          >
            {cat.icon}
            <span>{cat.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
