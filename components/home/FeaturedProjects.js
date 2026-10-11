import React from "react";
import { ExternalLink, Activity, ShieldCheck, MapPin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { featuredProjects } from "../../data/projects";
import GlobeVisual from "./GlobeVisual";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-pink-400 uppercase">
            EXPLORATION ARCHIVES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Featured Expeditions <span className="text-cyan-400 font-mono text-xl">(Projects)</span>
          </h2>
        </div>
        <a
          href="https://github.com/vishalkrv"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
        >
          <span>View All on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="group glass-panel rounded-2xl p-6 border border-cyan-500/25 hover:border-cyan-400/60 shadow-hud-card transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Title & Link */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-space-850 transition"
                >
                  <SiGithub className="w-4 h-4" />
                </a>
              </div>

              {/* Visual Showcase */}
              <div className="mb-4">
                {project.wireframeType === "globe" ? (
                  <GlobeVisual />
                ) : (
                  <div className="w-full h-44 rounded-lg overflow-hidden relative bg-space-950/70 border border-slate-800 flex items-center justify-center p-3">
                    {/* SVG Futuristic Wireframe Simulation */}
                    <svg
                      className="w-full h-full text-cyan-500/80 group-hover:text-cyan-400 transition-colors"
                      viewBox="0 0 200 120"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M 10 90 Q 50 30 90 70 T 170 30 T 190 85"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <path
                        d="M 10 100 Q 60 50 110 80 T 190 60"
                        strokeWidth="1"
                        strokeOpacity="0.5"
                      />
                      <path
                        d="M 20 110 Q 70 70 120 90 T 190 75"
                        strokeWidth="1"
                        strokeOpacity="0.3"
                      />
                      <circle cx="90" cy="70" r="3" fill="#ff0080" />
                      <circle cx="170" cy="30" r="3" fill="#00f5ff" />
                    </svg>
                    <div className="absolute top-2 right-2 text-[9px] font-mono text-pink-400 bg-space-900/80 px-2 py-0.5 rounded border border-pink-500/30">
                      TELEMETRY READY
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            <div>
              {/* Telemetry Stats Box */}
              {project.stats && (
                <div className="bg-space-950/60 p-2.5 rounded-lg border border-slate-800 mb-4 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px]">Uptime / Sync:</span>
                  </div>
                  <span className="text-cyan-300 font-bold">
                    {project.stats.uptime || project.stats.sync || "99.99%"}
                  </span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-space-900 border border-slate-700/60 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
