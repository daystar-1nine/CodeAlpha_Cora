import * as React from "react";
import { Info } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full h-full max-w-2xl mx-auto flex flex-col pt-16 px-6">
      <div className="flex items-center gap-3 mb-8">
        <Info className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-display font-medium text-text-primary">About Cora</h2>
      </div>

      <div className="bg-surface/30 border border-border-default rounded-xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-black border border-border-default mb-6">
          <Image src="/logo.png" alt="Cora Logo" width={80} height={80} className="object-cover" />
        </div>
        <h3 className="text-xl font-medium text-text-primary">Cora Workspace</h3>
        <p className="text-sm text-text-muted mt-2 mb-6">Version 1.0.0 (Production Release)</p>
        <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
          Cora is a professional-grade computational environment. Powered by Next.js, mathjs, and native BigInt precision, it unifies advanced standard arithmetic, graphing, statistics, matrix algebra, and developer tools into a single desktop-class web application.
        </p>
        <div className="mt-8 text-xs text-text-muted">
          Built for the CodeAlpha Portfolio.
        </div>
      </div>
    </div>
  );
}
