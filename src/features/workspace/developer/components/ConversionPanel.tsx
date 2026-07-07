"use client";

import * as React from "react";
import { useDeveloperStore } from "@/store/developerStore";
import { formatBase, getAscii } from "@/lib/developerMath";
import { Copy, CheckCircle2 } from "lucide-react";

export function ConversionPanel() {
  const { value, wordSize, isSigned } = useDeveloperStore();

  const conversions = [
    { label: "HEX", val: formatBase(value, "HEX", wordSize, isSigned) },
    { label: "DEC", val: formatBase(value, "DEC", wordSize, isSigned) },
    { label: "OCT", val: formatBase(value, "OCT", wordSize, isSigned) },
    { label: "BIN", val: formatBase(value, "BIN", wordSize, isSigned) },
  ];

  const ascii = getAscii(value, wordSize);

  return (
    <div className="w-full h-full flex flex-col bg-surface/30 backdrop-blur-md border-l border-border-default overflow-y-auto no-scrollbar">
      <div className="h-14 flex items-center px-6 border-b border-border-default shrink-0">
        <h3 className="font-display font-medium text-text-primary">
          Data Inspector
        </h3>
      </div>

      <div className="p-6 flex flex-col gap-6">
        
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Number Systems</h4>
          {conversions.map((conv) => (
             <ConversionItem key={conv.label} label={conv.label} value={conv.val} />
          ))}
        </div>

        <div className="h-px w-full bg-border-default/50" />

        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Character Decoding</h4>
          <ConversionItem label="ASCII" value={ascii} />
        </div>

      </div>
    </div>
  );
}

function ConversionItem({ label, value }: { label: string, value: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1 group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-primary"
          title="Copy"
        >
          {copied ? <CheckCircle2 className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
      <div className="bg-void/50 border border-border-default rounded-md px-3 py-2 font-mono text-sm text-text-primary break-all">
        {value}
      </div>
    </div>
  );
}
