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
    <section className="w-full max-w-6xl mx-auto px-6 py-16" style={{ marginTop: "var(--section-gap)", marginBottom: "var(--section-gap)" }}>
      <div className="flex items-baseline justify-between mb-8 border-b border-rule pb-3">
        <h2 className="font-light text-ink tracking-tight" style={{ fontSize: "var(--text-section)" }}>
          Digital toolchain
        </h2>
        <span className="text-xs text-muted num">
          13 engineering instruments
        </span>
      </div>

      <div className="instrument-panel ticks p-4 sm:p-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {digitalToolchain.map((tool) => {
            const IconComponent = iconMap[tool.iconName] || SiReact;
            const isHovered = hoveredTool === tool.key;

            return (
              <div
                key={tool.key}
                onMouseEnter={() => setHoveredTool(tool.key)}
                onMouseLeave={() => setHoveredTool(null)}
                className="flex-1 flex flex-col items-center p-2 rounded transition-colors duration-150 hover:bg-paper-3 cursor-pointer group"
              >
                {/* Tech Icon */}
                <div
                  className="w-10 h-10 rounded flex items-center justify-center mb-2.5 transition-colors duration-150 border"
                  style={{
                    backgroundColor: isHovered ? "var(--color-paper)" : "var(--color-paper-3)",
                    borderColor: isHovered ? "var(--color-accent)" : "var(--color-rule)",
                  }}
                >
                  <IconComponent
                    className="w-5 h-5 transition-colors duration-150"
                    style={{ color: isHovered ? "var(--color-accent)" : "var(--color-ink-2)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Mini Sparkline Gauge */}
                <div className="w-full h-5 flex items-end gap-0.5 px-1 bg-paper/60 rounded-sm p-0.5 border border-rule/50">
                  {tool.gauge.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-none transition-transform duration-200"
                      style={{
                        height: "100%",
                        transform: `scaleY(${val / 100})`,
                        transformOrigin: "bottom",
                        backgroundColor: isHovered ? "var(--color-accent)" : "var(--color-rule-2)",
                      }}
                    />
                  ))}
                </div>

                {/* Tech Label */}
                <span className="text-xs text-muted mt-2 truncate group-hover:text-ink transition-colors duration-150">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
