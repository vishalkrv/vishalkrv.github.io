import React from "react";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Navbar from "../../components/Navbar";
import ShareBtns from "../../components/share";
import { getPostBySlug, getPosts } from "../../helpers";
import { ArrowLeft, Clock, Calendar, User, Compass } from "lucide-react";

// Clean Minimalist Markdown Components
const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4 border-b border-slate-800 pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mt-8 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-slate-300 text-base leading-relaxed my-4">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/40"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-cyan-500 pl-4 py-1 my-4 bg-space-900/40 text-slate-300 italic">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 my-4 text-slate-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 my-4 text-slate-300">
      {children}
    </ol>
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");
    if (match) {
      return (
        <div className="my-6 rounded-xl overflow-hidden border border-slate-800 shadow-lg">
          <div className="bg-space-900 px-4 py-1.5 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>{match[1].toUpperCase()}</span>
          </div>
          <SyntaxHighlighter
            language={match[1]}
            style={okaidia}
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{ margin: 0, padding: "1rem", background: "#0c0621" }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-space-900 text-pink-400 font-mono text-sm border border-slate-800"
        {...props}
      >
        {children}
      </code>
    );
  },
  hr: () => <hr className="my-8 border-slate-800" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 border border-slate-800 rounded-lg">
      <table className="w-full text-left text-sm text-slate-300">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-space-900 px-4 py-2 border-b border-slate-800 font-semibold text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border-b border-slate-800/60">{children}</td>
  ),
};

export default function BlogPost({
  title,
  subtitle,
  content,
  author,
  readTime,
  date,
  slug,
  tags = [],
  coordinates = "1.3521° N, 103.8198° E",
  logNumber = 14,
}) {
  const authorName = typeof author === "object" ? author?.name || "Vishal" : author || "Vishal";
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

  return (
    <>
      <Head>
        <title>{title} | Vishalkrv Field Logs</title>
        <meta name="description" content={subtitle || title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={subtitle || title} />
      </Head>

      <div className="min-h-screen bg-space-950 text-slate-100 selection:bg-cyan-500 selection:text-black">
        <Navbar />

        <main className="max-w-3xl mx-auto px-6 py-10">
          {/* BACK LINK */}
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Field Logs</span>
          </Link>

          {/* ARTICLE HEADER (Clean Minimalist Reader) */}
          <header className="mb-10 pb-8 border-b border-slate-800">
            {/* Log Telemetry Tag */}
            <div className="flex items-center space-x-2 font-mono text-xs text-pink-400 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>LOG #{logNumber} • {coordinates}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              {title}
            </h1>

            {subtitle && (
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6 font-normal">
                {subtitle}
              </p>
            )}

            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 pt-4 border-t border-slate-800/60">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300">{authorName}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-pink-400" />
                  <span>{readTime}</span>
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-space-900 border border-slate-800 text-cyan-400 text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* ARTICLE BODY */}
          <article className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={markdownComponents}
              remarkPlugins={[gfm]}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* FOOTER SHARE */}
          <footer className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400">
              Share this expedition log:
            </span>
            <ShareBtns
              title={title}
              link={`https://vishalkrv.github.io/blog/${slugPath}`}
            />
          </footer>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const postData = getPostBySlug(params.slug);
  return {
    props: postData,
  };
}

export async function getStaticPaths() {
  const data = getPosts();
  const paths = data.map(({ slug }) => ({
    params: {
      slug: [slug],
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
