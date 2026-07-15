"use client";
import { useState, use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogsData } from "@/data/blogs";

import ProgressBar from "@/components/blog/ProgressBar";
import ConfettiReward from "@/components/blog/ConfettiReward";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import CodeBlock from "@/components/blog/CodeBlock";

export default function SingleBlogPage({ params }) {
  const [isDark, setIsDark] = useState(true);
  const [showMobileToc, setShowMobileToc] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const resolvedParams = use(params);
  const blog = blogsData.find((b) => b.slug === resolvedParams?.slug);

  // Sync theme preference locally
  useEffect(() => {
    const savedTheme = localStorage.getItem("blog_theme");
    if (savedTheme !== null) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const nextTheme = !prev;
      localStorage.setItem("blog_theme", nextTheme ? "dark" : "light");
      return nextTheme;
    });
  };

  if (!blog) return notFound();

  // Pehle 2 ki jagah ab 5 sections preview me rahenge (Thoda bada content preview)
  const PREVIEW_COUNT = 5;
  const previewSections = blog.contentSections?.slice(0, PREVIEW_COUNT) || [];
  const remainingSections = blog.contentSections?.slice(PREVIEW_COUNT) || [];

  return (
    <div
      className={`min-h-screen max-w-full overflow-x-hidden transition-colors duration-300 ${
        isDark ? "bg-[#09090b] text-zinc-200" : "bg-[#fcfcfd] text-zinc-800"
      }`}
    >
      <ProgressBar />
      <ConfettiReward targetId="article-end-sentinel" />

      {/* Navbar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDark ? "bg-[#09090b]/80 border-zinc-800" : "bg-white/80 border-zinc-200"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/blogs"
            className="text-xs sm:text-sm font-medium text-blue-500 hover:underline flex items-center gap-1"
          >
            <span>←</span> All Articles
          </Link>
          <button
            onClick={toggleTheme}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
              isDark
                ? "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
                : "bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200"
            }`}
          >
            {isDark ? " Light" : " Dark"}
          </button>
        </div>
      </header>

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-16 min-w-0">
        <div className="flex items-center gap-2 text-xs mb-3 text-blue-500 font-medium">
          <span>{blog.category}</span>
          <span>•</span>
          <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>
            {blog.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-snug sm:leading-tight mb-4 break-words">
          {blog.title}
        </h1>

        <div
          className={`flex items-center gap-3 py-3 border-y text-xs sm:text-sm mb-6 ${
            isDark ? "border-zinc-800" : "border-zinc-200"
          }`}
        >
          {blog.author?.avatar && (
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
          )}
          <div>
            <p className="font-semibold">{blog.author?.name}</p>
            <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              {blog.date}
            </p>
          </div>
        </div>

        <div className="w-full max-w-full rounded-2xl overflow-hidden mb-6 border border-zinc-800 shadow-lg">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full max-w-full h-48 sm:h-80 md:h-96 object-cover block"
          />
        </div>

        {/* Excerpt Summary */}
        {blog.excerpt && (
          <div
            className={`p-4 sm:p-5 rounded-xl border mb-6 ${
              isDark
                ? "bg-blue-950/20 border-blue-900/40 text-blue-200"
                : "bg-blue-50 border-blue-200 text-blue-900"
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1 text-blue-500">
              Summary & Key Highlights
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">{blog.excerpt}</p>
          </div>
        )}

        <ShareButtons title={blog.title} slug={blog.slug} />

        {/* Mobile TOC */}
        {blog.toc && blog.toc.length > 0 && (
          <div className="lg:hidden my-6">
            <button
              onClick={() => setShowMobileToc(!showMobileToc)}
              className={`w-full text-left p-3.5 rounded-xl border flex justify-between items-center text-xs font-semibold ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-300"
                  : "bg-zinc-100 border-zinc-200 text-zinc-800"
              }`}
            >
              <span>Table of Contents</span>
              <span>{showMobileToc ? "▲" : "▼"}</span>
            </button>
            {showMobileToc && (
              <div
                className={`p-4 rounded-b-xl border-x border-b text-xs space-y-2 ${
                  isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
                }`}
              >
                {blog.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setShowMobileToc(false)}
                    className="block text-blue-500 hover:underline"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 mt-8 min-w-0">
          <div className="lg:col-span-9 space-y-6 text-sm sm:text-base leading-relaxed min-w-0">
            {/* Initial Preview Content */}
            {/* Initial Preview Content */}
{previewSections.map((sec, idx) => {
  if (sec.type === "paragraph") {
    return (
      <p
        key={idx}
        id={sec.id}
        className={`break-words ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
      >
        {sec.text}
      </p>
    );
  }
  if (sec.type === "heading") {
    return (
      <h2
        key={idx}
        id={sec.id}
        className={`text-xl sm:text-2xl font-bold tracking-tight pt-4 break-words ${
          isDark ? "text-slate-100" : "text-zinc-900"
        }`}
      >
        {sec.heading}
      </h2>
    );
  }
  /* CHANGE HERE: Image handler added */
  if (sec.type === "image") {
    return (
      <div key={idx} className="my-6 w-full max-w-full overflow-hidden">
        <img
          src={sec.url}
          alt={sec.caption || "Blog Image"}
          className="w-full max-w-full rounded-xl object-cover border border-zinc-800 max-h-[350px] sm:max-h-[400px] shadow-md block"
        />
        {sec.caption && (
          <p className="text-center text-xs text-zinc-500 mt-2">
            {sec.caption}
          </p>
        )}
      </div>
    );
  }
  /* CHANGE HERE: Code block handler added */
  if (sec.type === "code") {
    return <CodeBlock key={idx} code={sec.code} isDark={isDark} />;
  }
  return null;
})}

            {/* Read Whole Story or Remaining Content */}
            {!isExpanded && remainingSections.length > 0 ? (
              <div className="relative pt-8 pb-4 text-center">
                <div
                  className={`absolute inset-x-0 -top-16 h-24 bg-gradient-to-t pointer-events-none ${
                    isDark ? "from-[#09090b] to-transparent" : "from-[#fcfcfd] to-transparent"
                  }`}
                />
                <button
                  onClick={() => setIsExpanded(true)}
                  className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xl shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
                >
                  Read Whole Story ↓
                </button>
              </div>
            ) : (
              remainingSections.map((sec, idx) => {
                if (sec.type === "paragraph") {
                  return (
                    <p
                      key={idx}
                      id={sec.id}
                      className={`break-words ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                    >
                      {sec.text}
                    </p>
                  );
                }
                if (sec.type === "heading") {
                  return (
                    <h2
                      key={idx}
                      id={sec.id}
                      className={`text-xl sm:text-2xl font-bold tracking-tight pt-4 break-words ${
                        isDark ? "text-slate-100" : "text-zinc-900"
                      }`}
                    >
                      {sec.heading}
                    </h2>
                  );
                }
                if (sec.type === "image") {
                  return (
                    <div key={idx} className="my-6 w-full max-w-full overflow-hidden">
                      <img
                        src={sec.url}
                        alt={sec.caption || "Blog Image"}
                        className="w-full max-w-full rounded-xl object-cover border border-zinc-800 max-h-[350px] sm:max-h-[400px] shadow-md block"
                      />
                      {sec.caption && (
                        <p className="text-center text-xs text-zinc-500 mt-2">
                          {sec.caption}
                        </p>
                      )}
                    </div>
                  );
                }
                if (sec.type === "code") {
                  return <CodeBlock key={idx} code={sec.code} isDark={isDark} />;
                }
                return null;
              })
            )}

            {/* Target anchor: Reader Yahan tak scroll karega tabhi Confetti trigger hoga */}
            <div id="article-end-sentinel" className="h-2 w-full my-4" />
<section className="max-w-4xl mx-auto mt-20 border border-zinc-800 bg-[#09090b] p-8 rounded-2xl text-center shadow-xl">
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/50">
          Share Your Knowledge
        </span>
        <h3 className="text-xl font-bold text-zinc-100 mt-4">Want to write your own article?</h3>
        <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
  Have an exceptional idea or technical insight? Share your draft with us, and our editorial team will polish, format, and host it live.
</p>
        
        <div className="mt-6">
          <Link href="/submit-article">
            <button className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 inline-flex items-center gap-2 cursor-pointer">
              Write an Article <span>→</span>
            </button>
          </Link>
        </div>
      </section>
            {/* 1. Related Articles Section */}
            <div className="pt-6 border-t border-zinc-800/60">
              <RelatedArticles
                currentSlug={blog.slug}
                blogs={blogsData}
                isDark={isDark}
              />
            </div>

            {/* 2. Chat on WhatsApp / Lead CTA (Sabse Last Me) */}
            <div
              className={`mt-10 p-6 sm:p-8 rounded-2xl border ${
                isDark
                  ? "bg-zinc-900/80 border-blue-900/40"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold mb-2">
                Need a high-performance web application?
              </h3>
              <p
                className={`text-xs sm:text-sm mb-4 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                I build fast, responsive, and SEO-friendly web platforms for startups and personal brands.
              </p>
              <a
                href="https://wa.me/918595460058?text=Hi%20Nitesh,%20I%20read%20your%20blog%20and%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Desktop Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-3">
              <h3
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Table of Contents
              </h3>
              <nav className="space-y-2 text-xs">
                {blog.toc?.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block hover:text-blue-500 transition-colors ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}