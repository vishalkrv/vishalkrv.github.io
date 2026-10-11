import React, { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import CompassWidget from "../../components/blog/CompassWidget";
import { getPosts } from "../../helpers";
import { Search, Clock, ExternalLink, Tag, MapPin, Mountain } from "lucide-react";

export default function BlogIndex({ posts = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  // Calculate tag counts
  const tagCounts = useMemo(() => {
    const counts = {};
    posts.forEach((post) => {
      (post.tags || []).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return counts;
  }, [posts]);

  // Filtered posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || (post.tags || []).includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Featured post is the first one or marked featured
  const featuredPost = filteredPosts[0] || posts[0];
  const listPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <>
      <Head>
        <title>Field Logs & Expedition Journal | Vishalkrv</title>
        <meta
          name="description"
          content="Tales of robust code, wild summits, and AI-driven exploration."
        />
      </Head>

      <div className="min-h-screen bg-space-950 text-slate-100 selection:bg-cyan-500 selection:text-black">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* PAGE TITLE */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 text-glow-pink">
              FIELD LOGS & EXPEDITION JOURNAL
            </h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base font-normal">
              Tales of robust code, wild summits, and AI-driven exploration.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="mb-8 relative max-w-xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trail logs by title, tech stack, or tags..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-space-900/80 border border-cyan-500/30 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,245,255,0.25)] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MAIN COLUMN (Featured Log + List) */}
            <div className="lg:col-span-2 space-y-8">
              {/* FEATURED LOG CARD */}
              {featuredPost && (
                <div className="glass-panel rounded-2xl overflow-hidden border border-pink-500/30 hover:border-pink-400/60 transition-all shadow-hud-card group">
                  {/* Visual Header */}
                  <div className="h-56 sm:h-72 w-full relative bg-space-900 overflow-hidden flex items-end p-6">
                    {/* Synthwave/Mountain Background Graphic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/60 to-transparent z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-space-950/80 to-space-950" />

                    {/* Coordinates & Read Time Badges */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between font-mono text-xs">
                      <span className="px-2.5 py-1 rounded bg-space-950/80 border border-slate-700 text-slate-300">
                        {featuredPost.coordinates}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-pink-950/80 border border-pink-500/40 text-pink-300 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    {/* Featured Tag and Title */}
                    <div className="relative z-20 w-full">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-pink-400 mb-1 block">
                        FEATURED EXPEDITION LOG #{featuredPost.logNumber}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {featuredPost.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {featuredPost.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {(featuredPost.tags || []).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-space-900 border border-cyan-500/30 text-cyan-300 text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/blog/${encodeURIComponent(featuredPost.slug)}`}
                        className="px-4 py-2 rounded-lg bg-pink-950/40 border border-pink-500/40 text-pink-300 hover:bg-pink-900/60 hover:text-white transition-all flex items-center space-x-1.5 shadow-[0_0_12px_rgba(255,0,128,0.2)]"
                      >
                        <span>Read Expedition File</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* LIST LOG CARDS */}
              <div className="space-y-4">
                {listPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    className="block group"
                  >
                    <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-space-900/70 transition-all shadow-hud-card">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-pink-400 block">
                            LOG #{post.logNumber} • {post.coordinates}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                            {post.title}
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap ml-4">
                          {post.date}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                        {post.subtitle}
                      </p>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800/80">
                        <div className="flex flex-wrap gap-1.5">
                          {(post.tags || []).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-space-950 border border-slate-700/60 text-cyan-400 text-[10px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-1 text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="glass-panel rounded-xl p-8 text-center font-mono text-sm text-slate-400 border border-slate-800">
                  NO EXPEDITION LOGS MATCHING SEARCH QUERY.
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              {/* TAGS & ARCHIVES */}
              <div className="glass-panel rounded-2xl p-5 border border-cyan-500/25 shadow-hud-card">
                <div className="flex items-center justify-between mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                    TRAIL TAGS & ARCHIVES
                  </span>
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="text-[10px] font-mono text-pink-400 hover:underline"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(tagCounts).map(([tag, count]) => {
                    const isSelected = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(isSelected ? null : tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
                          isSelected
                            ? "bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.3)]"
                            : "bg-space-900/60 border-slate-700/60 text-slate-300 hover:border-cyan-500/40"
                        }`}
                      >
                        {tag}{" "}
                        <span className="text-[10px] text-pink-400 font-bold ml-1">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COMPASS WIDGET */}
              <CompassWidget />

              {/* TERRAIN SCANNER QUICK LINKS */}
              <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 shadow-hud-card font-mono">
                <span className="text-xs font-bold tracking-widest text-pink-400 uppercase block mb-2">
                  TERRAIN SCANNER
                </span>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Browse archive logs by expedition coordinates, system architecture, and date.
                </p>
                <div className="text-[11px] text-cyan-400 flex items-center justify-between pt-2 border-t border-slate-800">
                  <span>EXPEDITIONS LOGGED</span>
                  <span className="font-bold">{posts.length} FILES</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
}
