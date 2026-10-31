import React, { useEffect, useRef } from "react";

export default function HeroTerrain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 600);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    // Generate elevation point cloud across 3D coordinate space
    const points = [];
    const rows = 45;
    const cols = 65;
    const spacingX = 22;
    const spacingZ = 24;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * spacingX;
        const z = (r - rows / 2) * spacingZ;

        // Procedural terrain elevation: ridgelines, saddle, and summit
        const dist = Math.sqrt(x * x + z * z);
        const ridge1 = Math.sin(x * 0.007 + z * 0.005) * 65;
        const ridge2 = Math.cos(x * 0.015 - z * 0.012) * 45;
        const peak = Math.exp(-dist * 0.0035) * 120;
        const y = -(ridge1 + ridge2 + peak);

        // Found summit waypoint marker in lime
        const isSurveyMarker = (r === 22 && c === 32) || (r === 15 && c === 45) || (r === 30 && c === 18);

        points.push({ x, y, z, isSurveyMarker });
      }
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Camera parameters
      const fov = 340;
      const cameraY = -180;
      const cameraZ = -520;
      const angleY = prefersReducedMotion ? 0.12 : Math.sin(time * 0.08) * 0.18;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Sweep plane traveling across the scan
      const sweepZ = prefersReducedMotion ? 0 : Math.sin(time * 0.45) * 480;

      // Project and render points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate around Y
        const rx = p.x * cosY - p.z * sinY;
        const rz = p.x * sinY + p.z * cosY - cameraZ;
        const ry = p.y - cameraY;

        if (rz <= 20) continue;

        const scale = fov / rz;
        const screenX = width / 2 + rx * scale;
        const screenY = height * 0.58 + ry * scale;

        if (screenX < -20 || screenX > width + 20 || screenY < -20 || screenY > height + 20) {
          continue;
        }

        // Distance and depth attenuation
        const depthAlpha = Math.max(0.08, Math.min(0.9, (1 - rz / 1200)));

        // Sweep interaction: points near sweep plane light up towards pale white
        const distToSweep = Math.abs(p.z - sweepZ);
        const sweepHit = Math.max(0, 1 - distToSweep / 70);

        if (p.isSurveyMarker) {
          // Surveyed summit marker: Vantage chromatic lime signal
          ctx.fillStyle = `rgba(202, 255, 60, ${Math.min(1, depthAlpha + 0.3)})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(2, 3.2 * scale), 0, Math.PI * 2);
          ctx.fill();

          // Tiny marker leader tick
          ctx.strokeStyle = `rgba(202, 255, 60, 0.4)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(screenX, screenY - 10);
          ctx.stroke();
        } else if (sweepHit > 0.05) {
          // Lit by lidar sweep beam
          const sweepInk = 0.6 + sweepHit * 0.4;
          ctx.fillStyle = `rgba(235, 245, 255, ${Math.min(0.95, sweepInk * depthAlpha)})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(1, 1.8 * scale + sweepHit), 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Elevation altitude coloring: steel ink
          const altNorm = Math.max(0, Math.min(1, (-p.y) / 180));
          const grey = Math.round(110 + altNorm * 110);
          ctx.fillStyle = `rgba(${grey}, ${grey + 10}, ${grey + 20}, ${depthAlpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0.8, 1.4 * scale), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        time += 0.015;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
