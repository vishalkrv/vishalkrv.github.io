import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Award,
  Activity,
} from "lucide-react";
import { careerTrail, certificationsList } from "../../data/trail";

// Client-only dynamic import of Three.js canvas to avoid SSR issues
const MountainScene = dynamic(() => import("./MountainScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-paper text-accent text-sm num">
      <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
      <span>Calibrating expedition telemetry</span>
    </div>
  ),
});

export default function TrailMapOverlay({ isOpen, onClose }) {
  // Default to DBS Singapore (index 3) matching career focus
  const defaultIndex = careerTrail.findIndex((wp) => wp.id === "dbs-singapore");
  const [activeIndex, setActiveIndex] = useState(defaultIndex >= 0 ? defaultIndex : 3);
  const activeWaypoint = careerTrail[activeIndex] || careerTrail[3];

  // Collapsible panels state - card open by default for rich telemetry
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(true);

  // Sidebar tab: "waypoints" or "certifications"
  const [sidebarTab, setSidebarTab] = useState("waypoints");

  // Keyboard and wheel navigation for climbing trail
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      // UP / RIGHT -> Climb UP towards Summit
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        setActiveIndex((prev) => Math.min(careerTrail.length - 1, prev + 1));
      }
      // DOWN / LEFT -> Descend DOWN towards Base Camp
      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    };

    let lastWheelTime = 0;
    const handleWheel = (e) => {
      // Don't intercept scroll if user is scrolling inside a scrollable sidebar/modal list
      if (e.target && e.target.closest && e.target.closest(".overflow-y-auto")) {
        return;
      }
      const now = Date.now();
      if (now - lastWheelTime < 320) return;
      if (Math.abs(e.deltaY) < 18) return;

      if (e.deltaY < 0) {
        // Scrolled UP -> Climb UP towards Summit
        setActiveIndex((prev) => Math.min(careerTrail.length - 1, prev + 1));
        lastWheelTime = now;
      } else if (e.deltaY > 0) {
        // Scrolled DOWN -> Descend DOWN towards Base Camp
        setActiveIndex((prev) => Math.max(0, prev - 1));
        lastWheelTime = now;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden bg-paper flex flex-col select-none"
      >
        {/* TOP TELEMETRY BAR */}
        <header className="relative z-30 flex items-center justify-between px-6 py-3 border-b border-rule bg-paper/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold tracking-tight text-ink flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
              <span>Vishal Verma</span>
            </span>
            <span className="badge-lime text-xs">
              Reality capture · Active survey
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted num bg-paper-2 px-3 py-1.5 rounded border border-rule">
              <Compass className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>Datum WGS84 · {activeWaypoint.coordinates}</span>
            </span>
            <button
              onClick={onClose}
              className="btn btn--sm btn--line"
            >
              <span>Close trail map</span>
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* 3D CANVAS BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <MountainScene
            activeWaypointIndex={activeIndex}
            onSelectWaypoint={(idx) => {
              setActiveIndex(idx);
              setIsCardOpen(true);
            }}
          />
        </div>

        {/* TOP-LEFT: COLLAPSIBLE TRAIL PROGRESS BUTTON / DRAWER */}
        <div className="absolute left-6 top-16 z-20">
          {!isSidebarOpen ? (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="instrument-panel px-3.5 py-2 text-ink text-xs hover:bg-paper-3 inline-flex items-center gap-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              title="Expand trail progress and certifications"
            >
              <Activity className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>Trail progress ({careerTrail.length})</span>
              <Award className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
              <ChevronRight className="w-3.5 h-3.5 text-ink-2" aria-hidden="true" />
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="instrument-panel p-4 w-80 max-h-[calc(100vh-140px)] flex flex-col shadow-2xl"
            >
              {/* Header & Tabs */}
              <div className="flex items-center justify-between mb-3 border-b border-rule pb-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSidebarTab("waypoints")}
                    className={`text-xs font-medium px-2.5 py-1 rounded transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
                      sidebarTab === "waypoints"
                        ? "bg-paper-3 border border-rule-2 text-accent"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    Waypoints ({careerTrail.length})
                  </button>
                  <button
                    onClick={() => setSidebarTab("certifications")}
                    className={`text-xs font-medium px-2.5 py-1 rounded inline-flex items-center gap-1 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
                      sidebarTab === "certifications"
                        ? "bg-paper-3 border border-rule-2 text-accent"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    <Award className="w-3 h-3 text-muted" aria-hidden="true" />
                    <span>Certs ({certificationsList.length})</span>
                  </button>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded text-muted hover:text-ink hover:bg-paper-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Waypoints Tab */}
              {sidebarTab === "waypoints" ? (
                <div className="space-y-1.5 overflow-y-auto pr-1 flex-1">
                  {careerTrail.map((wp, idx) => {
                    const isSelected = activeIndex === idx;
                    const isPast = idx < activeIndex;
                    return (
                      <button
                        key={wp.id}
                        onClick={() => {
                          setActiveIndex(idx);
                          setIsCardOpen(true);
                        }}
                        className={`w-full text-left p-2.5 rounded transition-colors duration-150 flex items-start gap-2.5 border focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${
                          isSelected
                            ? "bg-paper-3 border-accent"
                            : "bg-paper/40 border-transparent hover:border-rule hover:bg-paper-3"
                        }`}
                      >
                        <div className="mt-1">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${
                              isSelected
                                ? "bg-accent"
                                : isPast
                                ? "bg-accent/60"
                                : "bg-muted/40"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-accent num">
                              ▲ {wp.elevation}
                            </span>
                            {wp.certifications && (
                              <Award className="w-3 h-3 text-muted ml-1" aria-hidden="true" />
                            )}
                          </div>
                          <p className="text-xs text-ink truncate mt-0.5 font-medium">
                            {wp.role}
                          </p>
                          <p className="text-xs text-muted truncate">
                            {wp.company}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Certifications Tab */
                <div className="space-y-2 overflow-y-auto pr-1 flex-1">
                  {certificationsList.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-paper/60 border border-rule hover:border-rule-2 transition-colors duration-150"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs text-ink font-medium leading-snug">
                          {cert.name}
                        </span>
                        <Award className="w-3.5 h-3.5 text-muted flex-shrink-0 ml-1.5" aria-hidden="true" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted mt-1">
                        <span className="text-ink-2 font-medium">{cert.issuer}</span>
                        <span className="num">{cert.date}</span>
                      </div>
                      {cert.credentialId && (
                        <div className="text-xs text-muted/70 mt-1 truncate num">
                          ID: {cert.credentialId}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* TOP-RIGHT: WAYPOINT TELEMETRY POPUP CARD */}
        {isCardOpen && (
          <div className="absolute right-6 top-16 z-20 max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="instrument-panel p-4 text-ink max-h-[calc(100vh-140px)] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-rule pb-2 mb-2.5">
                <div>
                  <span className="text-xs text-accent num block font-mono">
                    {activeWaypoint.tagline || `Waypoint ${activeWaypoint.waypointNumber}`}
                  </span>
                  <h2 className="text-sm font-semibold text-ink mt-0.5">
                    {activeWaypoint.role}
                  </h2>
                  <span className="text-xs text-ink-2">
                    {activeWaypoint.company} · {activeWaypoint.period}
                  </span>
                </div>
                <button
                  onClick={() => setIsCardOpen(false)}
                  className="p-1 rounded text-muted hover:text-ink hover:bg-paper-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ml-2"
                  aria-label="Close telemetry card"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="bg-paper p-2.5 rounded border border-rule text-xs mb-2.5 space-y-1 num">
                <div className="flex justify-between">
                  <span className="text-muted">Reliability:</span>
                  <span className="text-ink font-medium">{activeWaypoint.metrics?.reliability || "99.99%"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Elevation:</span>
                  <span className="text-accent font-medium">{activeWaypoint.elevation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Coordinates:</span>
                  <span className="text-ink-2 font-mono">{activeWaypoint.coordinates}</span>
                </div>
              </div>

              <p className="text-xs text-ink-2 mb-2.5 leading-relaxed">
                {activeWaypoint.summary}
              </p>

              {/* Accreditations & Badges */}
              {activeWaypoint.certifications && (
                <div className="mb-3 pt-2 border-t border-rule">
                  <span className="text-xs text-muted flex items-center mb-1.5 font-medium">
                    <Award className="w-3 h-3 mr-1 text-muted" aria-hidden="true" />
                    Accreditations and badges:
                  </span>
                  <div className="space-y-1">
                    {activeWaypoint.certifications.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-2 py-1 rounded bg-paper border border-rule text-xs num"
                      >
                        <span className="text-ink truncate">{c.name}</span>
                        <span className="text-muted text-xs ml-1 flex-shrink-0">
                          {c.issuer}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipment badges */}
              {activeWaypoint.equipment && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {activeWaypoint.equipment.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs rounded bg-paper-3 border border-rule text-ink-2 font-mono text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 border-t border-rule">
                <button
                  onClick={() => {
                    onClose();
                    window.location.hash = "#projects";
                  }}
                  className="w-full btn btn--sm btn--line"
                >
                  <span>View related expeditions</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* BOTTOM-CENTER: CLIMB / DESCEND CONTROLS */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 instrument-panel p-1.5 rounded-full shadow-2xl">
            <button
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className="p-2 rounded-full text-ink hover:text-accent disabled:cursor-not-allowed disabled:text-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              title="Descend trail (Arrow Down)"
              aria-label="Descend trail"
            >
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="px-3 py-1 text-xs num flex items-center gap-2">
              <span className="text-accent font-medium">Station {String(activeIndex + 1).padStart(2, "0")} / 06</span>
              <span className="text-muted hidden sm:inline">·</span>
              <span className="text-ink font-medium hidden sm:inline">{activeWaypoint.company}</span>
              <span className="text-muted">({activeWaypoint.elevation})</span>
            </div>

            <button
              onClick={() => setActiveIndex((prev) => Math.min(careerTrail.length - 1, prev + 1))}
              disabled={activeIndex === careerTrail.length - 1}
              className="px-4 py-1.5 rounded-full bg-accent text-accent-ink hover:bg-accent-hi text-xs font-medium inline-flex items-center gap-1.5 transition-colors duration-150 disabled:cursor-not-allowed disabled:bg-paper-3 disabled:text-muted focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              title="Climb trail (Arrow Up)"
              aria-label="Climb trail"
            >
              <span>{activeIndex === careerTrail.length - 1 ? "Summit reached" : "Climb"}</span>
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* BOTTOM-RIGHT: COMPASS WIDGET */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center pointer-events-none">
          <div className="pointer-events-auto instrument-panel px-3.5 py-2 flex items-center gap-2.5 num text-xs shadow-xl">
            <div className="w-7 h-7 rounded-full border border-rule flex items-center justify-center relative bg-paper">
              <Compass className="w-4 h-4 text-accent" aria-hidden="true" />
            </div>
            <div>
              <span className="text-ink font-medium block">Bearing 042°</span>
              <span className="text-muted">{activeWaypoint.elevation}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
