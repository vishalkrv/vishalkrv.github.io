import React, { useState } from "react";
import {
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiDocker,
  SiGooglecloud,
  SiBootstrap,
  SiSass,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { digitalToolchain } from "../../data/projects";

// Icon mapping dictionary
const iconMap = {
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiDocker,
  FaAws,
  SiGooglecloud,
  SiBootstrap,
  SiSass,
  SiGit,
};

export default function ToolchainGauge() {
  const [hoveredTool, setHoveredTool] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
          MY DIGITAL TOOLCHAIN / OUTDOOR GEAR
        </span>
      </div>

      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-cyan-500/25 shadow-hud-card overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-3">
          {digitalToolchain.map((tool) => {
            const IconComponent = iconMap[tool.iconName] || SiReact;
            const isHovered = hoveredTool === tool.key;

            return (
              <div
                key={tool.key}
                onMouseEnter={() => setHoveredTool(tool.key)}
                onMouseLeave={() => setHoveredTool(null)}
                className="flex-1 flex flex-col items-center group cursor-pointer p-2 rounded-xl transition-all hover:bg-space-900/60"
              >
                {/* Tech Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 mb-2 relative"
                  style={{
                    backgroundColor: isHovered ? "rgba(0, 245, 255, 0.1)" : "rgba(13, 8, 36, 0.5)",
                    border: `1px solid ${isHovered ? tool.color : "rgba(255, 255, 255, 0.08)"}`,
                    boxShadow: isHovered ? `0 0 15px ${tool.color}66` : "none",
                  }}
                >
                  <IconComponent
                    className="w-5 h-5 transition-colors"
                    style={{ color: tool.color }}
                  />
                </div>

                {/* Mini Sparkline Gauge */}
                <div className="w-full h-4 flex items-end space-x-0.5 px-1">
                  {tool.gauge.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all duration-300"
                      style={{
                        height: `${(val / 100) * 100}%`,
                        backgroundColor: isHovered ? tool.color : "rgba(0, 245, 255, 0.35)",
                      }}
                    />
                  ))}
                </div>

                {/* Tech Label */}
                <span className="text-[10px] font-mono text-slate-400 mt-1.5 truncate group-hover:text-cyan-300 transition-colors">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

