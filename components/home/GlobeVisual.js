import React, { useRef, useEffect } from "react";

export default function GlobeVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth || 300);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 176);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const radius = Math.min(width, height) * 0.36;
    const centerX = width * 0.55;
    const centerY = height * 0.5;

    let rotation = 0;

    // GPS Trail Points on globe
    const trailPoints = [
      { lat: 1.35, lon: 103.82, label: "Singapore", isPrimary: true },
      { lat: 28.61, lon: 77.2, label: "Delhi", isPrimary: false },
      { lat: 37.77, lon: -122.41, label: "SF", isPrimary: false },
      { lat: 51.5, lon: -0.12, label: "London", isPrimary: false },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Outer wireframe ring
      ctx.strokeStyle = "rgba(180, 195, 210, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Longitudinal circles
      for (let lon = 0; lon < Math.PI * 2; lon += Math.PI / 4) {
        const curLon = lon + rotation;
        const xOffset = Math.sin(curLon) * radius;

        ctx.strokeStyle = "rgba(180, 195, 210, 0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          Math.abs(xOffset),
          radius,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Latitudinal lines
      for (let lat = -0.7; lat <= 0.7; lat += 0.35) {
        const y = centerY + lat * radius;
        const rLat = Math.cos(lat) * radius;
        ctx.strokeStyle = "rgba(180, 195, 210, 0.1)";
        ctx.beginPath();
        ctx.ellipse(centerX, y, rLat, rLat * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // GPS Markers
      trailPoints.forEach((pt) => {
        const phi = (pt.lat * Math.PI) / 180;
        const theta = (pt.lon * Math.PI) / 180 + rotation;

        // Front-facing check
        if (Math.cos(theta) > -0.2) {
          const x = centerX + radius * Math.cos(phi) * Math.sin(theta);
          const y = centerY - radius * Math.sin(phi);

          if (pt.isPrimary) {
            // Vantage chromatic lime marker
            ctx.fillStyle = "rgba(202, 255, 60, 0.95)";
            ctx.beginPath();
            ctx.arc(x, y, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(202, 255, 60, 0.4)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            ctx.fillStyle = "rgba(180, 195, 210, 0.5)";
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      if (!prefersReducedMotion) {
        rotation += 0.006;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-44 relative overflow-hidden rounded bg-paper border border-rule flex items-center justify-center">
      <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full" />
      <div className="absolute top-2 left-2 text-xs text-muted num bg-paper-2/90 px-2 py-0.5 rounded border border-rule">
        GPS 1.3521° N, 103.8198° E
      </div>
    </div>
  );
}
