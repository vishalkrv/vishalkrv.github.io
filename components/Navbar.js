import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Compass, Settings, Sun, Sparkles } from "lucide-react";

export default function Navbar({ onOpenTrail }) {
  const router = useRouter();

  const isHome = router.pathname === "/";
  const isBlog = router.pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-space-950/75 border-b border-cyan-500/20 px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(255,0,128,0.4)] group-hover:shadow-[0_0_20px_rgba(0,245,255,0.6)] transition-all">
            <span className="text-white font-mono font-bold text-sm">V</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Vishalkrv
          </span>
        </Link>

        {/* TELEMETRY COORDINATES (Hidden on small screens) */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-space-900/60 border border-slate-700/40 text-[11px] font-mono text-slate-400">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>1.3521° N, 103.8198° E (Singapore)</span>
        </div>

        {/* NAV LINKS */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-cyan-400 ${
              isHome && !router.asPath.includes("#projects")
                ? "text-cyan-400 font-semibold text-glow-cyan"
                : "text-slate-300"
            }`}
          >
            Home
          </Link>
          <a
            href={isHome ? "#projects" : "/#projects"}
            className="text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Projects
          </a>
          <Link
            href="/blog"
            className={`transition-colors hover:text-cyan-400 ${
              isBlog ? "text-cyan-400 font-semibold text-glow-cyan" : "text-slate-300"
            }`}
          >
            Blog
          </Link>

          {onOpenTrail && (
            <button
              onClick={onOpenTrail}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1 text-xs font-mono rounded-md border border-pink-500/40 text-pink-300 bg-pink-950/20 hover:bg-pink-900/40 hover:border-pink-400 transition-all shadow-[0_0_12px_rgba(255,0,128,0.25)]"
            >
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>Trail Map</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

