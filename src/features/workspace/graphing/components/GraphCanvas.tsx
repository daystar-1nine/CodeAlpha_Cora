"use client";

import * as React from "react";
import { useGraphStore, Equation } from "@/store/graphStore";
import { compileGraphFunction, CompiledFunction } from "@/lib/graphMath";

export function GraphCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { equations, pan, zoom } = useGraphStore();
  
  // Interaction state
  const isDragging = React.useRef(false);
  const lastMousePos = React.useRef({ x: 0, y: 0 });
  const hoverPos = React.useRef<{x: number, y: number} | null>(null);

  // Math compiler cache
  const compiledEquations = React.useRef<Map<string, CompiledFunction>>(new Map());

  // Compile equations when they change
  React.useEffect(() => {
    equations.forEach(eq => {
      if (eq.isVisible && !eq.isError && eq.expression.trim() !== "") {
        try {
          const compiled = compileGraphFunction(eq.expression);
          compiledEquations.current.set(eq.id, compiled);
        } catch {
          compiledEquations.current.delete(eq.id);
        }
      } else {
        compiledEquations.current.delete(eq.id);
      }
    });
  }, [equations]);

  // Main Render Loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      // Handle high-DPI (Retina) displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { xMin, xMax, yMin, yMax } = useGraphStore.getState().viewport;
      
      // Math to Pixel mapping functions
      const mapX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
      const mapY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;
      const invMapX = (px: number) => xMin + (px / width) * (xMax - xMin);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // --- Draw Grid ---
      const xRange = xMax - xMin;
      const yRange = yMax - yMin;
      
      // Calculate dynamic step sizes
      const getStepSize = (range: number) => {
        const magnitude = Math.pow(10, Math.floor(Math.log10(range / 5)));
        const residual = range / magnitude;
        if (residual > 50) return magnitude * 10;
        if (residual > 20) return magnitude * 5;
        if (residual > 10) return magnitude * 2;
        return magnitude;
      };

      const stepX = getStepSize(xRange);
      const stepY = getStepSize(yRange);

      ctx.lineWidth = 1;
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw vertical grid lines
      const startX = Math.floor(xMin / stepX) * stepX;
      for (let x = startX; x <= xMax; x += stepX) {
        if (x === 0) continue; // Skip axis
        const px = mapX(x);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
        ctx.stroke();
        
        // Label
        const py = mapY(0);
        const labelY = (py > 0 && py < height) ? py + 15 : height - 15;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(parseFloat(x.toPrecision(4)).toString(), px, Math.max(15, Math.min(height - 15, labelY)));
      }

      // Draw horizontal grid lines
      const startY = Math.floor(yMin / stepY) * stepY;
      for (let y = startY; y <= yMax; y += stepY) {
        if (y === 0) continue; // Skip axis
        const py = mapY(y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
        
        // Label
        const px = mapX(0);
        const labelX = (px > 0 && px < width) ? px - 20 : 25;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(parseFloat(y.toPrecision(4)).toString(), Math.max(25, Math.min(width - 25, labelX)), py);
      }

      // --- Draw Axes ---
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      const originX = mapX(0);
      const originY = mapY(0);

      if (originX >= 0 && originX <= width) {
        ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, height); ctx.stroke();
      }
      if (originY >= 0 && originY <= height) {
        ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(width, originY); ctx.stroke();
      }

      // --- Draw Equations ---
      const activeEquations = useGraphStore.getState().equations.filter(eq => eq.isVisible && !eq.isError && compiledEquations.current.has(eq.id));
      
      activeEquations.forEach(eq => {
        const compiled = compiledEquations.current.get(eq.id)!;
        
        ctx.beginPath();
        ctx.strokeStyle = eq.color;
        ctx.lineWidth = 2.5;
        // Add neon glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = eq.color;

        let isDrawing = false;
        // Step per pixel for perfect resolution
        const step = (xMax - xMin) / width;
        
        for (let x = xMin; x <= xMax; x += step) {
          const y = compiled.evaluate(x);
          
          if (!isNaN(y) && isFinite(y)) {
            const px = mapX(x);
            const py = mapY(y);
            // Cap lines to prevent drawing way out of bounds which slows down canvas
            if (py >= -height && py <= height * 2) {
                if (!isDrawing) {
                  ctx.moveTo(px, py);
                  isDrawing = true;
                } else {
                  ctx.lineTo(px, py);
                }
            } else {
                isDrawing = false; // Break line if shooting to infinity (e.g., asymptotes)
            }
          } else {
            isDrawing = false;
          }
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0; // reset for next drawing
      });

      // --- Draw Hover Inspector ---
      if (hoverPos.current) {
        const { x: hx, y: hy } = hoverPos.current;
        const mathX = invMapX(hx);
        
        // Find closest curve at this X
        let closestEq: Equation | null = null;
        let closestY = 0;
        let minPixelDist = Infinity;

        activeEquations.forEach(eq => {
          const compiled = compiledEquations.current.get(eq.id)!;
          const y = compiled.evaluate(mathX);
          if (!isNaN(y) && isFinite(y)) {
            const py = mapY(y);
            const dist = Math.abs(py - hy);
            if (dist < minPixelDist && dist < 50) { // snap threshold
              minPixelDist = dist;
              closestEq = eq;
              closestY = y;
            }
          }
        });

        if (closestEq) {
          const eq = closestEq as Equation;
          const px = mapX(mathX);
          const py = mapY(closestY);

          // Draw crosshair
          ctx.beginPath();
          ctx.strokeStyle = eq.color;
          ctx.setLineDash([5, 5]);
          ctx.moveTo(px, 0); ctx.lineTo(px, height);
          ctx.moveTo(0, py); ctx.lineTo(width, py);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw point
          ctx.beginPath();
          ctx.fillStyle = eq.color;
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();

          // Draw Tooltip
          const label = `(${mathX.toFixed(3)}, ${closestY.toFixed(3)})`;
          ctx.fillStyle = "rgba(10, 10, 10, 0.8)";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(0,0,0,0.5)";
          
          const textWidth = ctx.measureText(label).width;
          const tipX = px + 10 + textWidth > width ? px - 15 - textWidth : px + 10;
          const tipY = py - 20 < 0 ? py + 20 : py - 10;
          
          ctx.roundRect(tipX - 5, tipY - 10, textWidth + 10, 20, 4);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = eq.color;
          ctx.textAlign = "left";
          ctx.fillText(label, tipX, tipY);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Setup Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);
    resize();
    
    // Start loop
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [equations]); // Rebind loop if equations list changes

  // Event Handlers for Interaction
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    
    const { xMin, xMax, yMin, yMax } = useGraphStore.getState().viewport;
    const mathX = xMin + (px / rect.width) * (xMax - xMin);
    const mathY = yMax - (py / rect.height) * (yMax - yMin);
    
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
    zoom(zoomFactor, mathX, mathY);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    if (isDragging.current) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      
      // Calculate pan as percentage of width/height
      const panDx = -dx / rect.width;
      const panDy = dy / rect.height; // inverted y axis for math
      
      pan(panDx, panDy);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      hoverPos.current = null;
    } else {
      // Hover logic
      hoverPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if (canvasRef.current) canvasRef.current.releasePointerCapture(e.pointerId);
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
    hoverPos.current = null;
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative bg-void overflow-hidden touch-none cursor-crosshair active:cursor-grabbing"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 outline-none"
      />
      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
         <button 
           onClick={() => zoom(0.8)}
           className="w-10 h-10 flex items-center justify-center bg-surface/80 backdrop-blur-md rounded-full border border-border-default text-text-primary hover:bg-white/10 shadow-lg"
         >
           +
         </button>
         <button 
           onClick={() => zoom(1.2)}
           className="w-10 h-10 flex items-center justify-center bg-surface/80 backdrop-blur-md rounded-full border border-border-default text-text-primary hover:bg-white/10 shadow-lg"
         >
           -
         </button>
         <button 
           onClick={() => useGraphStore.getState().resetViewport()}
           className="w-10 h-10 mt-2 flex items-center justify-center bg-surface/80 backdrop-blur-md rounded-full border border-border-default text-text-muted hover:text-text-primary shadow-lg"
           title="Reset View"
         >
           ⌂
         </button>
      </div>
    </div>
  );
}
