import * as React from "react";
import { TopBar } from "@/features/workspace/components/TopBar";
import { Sidebar } from "@/features/workspace/components/Sidebar";
import { StatusBar } from "@/features/workspace/components/StatusBar";
import { CommandPalette } from "@/features/workspace/components/CommandPalette";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden bg-void relative">
      {/* Absolute Noise/Gradient background layer */}
      <div className="absolute inset-0 z-hide pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] opacity-20 mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#8b5cf6] rounded-full blur-[150px] opacity-10 mix-blend-screen" />
      </div>

      <TopBar />
      
      <div className="flex flex-1 overflow-hidden relative z-base">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto no-scrollbar relative bg-transparent">
          {children}
        </main>
      </div>

      <StatusBar />
      <CommandPalette />
    </div>
  );
}
