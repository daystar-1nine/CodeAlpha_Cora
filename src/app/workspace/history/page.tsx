"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon } from "lucide-react";

export default function HistoryPage() {
  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-full flex flex-col items-center justify-center text-text-muted bg-surface/80 backdrop-blur-xl rounded-t-3xl md:rounded-none border-t border-border-default md:border-none md:bg-transparent mt-12 md:mt-0"
    >
      <div className="w-12 h-1.5 bg-border-strong rounded-full mb-8 md:hidden opacity-50" />
      <HistoryIcon className="w-16 h-16 mb-4 opacity-50" />
      <h2 className="text-xl font-display font-medium text-text-primary mb-2">History</h2>
      <p className="text-sm">No calculations saved yet.</p>
    </motion.div>
  );
}
