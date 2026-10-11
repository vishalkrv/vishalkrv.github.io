import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import HeroTerrain from "../components/home/HeroTerrain";
import ToolchainGauge from "../components/home/ToolchainGauge";
import FeaturedProjects from "../components/home/FeaturedProjects";
import TrailMapOverlay from "../components/trail/TrailMapOverlay";
import { Compass, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function Home() {
  const [isTrailOpen, setIsTrailOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Vishal | Full Stack & Senior SRE</title>
        <meta
          name="description"
          content="A self-motivated Full Stack Professional & Senior SRE at DBS Singapore — mapping robust code by day, exploring wild trails by night."
        />
        <meta property="og:title" content="Vishal | Full Stack Professional & Senior SRE" />
        <meta
          property="og:description"
          content="A self-motivated Full Stack Professional & Senior SRE at DBS Singapore"
        />
        <meta property="og:image" content="/og_image.png" />
      </Head>

      <div className="min-h-screen bg-space-950 text-slate-100 relative selection:bg-cyan-500 selection:text-black">
        {/* TOP NAVBAR */}
        <Navbar onOpenTrail={() => setIsTrailOpen(true)} />

        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          {/* Animated 3D/Canvas Neon Mountain Horizon */}
          <HeroTerrain />

          {/* Coordinates Header Tag */}
          <div className="relative z-10 mb-4 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-space-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.2)]">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>1.3521° N, 103.8198° E (Singapore)</span>
          </div>

          {/* Hero Heading */}
          <h1 className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-white">
            Hello, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400 text-glow-pink">
              Vishal
            </span>
          </h1>

          {/* Subtitle */}
          <p className="relative z-10 max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8">
            A self-motivated{" "}
            <span className="text-cyan-300 font-semibold">Full Stack Professional</span> &{" "}
            <span className="text-cyan-300 font-semibold">Senior SRE at DBS Singapore</span> —
            mapping robust code by day, exploring wild trails by night.
          </p>

          {/* Call to Actions */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsTrailOpen(true)}
              className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 border border-pink-400/50 shadow-[0_0_20px_rgba(255,0,128,0.4)] hover:shadow-[0_0_30px_rgba(255,0,128,0.6)] transition-all flex items-center space-x-2.5 group"
            >
              <Sparkles className="w-4 h-4 text-pink-300 group-hover:rotate-12 transition-transform" />
              <span>Explore My Trail</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://github.com/vishalkrv"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold text-slate-300 hover:text-white glass-panel hover:bg-space-850 border border-slate-700/60 transition-all flex items-center space-x-2"
            >
              <SiGithub className="w-4 h-4" />
              <span>View Github</span>
            </a>
          </div>
        </section>

        {/* DIGITAL TOOLCHAIN SECTION */}
        <ToolchainGauge />

        {/* FEATURED EXPEDITIONS (PROJECTS) */}
        <FeaturedProjects />

        {/* FOOTER */}
        <footer className="border-t border-cyan-500/20 bg-space-950/90 py-8 px-6 text-center text-xs font-mono text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-cyan-400">●</span>
              <span>All Systems Operational • Elevation 4,800m</span>
            </div>
            <div>
              <span>Designed & Built by Vishal • © {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>

        {/* FULLSCREEN 3D TRAIL MAP OVERLAY */}
        <TrailMapOverlay
          isOpen={isTrailOpen}
          onClose={() => setIsTrailOpen(false)}
        />
      </div>
    </>
  );
}
