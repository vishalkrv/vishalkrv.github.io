import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Compass, Sparkles } from "lucide-react";

export default function Navbar({ onOpenTrail }) {
  const router = useRouter();

  const isHome = router.pathname === "/";
  const isBlog = router.pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/95 border-b border-rule backdrop-blur-md px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-ink hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 rounded"
        >
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-base font-semibold tracking-tight text-ink group-hover:text-accent">
            Vishal Verma
          </span>
        </Link>

        {/* TELEMETRY COORDINATES */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-paper-2 border border-rule text-xs text-muted num">
          <Compass className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          <span>1.3521° N, 103.8198° E · Singapore</span>
        </div>

        {/* NAV LINKS */}
        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/"
            className={`transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 rounded px-1.5 py-0.5 ${
              isHome && !router.asPath.includes("#projects")
                ? "text-accent font-medium"
                : "text-ink-2"
            }`}
          >
            Home
          </Link>
          <a
            href={isHome ? "#projects" : "/#projects"}
            className="text-ink-2 hover:text-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 rounded px-1.5 py-0.5"
          >
            Projects
          </a>
          <Link
            href="/blog"
            className={`transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 rounded px-1.5 py-0.5 ${
              isBlog ? "text-accent font-medium" : "text-ink-2"
            }`}
          >
            Blog
          </Link>

          {onOpenTrail && (
            <button
              onClick={onOpenTrail}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-rule-2 text-ink hover:border-accent hover:text-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>Trail map</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
