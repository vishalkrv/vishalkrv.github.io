import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { getPosts, getPostBySlug } from "../../helpers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Calendar, Clock, ArrowLeft, Compass, User } from "lucide-react";
import ShareButtons from "../../components/share";

const vantagePrismTheme = {
  'code[class*="language-"]': {
    color: "var(--color-ink)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.875rem",
    lineHeight: "1.6",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: 2,
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "var(--color-ink)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.875rem",
    lineHeight: "1.6",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: 2,
    hyphens: "none",
    margin: 0,
    padding: "1rem",
    background: "var(--color-paper-2)",
  },
  comment: { color: "var(--color-muted)", fontStyle: "italic" },
  prolog: { color: "var(--color-muted)" },
  doctype: { color: "var(--color-muted)" },
  cdata: { color: "var(--color-muted)" },
  punctuation: { color: "var(--color-ink-2)" },
  property: { color: "var(--color-accent)" },
  tag: { color: "var(--color-accent)" },
  boolean: { color: "var(--color-accent)" },
  number: { color: "var(--color-accent)" },
  constant: { color: "var(--color-accent)" },
  symbol: { color: "var(--color-accent)" },
  deleted: { color: "var(--color-error)" },
  selector: { color: "var(--color-accent)" },
  "attr-name": { color: "var(--color-accent)" },
  string: { color: "var(--color-ink-2)" },
  char: { color: "var(--color-ink-2)" },
  builtin: { color: "var(--color-accent)" },
  inserted: { color: "var(--color-success)" },
  operator: { color: "var(--color-ink)" },
  entity: { color: "var(--color-accent)" },
  url: { color: "var(--color-accent)" },
  variable: { color: "var(--color-ink)" },
  atrule: { color: "var(--color-accent)" },
  "attr-value": { color: "var(--color-ink-2)" },
  keyword: { color: "var(--color-accent)" },
  function: { color: "var(--color-ink)" },
  "class-name": { color: "var(--color-accent)" },
  regex: { color: "var(--color-accent)" },
  important: { color: "var(--color-accent)" },
};

// Custom markdown renderers for sleek reading typography
const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl sm:text-3xl font-normal text-ink tracking-tight mt-8 mb-4 border-b border-rule pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-normal text-ink tracking-tight mt-8 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg sm:text-xl font-normal text-ink mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-ink-2 text-sm sm:text-base leading-relaxed my-4 font-light">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-focus rounded"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-4 py-1 my-4 bg-paper-2 text-ink-2">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 my-4 text-ink-2 text-sm sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 my-4 text-ink-2 text-sm sm:text-base">
      {children}
    </ol>
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");
    if (match) {
      return (
        <div className="my-6 rounded overflow-hidden border border-rule">
          <div className="bg-paper-2 px-4 py-1.5 border-b border-rule text-xs num text-muted flex items-center justify-between">
            <span>{match[1].toLowerCase()}</span>
          </div>
          <SyntaxHighlighter
            language={match[1]}
            style={vantagePrismTheme}
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{ margin: 0, padding: "1rem", background: "var(--color-paper-2)" }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-paper-2 text-accent font-mono text-xs border border-rule"
        {...props}
      >
        {children}
      </code>
    );
  },
  hr: () => <hr className="my-8 border-rule" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 border border-rule rounded">
      <table className="w-full text-left text-sm text-ink-2">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-paper-2 px-4 py-2 border-b border-rule font-medium text-ink">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border-b border-rule/60 num">{children}</td>
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
  const authorName = typeof author === "object" ? author?.name || "Vishal Verma" : author || "Vishal Verma";
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

  return (
    <>
      <Head>
        <title>{title} · Vishal Verma Field Logs</title>
        <meta name="description" content={subtitle || title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={subtitle || title} />
      </Head>

      <div className="min-h-screen bg-paper text-ink">
        <Navbar />

        <main className="max-w-3xl mx-auto px-6 py-10">
          {/* BACK LINK */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-150 mb-8 focus-visible:outline-2 focus-visible:outline-focus rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to field logs</span>
          </Link>

          {/* ARTICLE HEADER */}
          <header className="mb-10 pb-8 border-b border-rule">
            {/* Log Telemetry Tag */}
            <div className="flex items-center gap-2 text-xs text-accent num mb-2">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Log #{logNumber} · {coordinates}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-normal text-ink tracking-tight leading-tight mb-3">
              {title}
            </h1>

            {subtitle && (
              <p className="text-base sm:text-lg text-ink-2 leading-relaxed mb-6 font-light">
                {subtitle}
              </p>
            )}

            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted num pt-4 border-t border-rule">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  <span className="text-ink-2">{authorName}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
                  <span>{date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  <span>{readTime}</span>
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-paper-2 border border-rule text-ink-2 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* MARKDOWN PROSE ARTICLE */}
          <article className="prose-container">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* SHARE AND EXPEDITION FOOTER */}
          <footer className="mt-12 pt-8 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/blog"
              className="text-xs text-muted hover:text-accent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-focus rounded"
            >
              ← Back to all logs
            </Link>
            <ShareButtons
              url={`https://vishalkrv.github.io/blog/${slugPath}`}
              title={title}
            />
          </footer>
        </main>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getPosts();
  const paths = posts.map((post) => ({
    params: {
      slug: [post.slug],
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug[0];
  const post = getPostBySlug(slug);

  return {
    props: {
      ...post,
    },
  };
}
