import React, { useRef, useEffect } from "react";

export default function GlobeVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth || 300);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 180);

    const radius = Math.min(width, height) * 0.38;
    const centerX = width * 0.55;
    const centerY = height * 0.5;

    let rotation = 0;

    // GPS Trail Points on globe
    const trailPoints = [
      { lat: 1.35, lon: 103.82, label: "Singapore" },
      { lat: 28.61, lon: 77.2, label: "Delhi" },
      { lat: 37.77, lon: -122.41, label: "SF" },
      { lat: 51.5, lon: -0.12, label: "London" },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Globe sphere glow
      const radial = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.2,
        centerX,
        centerY,
        radius * 1.2
      );
      radial.addColorStop(0, "rgba(0, 245, 255, 0.15)");
      radial.addColorStop(0.8, "rgba(121, 40, 202, 0.2)");
      radial.addColorStop(1, "transparent");
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Outer wireframe ring
      ctx.strokeStyle = "rgba(0, 245, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Longitudinal circles
      for (let lon = 0; lon < Math.PI * 2; lon += Math.PI / 4) {
        const curLon = lon + rotation;
        const xOffset = Math.sin(curLon) * radius;

        ctx.strokeStyle = "rgba(0, 245, 255, 0.15)";
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
        ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
        ctx.beginPath();
        ctx.ellipse(centerX, y, rLat, rLat * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // GPS Pulsing Markers
      trailPoints.forEach((pt, i) => {
        const phi = (pt.lat * Math.PI) / 180;
        const theta = (pt.lon * Math.PI) / 180 + rotation;

        // Front-facing check
        if (Math.cos(theta) > -0.2) {
          const x = centerX + radius * Math.cos(phi) * Math.sin(theta);
          const y = centerY - radius * Math.sin(phi);

          // Pulsing pin
          ctx.fillStyle = i === 0 ? "#00f5ff" : "#ff0080";
          ctx.shadowColor = i === 0 ? "#00f5ff" : "#ff0080";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      rotation += 0.008;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full h-44 relative overflow-hidden rounded-lg bg-space-950/60 border border-slate-800">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400 bg-space-900/80 px-2 py-0.5 rounded border border-cyan-500/30">
        GPS: 1.3521° N, 103.8198° E
      </div>
    </div>
  );
}

