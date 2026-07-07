"use client";

import * as React from "react";
import { Info } from "lucide-react";

export function StatusBar() {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="h-8 w-full bg-void border-t border-border-default flex items-center justify-between px-4 text-[11px] font-mono text-text-muted z-docked shrink-0">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 cursor-help hover:text-text-primary transition-colors">
          <Info className="w-3 h-3" />
          Ready
        </span>
        <span className="hidden sm:inline-block">RAD</span>
        <span className="hidden sm:inline-block">Precision: 1e-14</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline-block">CPU: 2%</span>
        <span>{time}</span>
      </div>
    </footer>
  );
}
