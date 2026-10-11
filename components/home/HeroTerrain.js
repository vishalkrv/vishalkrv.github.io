import React, { useEffect, useRef } from "react";

export default function HeroTerrain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Starfield particles
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.6),
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render starry night
      stars.forEach((star) => {
        star.alpha += Math.sin(offset * star.speed) * 0.01;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.9, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Neon Topographic Mountain Wireframe Horizons
      const lines = 18;
      const baseHorizon = height * 0.55;

      for (let i = lines; i >= 0; i--) {
        const progress = i / lines;
        const lineY = baseHorizon + Math.pow(progress, 1.6) * (height - baseHorizon);
        const amplitude = 35 + (1 - progress) * 60;
        const colorRatio = 1 - progress;

        ctx.beginPath();
        ctx.moveTo(0, lineY);

        for (let x = 0; x <= width; x += 15) {
          const nx = (x / width) * 4;
          const mountainWave =
            Math.sin(nx * 2 + offset * 0.3 + i * 0.4) * amplitude * 0.5 +
            Math.cos(nx * 4 - offset * 0.2) * (amplitude * 0.25) +
            Math.sin(nx * 6 + i) * 8;
          ctx.lineTo(x, lineY - mountainWave);
        }

        // Color gradient from cyan to magenta/purple
        const cyanAlpha = 0.15 + (1 - progress) * 0.35;
        const r = Math.round(120 * colorRatio + 20);
        const g = Math.round(40 * colorRatio + 245 * (1 - colorRatio));
        const b = 255;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${cyanAlpha})`;
        ctx.lineWidth = 1 + (1 - progress) * 0.6;
        ctx.stroke();
      }

      offset += 0.015;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
}

