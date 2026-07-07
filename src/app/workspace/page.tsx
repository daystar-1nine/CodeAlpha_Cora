"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Layout";
import { Heading, Paragraph } from "@/components/ui/Typography";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calculator, LineChart, MoveRight, BookOpen } from "lucide-react";
import Link from "next/link";

const MODULES = [
  { id: "standard", title: "Standard Calculator", desc: "Basic arithmetic and everyday calculations.", icon: Calculator, href: "/workspace/standard" },
  { id: "graphing", title: "Graphing Engine", desc: "Plot complex functions in 2D and 3D space.", icon: LineChart, href: "/workspace/graphing" },
  { id: "matrix", title: "Matrix Algebra", desc: "Compute cross products, dot products and magnitudes.", icon: MoveRight, href: "/workspace/matrix" },
  { id: "library", title: "Formula Library", desc: "Access hundreds of scientific and financial formulas.", icon: BookOpen, href: "/workspace/library" },
];

export default function WorkspaceDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-full py-12"
    >
      <Container>
        <div className="mb-10">
          <Heading level={2} className="mb-2">Welcome to Cora</Heading>
          <Paragraph variant="muted">
            Select a computational module from the sidebar, or press <kbd className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded border border-border-default mx-1">⌘ K</kbd> to open the Command Palette.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {MODULES.map((mod) => (
            <Link key={mod.id} href={mod.href}>
              <GlassCard intensity="heavy" className="p-6 h-full flex flex-col group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <mod.icon className="w-6 h-6" />
                </div>
                <Heading level={4} className="mb-2 group-hover:text-primary transition-colors">{mod.title}</Heading>
                <Paragraph variant="muted" className="mb-4 flex-1">
                  {mod.desc}
                </Paragraph>
                <div className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  Launch Module <MoveRight className="w-4 h-4" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}
