import * as React from "react";
import { History as HistoryIcon } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
      <HistoryIcon className="w-16 h-16 mb-4 opacity-50" />
      <h2 className="text-xl font-display font-medium text-text-primary mb-2">History</h2>
      <p className="text-sm">No calculations saved yet.</p>
    </div>
  );
}
