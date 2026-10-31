import React from "react";
import { Compass } from "lucide-react";

export default function CompassWidget({ coordinates = "1.3521° N, 103.8198° E" }) {
  return (
    <div className="instrument-panel p-5 num">
      <div className="flex items-center justify-between mb-3 border-b border-rule pb-2">
        <h3 className="text-sm font-medium text-ink">
          Expedition compass
        </h3>
        <span className="badge-lime text-xs">Calibrated</span>
      </div>

      <div className="flex flex-col items-center justify-center my-4">
        {/* Precision Dial */}
        <div className="w-24 h-24 rounded-full border border-rule-2 relative flex items-center justify-center bg-paper">
          <span className="absolute top-1 text-xs text-accent font-medium">N</span>
          <span className="absolute bottom-1 text-xs text-muted">S</span>
          <span className="absolute left-2 text-xs text-muted">W</span>
          <span className="absolute right-2 text-xs text-muted">E</span>

          {/* Compass Needle */}
          <div className="w-0.5 h-16 bg-accent rounded-full opacity-80" />
          <div className="w-2 h-2 rounded-full bg-accent absolute" />
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-ink font-medium block">Bearing 042° NE</span>
          <span className="text-xs text-muted">{coordinates}</span>
        </div>
      </div>
    </div>
  );
}
