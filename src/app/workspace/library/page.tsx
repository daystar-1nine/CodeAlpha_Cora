"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LibrarySidebar } from "@/features/workspace/library/components/LibrarySidebar";
import { FormulaCard } from "@/features/workspace/library/components/FormulaCard";
import { formulaLibrary, FormulaCategory } from "@/data/formulas";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function LibraryPage() {
  const { setActiveModule } = useWorkspaceStore();
  const [activeCategory, setActiveCategory] = React.useState<FormulaCategory | "All">("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setActiveModule("library");
  }, [setActiveModule]);

  const filteredFormulas = formulaLibrary.filter(f => {
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      f.name.toLowerCase().includes(q) || 
      f.description.toLowerCase().includes(q) ||
      f.variables.some(v => v.symbol.toLowerCase().includes(q) || v.definition.toLowerCase().includes(q));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col xl:flex-row overflow-hidden"
    >
      <div className="w-full xl:w-80 h-[30vh] xl:h-full shrink-0 z-20 border-b xl:border-b-0 xl:border-r border-border-default">
        <LibrarySidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="flex-1 h-[70vh] xl:h-full relative z-10 bg-transparent overflow-y-auto no-scrollbar p-8">
        <div className="max-w-7xl mx-auto">
          {filteredFormulas.length === 0 ? (
            <div className="w-full h-64 flex flex-col items-center justify-center opacity-50">
               <p className="text-text-muted italic">No formulas found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredFormulas.map(f => (
                <FormulaCard key={f.id} formula={f} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
