import React from "react";
import { Compass } from "lucide-react";

export default function CompassWidget({ coordinates = "1.3521° N, 103.8198° E" }) {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-cyan-500/25 shadow-hud-card">
      <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2">
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
          EXPEDITION COMPASS
        </span>
        <span className="text-[10px] font-mono text-emerald-400">CALIBRATED</span>
      </div>

      <div className="flex flex-col items-center justify-center my-4">
        {/* Glowing Dial */}
        <div className="w-28 h-28 rounded-full border-2 border-cyan-400/40 relative flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.2)] bg-space-950/80">
          <span className="absolute top-1 text-[10px] font-mono font-bold text-pink-500">N</span>
          <span className="absolute bottom-1 text-[10px] font-mono text-slate-400">S</span>
          <span className="absolute left-2 text-[10px] font-mono text-slate-400">W</span>
          <span className="absolute right-2 text-[10px] font-mono text-slate-400">E</span>

          {/* Compass Needle */}
          <div className="w-1 h-20 bg-gradient-to-t from-cyan-400 via-transparent to-pink-500 rounded-full animate-spin-slow" />
          <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f5ff] absolute" />
        </div>

        <div className="mt-4 text-center font-mono">
          <span className="text-xs text-cyan-300 font-bold block">BEARING 042° NE</span>
          <span className="text-[10px] text-slate-400">{coordinates}</span>
        </div>
      </div>
    </div>
  );
}

