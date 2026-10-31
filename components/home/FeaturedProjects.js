import React from "react";
import { ExternalLink, Activity } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { featuredProjects } from "../../data/projects";
import GlobeVisual from "./GlobeVisual";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 scroll-mt-20" style={{ paddingBottom: "var(--section-gap)" }}>
      <div className="flex items-baseline justify-between mb-8 border-b border-rule pb-3">
        <div>
          <h2 className="font-light text-ink tracking-tight" style={{ fontSize: "var(--text-section)" }}>
            Featured expeditions
          </h2>
          <p className="text-xs text-muted mt-1">
            Production reliability frameworks and spatial route mapping
          </p>
        </div>
        <a
          href="https://github.com/vishalkrv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-ink-2 hover:text-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 rounded"
        >
          <span>All repositories</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <article
            key={project.id}
            className="instrument-panel ticks p-5 flex flex-col justify-between"
          >
            <div>
              {/* Card Title & Link */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-medium text-ink">
                  {project.title}
                </h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  className="p-1.5 rounded text-muted hover:text-ink hover:bg-paper-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
                >
                  <SiGithub className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              {/* Visual Showcase */}
              <div className="mb-4">
                {project.wireframeType === "globe" ? (
                  <GlobeVisual />
                ) : project.id === "sre-infrastructure" ? (
                  <div className="w-full h-44 rounded overflow-hidden relative bg-paper border border-rule flex flex-col justify-between p-3.5 text-xs num">
                    {/* SRE Reliability Node Architecture Diagram */}
                    <div className="flex items-center justify-between text-muted border-b border-rule/50 pb-1.5">
                      <span className="text-accent font-medium">Cluster mesh active</span>
                      <span>Latency &lt; 12 ms</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 my-auto text-center">
                      <div className="p-2 rounded bg-paper-2 border border-rule">
                        <span className="text-muted block text-[11px]">Primary</span>
                        <span className="text-ink font-medium">Active</span>
                      </div>
                      <div className="p-2 rounded bg-paper-2 border border-accent">
                        <span className="text-muted block text-[11px]">Canary</span>
                        <span className="text-accent font-medium">0.05%</span>
                      </div>
                      <div className="p-2 rounded bg-paper-2 border border-rule">
                        <span className="text-muted block text-[11px]">Standby</span>
                        <span className="text-ink font-medium">Sync</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-muted border-t border-rule/50 pt-1.5">
                      <span>Multi-region failover</span>
                      <span className="text-accent font-medium">Sub-second</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-44 rounded overflow-hidden relative bg-paper border border-rule flex flex-col justify-between p-3.5 text-xs num">
                    {/* Terrain Elevation Contour Diagram */}
                    <div className="flex items-center justify-between text-muted border-b border-rule/50 pb-1.5">
                      <span className="text-accent font-medium">Backcountry mesh</span>
                      <span>Interval 20 m</span>
                    </div>

                    <div className="space-y-1.5 my-auto">
                      <div className="flex items-center justify-between text-muted">
                        <span>Base Camp</span>
                        <span className="text-ink">1,240 m</span>
                      </div>
                      <div className="flex items-center justify-between text-muted">
                        <span>High Col Pass</span>
                        <span className="text-ink">3,620 m</span>
                      </div>
                      <div className="flex items-center justify-between text-accent font-medium">
                        <span>Surveyed Peak</span>
                        <span>4,800 m</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-muted border-t border-rule/50 pt-1.5">
                      <span>GPS route sync</span>
                      <span className="text-ink font-medium">High res</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-ink-2 leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            <div>
              {/* Telemetry Stats Box */}
              {project.stats && (
                <div className="bg-paper p-2.5 rounded border border-rule mb-4 flex items-center justify-between text-xs num">
                  <div className="flex items-center gap-1.5 text-muted">
                    <Activity className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    <span>Uptime / sync:</span>
                  </div>
                  <span className="text-ink font-medium">
                    {project.stats.uptime || project.stats.sync || "99.99%"}
                  </span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-rule">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs rounded bg-paper-3 border border-rule text-ink-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
