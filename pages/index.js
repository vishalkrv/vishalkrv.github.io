import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import HeroTerrain from "../components/home/HeroTerrain";
import ToolchainGauge from "../components/home/ToolchainGauge";
import FeaturedProjects from "../components/home/FeaturedProjects";
import TrailMapOverlay from "../components/trail/TrailMapOverlay";
import { Compass, Sparkles, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function Home() {
  const [isTrailOpen, setIsTrailOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Vishal Verma · Senior SRE and Full Stack Engineer</title>
        <meta
          name="description"
          content="Senior SRE at DBS Singapore scaling resilient distributed infrastructure by day, mapping wilderness trails by night."
        />
        <meta property="og:title" content="Vishal Verma · Senior SRE and Full Stack Engineer" />
        <meta
          property="og:description"
          content="Senior SRE at DBS Singapore scaling resilient distributed infrastructure by day, mapping wilderness trails by night."
        />
        <meta property="og:image" content="/og_image.png" />
      </Head>

      <div className="min-h-screen bg-paper text-ink relative">
        {/* TOP NAVBAR */}
        <Navbar onOpenTrail={() => setIsTrailOpen(true)} />

        {/* HERO SECTION */}
        <section className="relative min-h-[85dvh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
          {/* Lidar elevation point cloud scan background */}
          <HeroTerrain />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Coordinates Header Tag */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-paper-2 border border-rule text-xs text-muted num">
              <Compass className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>1.3521° N, 103.8198° E · Singapore</span>
            </div>

            {/* Hero Heading (7 words or fewer) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight mb-4 text-ink">
              Vishal Verma
            </h1>

            {/* Subtitle (12 words or fewer) */}
            <p className="max-w-xl text-base sm:text-lg text-ink-2 font-normal leading-relaxed mb-8">
              Senior SRE at DBS Singapore scaling resilient infrastructure and wilderness trails.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsTrailOpen(true)}
                className="btn"
              >
                <Sparkles className="w-4 h-4 text-accent-ink" aria-hidden="true" />
                <span>Explore trail map</span>
                <ArrowRight className="w-4 h-4 text-accent-ink" aria-hidden="true" />
              </button>

              <a
                href="https://github.com/vishalkrv"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--line"
              >
                <SiGithub className="w-4 h-4" aria-hidden="true" />
                <span>View GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* DIGITAL TOOLCHAIN SECTION */}
        <ToolchainGauge />

        {/* FEATURED EXPEDITIONS (PROJECTS) */}
        <FeaturedProjects />

        {/* COLOPHON & FOOTER */}
        <footer className="border-t border-rule bg-paper py-8 px-6 text-xs text-muted num">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="badge-lime text-xs">All systems operational</span>
              <span>Elevation 4,800 m</span>
              <span>1.3521° N, 103.8198° E</span>
            </div>
            <div>
              <span>Designed and built by Vishal Verma · © {new Date().getFullYear()}</span>
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
