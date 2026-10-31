import React, { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import CompassWidget from "../../components/blog/CompassWidget";
import { getPosts } from "../../helpers";
import { Search, Clock, ExternalLink } from "lucide-react";

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
        <title>Field Logs and Expedition Journal · Vishal Verma</title>
        <meta
          name="description"
          content="Dispatches on distributed reliability, cloud infrastructure, and backcountry trails."
        />
      </Head>

      <div className="min-h-screen bg-paper text-ink">
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* PAGE TITLE */}
          <div className="mb-8 border-b border-rule pb-4">
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-ink">
              Field logs and expedition journal
            </h1>
            <p className="text-muted mt-2 text-sm sm:text-base font-normal">
              Dispatches on resilient systems, cloud architecture, and backcountry exploration.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="mb-8 relative max-w-xl">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trail logs by title, tech stack, or tags"
              className="w-full pl-11 pr-4 py-2.5 rounded bg-paper-2 border border-rule text-ink placeholder-muted text-sm focus:outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-focus transition-colors duration-150"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MAIN COLUMN (Featured Log + List) */}
            <div className="lg:col-span-2 space-y-6">
              {/* FEATURED LOG CARD */}
              {featuredPost && (
                <article className="instrument-panel ticks p-6 group">
                  <div className="flex items-center justify-between text-xs text-muted num mb-3">
                    <span>{featuredPost.coordinates}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>

                  <span className="text-xs text-accent num mb-1 block">
                    Featured log #{featuredPost.logNumber}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-normal text-ink group-hover:text-accent transition-colors duration-150 mb-3">
                    {featuredPost.title}
                  </h2>

                  <p className="text-ink-2 text-xs sm:text-sm leading-relaxed mb-4">
                    {featuredPost.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-rule text-xs">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {(featuredPost.tags || []).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-paper-3 border border-rule text-ink-2 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/blog/${encodeURIComponent(featuredPost.slug)}`}
                      className="btn btn--sm btn--line"
                    >
                      <span>Read expedition file</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )}

              {/* LIST LOG CARDS */}
              <div className="space-y-4">
                {listPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    className="block group focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 rounded"
                  >
                    <article className="instrument-panel p-5 hover:border-rule-2 hover:bg-paper-3 transition-colors duration-150">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-xs text-muted num block">
                            Log #{post.logNumber} · {post.coordinates}
                          </span>
                          <h3 className="text-base font-normal text-ink group-hover:text-accent transition-colors duration-150 mt-1">
                            {post.title}
                          </h3>
                        </div>
                        <span className="text-xs text-muted num whitespace-nowrap ml-4">
                          {post.date}
                        </span>
                      </div>

                      <p className="text-xs text-ink-2 line-clamp-2 leading-relaxed mb-3">
                        {post.subtitle}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-rule num">
                        <div className="flex flex-wrap gap-1.5">
                          {(post.tags || []).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-paper border border-rule text-ink-2 text-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent" aria-hidden="true" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="instrument-panel p-8 text-center text-xs text-muted num">
                  No expedition logs matching search query.
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6">
              {/* TAGS & ARCHIVES */}
              <div className="instrument-panel p-5">
                <div className="flex items-center justify-between mb-4 border-b border-rule pb-2">
                  <h3 className="text-sm font-medium text-ink">
                    Trail tags and archives
                  </h3>
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="text-xs text-accent hover:underline focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      Clear filter
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(tagCounts).map(([tag, count]) => {
                    const isSelected = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(isSelected ? null : tag)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors duration-150 border focus-visible:outline-2 focus-visible:outline-focus ${
                          isSelected
                            ? "bg-accent text-accent-ink border-accent font-medium"
                            : "bg-paper border-rule text-ink-2 hover:border-rule-2 hover:text-ink"
                        }`}
                      >
                        {tag}{" "}
                        <span className="text-xs num opacity-80">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COMPASS WIDGET */}
              <CompassWidget />

              {/* TERRAIN SCANNER QUICK INFO */}
              <div className="instrument-panel p-5 num">
                <h3 className="text-sm font-medium text-ink mb-2">
                  Terrain telemetry
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-3">
                  Browse logs indexed by geographic coordinates, architecture tier, and elevation.
                </p>
                <div className="text-xs text-ink-2 flex items-center justify-between pt-2 border-t border-rule">
                  <span>Expeditions logged</span>
                  <span className="font-medium text-accent">{posts.length} files</span>
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
