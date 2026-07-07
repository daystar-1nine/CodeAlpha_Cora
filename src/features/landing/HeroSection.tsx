"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";

const Scene = dynamic(() => import("./components/Scene").then(m => m.Scene), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-50" /></div>
});

export function HeroSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const words = ["Calculate.", "Analyze.", "Conquer."];
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 1.2 }
    }
  };

  const btnVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15, delay: 1.5 }
    }
  };

  return (
    <section className="relative w-full h-dvh overflow-hidden bg-black">
      {/* Absolute 3D Canvas Background */}
      <div className="absolute inset-0 z-base">
        <Scene />
      </div>

      {/* Absolute Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-docked pointer-events-auto">
        <div className="text-white font-display font-bold text-xl tracking-wide flex items-center gap-2 drop-shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-black">
              <Image src="/logo.png" alt="Cora" width={32} height={32} className="object-cover" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">Cora</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/workspace/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors drop-shadow-md">
            About Cora
          </Link>
          <Link href="/workspace/portfolio" className="text-sm font-medium text-white/70 hover:text-white transition-colors drop-shadow-md">
            About Me
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")} 
            className="text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Toggle Theme"
          >
            {mounted ? (
              theme === "dark" ? <Moon className="w-5 h-5" /> : theme === "light" ? <Sun className="w-5 h-5" /> : <Monitor className="w-5 h-5" />
            ) : (
              <div className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Relative DOM Content Overlay */}
      <Container className="relative z-docked h-full flex flex-col justify-center pointer-events-none">
        
        {/* Typographic Hero */}
        <div className="max-w-3xl mt-20 md:mt-0">
          <motion.h1 
            className="flex flex-col text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span 
                key={index}
                variants={wordVariants}
                className={index === 2 ? "bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent pb-2 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]" : "text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="mt-6 md:mt-8"
          >
            <p className="text-xl md:text-2xl text-white/90 max-w-xl leading-relaxed font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Beyond Calculations.
              <br />
              <span className="text-white/60 text-base md:text-lg mt-2 inline-block">
                The premier computational environment for modern developers, engineers, and data scientists.
              </span>
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div 
            variants={btnVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap gap-4 pointer-events-auto"
          >
            <Link href="/workspace">
              <Button size="lg" className="shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-shadow text-black font-semibold px-8 border-none bg-white hover:bg-white/90">
                Launch Cora
              </Button>
            </Link>
            <Link href="/workspace/about">
              <Button variant="outline" size="lg" className="border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 px-8 transition-colors">
                Explore Workspace
              </Button>
            </Link>
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
