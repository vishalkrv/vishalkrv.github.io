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
  Maximize2,
  Minimize2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { careerTrail, certificationsList } from "../../data/trail";

// Client-only dynamic import of Three.js canvas to avoid SSR issues
const MountainScene = dynamic(() => import("./MountainScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050a14] text-cyan-400 font-mono text-sm">
      <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      CALIBRATING EXPEDITION TELEMETRY...
    </div>
  ),
});

export default function TrailMapOverlay({ isOpen, onClose }) {
  // Default to DBS Singapore (index 3) matching mockup
  const defaultIndex = careerTrail.findIndex((wp) => wp.id === "dbs-singapore");
  const [activeIndex, setActiveIndex] = useState(defaultIndex >= 0 ? defaultIndex : 3);
  const activeWaypoint = careerTrail[activeIndex] || careerTrail[3];

  // Collapsible panels state - starts collapsed matching mockup
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

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
        className="fixed inset-0 z-50 overflow-hidden bg-[#050a14] flex flex-col select-none"
      >
        {/* TOP HUD BAR */}
        <header className="relative z-30 flex items-center justify-between px-6 py-3 border-b border-cyan-500/20 bg-[#050a14]/85 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
              Vishalkrv
            </span>
            <span className="px-3 py-1 text-xs font-mono font-medium rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(0,245,255,0.25)]">
              EXPLORATION MODE: ON
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center text-xs font-mono text-slate-300 bg-space-900/80 px-3 py-1.5 rounded border border-slate-700/50">
              <Compass className="w-3.5 h-3.5 text-cyan-400 mr-1.5 animate-spin-slow" />
              {activeWaypoint.coordinates}
            </span>
            <button
              onClick={onClose}
              className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-mono font-semibold rounded-md border border-pink-500/50 text-pink-300 bg-pink-950/30 hover:bg-pink-900/50 hover:border-pink-400 transition-all shadow-[0_0_15px_rgba(255,0,128,0.25)]"
            >
              <span>Exit Trail Map</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 3D CANVAS BACKGROUND (FIXED COMPOSED VIEW MATCHING MOCKUP) */}
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
              className="glass-panel px-3.5 py-2 rounded-xl border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-hud-card hover:bg-cyan-950/70 flex items-center space-x-2 transition"
              title="Expand Trail Progress & Certifications"
            >
              <Activity className="w-3.5 h-3.5 text-pink-400" />
              <span>Trail Progress ({careerTrail.length})</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel rounded-2xl p-4 shadow-hud-card border border-cyan-500/35 w-80 max-h-[calc(100vh-140px)] flex flex-col"
            >
              {/* Header & Tabs */}
              <div className="flex items-center justify-between mb-3 border-b border-cyan-500/20 pb-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSidebarTab("waypoints")}
                    className={`text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded transition ${
                      sidebarTab === "waypoints"
                        ? "bg-cyan-950 border border-cyan-400 text-cyan-300"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Waypoints ({careerTrail.length})
                  </button>
                  <button
                    onClick={() => setSidebarTab("certifications")}
                    className={`text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded flex items-center space-x-1 transition ${
                      sidebarTab === "certifications"
                        ? "bg-cyan-950 border border-cyan-400 text-cyan-300"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>Certs ({certificationsList.length})</span>
                  </button>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-space-850 transition"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Waypoints Tab */}
              {sidebarTab === "waypoints" ? (
                <div className="space-y-2 overflow-y-auto pr-1 flex-1">
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
                        className={`w-full text-left p-2.5 rounded-lg font-mono transition-all flex items-start space-x-2.5 border ${
                          isSelected
                            ? "bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                            : "bg-space-900/40 border-transparent hover:border-cyan-500/30 hover:bg-space-850/60"
                        }`}
                      >
                        <div className="mt-1">
                          <div
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              isSelected
                                ? "bg-cyan-400 ring-4 ring-cyan-400/25"
                                : isPast
                                ? "bg-pink-500"
                                : "bg-slate-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-cyan-400 font-semibold">
                              ▲ {wp.elevation}
                            </span>
                            {wp.certifications && (
                              <Award className="w-3 h-3 text-amber-400 ml-1" />
                            )}
                          </div>
                          <p className="text-xs text-slate-200 truncate mt-0.5 font-sans font-medium">
                            {wp.role}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
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
                      className="p-2.5 rounded-lg font-mono bg-space-900/60 border border-slate-700/50 hover:border-cyan-500/40 transition"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs text-white font-sans font-semibold leading-snug">
                          {cert.name}
                        </span>
                        <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 ml-1.5" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                        <span className="text-cyan-300 font-semibold">{cert.issuer}</span>
                        <span>{cert.date}</span>
                      </div>
                      {cert.credentialId && (
                        <div className="text-[9px] text-slate-500 mt-1 truncate">
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
              className="glass-panel rounded-2xl p-4 shadow-hud-card border border-cyan-400/30 text-slate-100 max-h-[calc(100vh-140px)] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-cyan-500/20 pb-2 mb-2.5">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-pink-400 font-bold block">
                    {activeWaypoint.tagline || `WAYPOINT ${activeWaypoint.waypointNumber}`}
                  </span>
                  <h2 className="text-sm font-bold text-white mt-0.5">
                    {activeWaypoint.role}
                  </h2>
                  <span className="text-xs text-cyan-300 font-medium">
                    {activeWaypoint.company} • {activeWaypoint.period}
                  </span>
                </div>
                <button
                  onClick={() => setIsCardOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-space-850 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-space-900/80 p-2 rounded-lg border border-slate-700/40 font-mono text-xs mb-2.5 space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-[10px] text-slate-400">RELIABILITY:</span>
                  <span className="text-cyan-300 font-bold">{activeWaypoint.metrics?.reliability || "99.99%"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-slate-400">ELEVATION:</span>
                  <span className="text-pink-400 font-bold">{activeWaypoint.elevation}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2.5 leading-relaxed">
                {activeWaypoint.summary}
              </p>

              {/* Accreditations & Badges if waypoint has certifications */}
              {activeWaypoint.certifications && (
                <div className="mb-3 pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-amber-400 flex items-center mb-1.5 font-bold">
                    <Award className="w-3 h-3 mr-1" />
                    ACCREDITATIONS & BADGES:
                  </span>
                  <div className="space-y-1">
                    {activeWaypoint.certifications.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-2 py-1 rounded bg-space-950/80 border border-slate-800 text-[10px] font-mono"
                      >
                        <span className="text-slate-200 truncate">{c.name}</span>
                        <span className="text-cyan-300 text-[9px] ml-1 flex-shrink-0">
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
                        className="px-2 py-0.5 text-[9px] font-mono rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    onClose();
                    window.location.hash = "#projects";
                  }}
                  className="w-full py-1.5 px-3 text-xs font-mono font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-[0_0_12px_rgba(255,0,128,0.25)] transition flex items-center justify-center space-x-1.5"
                >
                  <span>View Related Expeditions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* BOTTOM-CENTER: CLEAN SINGLE SCROLL TO CLIMB BUTTON */}
        <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none">
          <div className="pointer-events-auto flex items-center space-x-2">
            <button
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className="p-2.5 rounded-xl glass-panel text-cyan-400 hover:bg-cyan-950/60 disabled:opacity-30 border border-cyan-500/30 transition shadow-hud-card"
              title="Descend trail (Arrow Down)"
              aria-label="Descend trail"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveIndex((prev) => Math.min(careerTrail.length - 1, prev + 1))}
              disabled={activeIndex === careerTrail.length - 1}
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase bg-cyan-950/85 border border-cyan-400 text-cyan-300 hover:bg-cyan-900/70 shadow-[0_0_18px_rgba(0,245,255,0.35)] flex items-center space-x-2 transition disabled:opacity-40"
              title="Climb trail (Arrow Up)"
              aria-label="Climb trail"
            >
              <span>{activeIndex === careerTrail.length - 1 ? "Summit Reached" : "Scroll to climb the trail"}</span>
              <ChevronUp className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>

        {/* BOTTOM-RIGHT: COMPASS WIDGET ONLY */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center pointer-events-none">
          <div className="pointer-events-auto glass-panel px-3.5 py-2 rounded-2xl flex items-center space-x-2.5 border border-cyan-400/35 shadow-hud-card">
            <div className="w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center relative bg-space-950/90 shadow-[0_0_10px_rgba(0,245,255,0.2)]">
              <span className="absolute top-0.5 text-[7px] font-mono text-pink-400 font-bold">N</span>
              <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            </div>
            <div className="text-[10px] font-mono">
              <span className="text-cyan-300 font-bold block">BEARING 042°</span>
              <span className="text-slate-400">{activeWaypoint.elevation}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
