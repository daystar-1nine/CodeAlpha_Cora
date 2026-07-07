"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [precision, setPrecision] = React.useState(true);
  const [sound, setSound] = React.useState(false);
  const [animations, setAnimations] = React.useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-full max-w-2xl mx-auto flex flex-col pt-8 md:pt-16 px-4 md:px-6 bg-surface/50 md:bg-transparent backdrop-blur-md rounded-t-3xl md:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:shadow-none border-t md:border-none border-border-default mt-4 md:mt-0"
    >
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-display font-medium text-text-primary">Settings</h2>
      </div>

      <div className="space-y-6">
        <SettingToggle 
          title="Dark Theme" 
          description="Use the pitch-black void theme." 
          active={theme === "dark"} 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
        />
        <SettingToggle 
          title="High Precision" 
          description="Use 1e-14 BigNumber precision across modules." 
          active={precision} 
          onClick={() => setPrecision(!precision)} 
        />
        <SettingToggle 
          title="Sound Effects" 
          description="Enable haptic feedback audio." 
          active={sound} 
          onClick={() => setSound(!sound)} 
        />
        <SettingToggle 
          title="Smooth Animations" 
          description="Enable 60FPS Framer Motion transitions." 
          active={animations} 
          onClick={() => setAnimations(!animations)} 
        />
      </div>
    </motion.div>
  );
}

function SettingToggle({ title, description, active, onClick }: { title: string, description: string, active: boolean, onClick: () => void }) {
  return (
    <div 
      className="flex items-center justify-between p-4 bg-surface/30 border border-border-default rounded-xl cursor-pointer hover:border-border-strong transition-colors"
      onClick={onClick}
    >
      <div>
        <h4 className="text-sm font-medium text-text-primary select-none">{title}</h4>
        <p className="text-xs text-text-muted mt-1 select-none">{description}</p>
      </div>
      <div className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${active ? "bg-primary" : "bg-surface"}`}>
        <div className={`w-4 h-4 rounded-full bg-void transition-transform ${active ? "translate-x-4" : ""}`} />
      </div>
    </div>
  );
}
