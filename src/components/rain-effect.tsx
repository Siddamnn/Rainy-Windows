"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

const RainEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let raindrops: {
      x: number;
      y: number;
      length: number;
      speed: number;
    }[] = [];

    const createRaindrops = () => {
      raindrops = [];
      for (let i = 0; i < 200; i++) {
        raindrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 20 + 10,
          speed: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === "dark";
      ctx.strokeStyle = isDark ? "rgba(173, 216, 230, 0.2)" : "rgba(174, 194, 224, 0.5)";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      for (let i = 0; i < raindrops.length; i++) {
        const p = raindrops[i];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);
        ctx.stroke();
      }

      update();
    };

    const update = () => {
      for (let i = 0; i < raindrops.length; i++) {
        const p = raindrops[i];
        p.y += p.speed;
        if (p.y > height) {
          p.y = 0 - p.length;
          p.x = Math.random() * width;
        }
      }
    };

    let animationFrameId: number;
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createRaindrops();
    };

    window.addEventListener("resize", handleResize);
    createRaindrops();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default RainEffect;
