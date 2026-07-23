"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { blogsData, blogCategories } from "@/data/blogs";

export default function BlogsHub() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Theme Persistence without affecting global CSS
  const [isDark, setIsDark] = useState(true);

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

  // Dynamic Category Counts
  const categoryCounts = useMemo(() => {
    const counts = { All: blogsData ? blogsData.length : 0 };
    if (Array.isArray(blogsData)) {
      blogsData.forEach((b) => {
        if (b.category) {
          counts[b.category] = (counts[b.category] || 0) + 1;
        }
      });
    }
    return counts;
  }, []);

  // Filter Blogs based on Search & Category
  const filteredBlogs = useMemo(() => {
    if (!Array.isArray(blogsData)) return [];
    const query = searchQuery.toLowerCase().trim();

    return blogsData.filter((b) => {
      const matchesCategory =
        selectedCategory === "All" || b.category === selectedCategory;

      const matchesSearch =
        !query ||
        b.title?.toLowerCase().includes(query) ||
        b.excerpt?.toLowerCase().includes(query) ||
        (Array.isArray(b.tags) &&
          b.tags.some((t) => typeof t === "string" && t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured Post
  const featuredBlog = useMemo(() => {
    if (selectedCategory === "All" && searchQuery === "" && blogsData?.length > 0) {
      return blogsData[0];
    }
    return null;
  }, [selectedCategory, searchQuery]);

  // Grouped Blogs for Section Wise View
  const groupedByCategory = useMemo(() => {
    if (selectedCategory !== "All" || searchQuery !== "") return {};
    const groups = {};
    const remaining = featuredBlog
      ? blogsData.filter((b) => b.slug !== featuredBlog.slug)
      : blogsData;

    remaining.forEach((blog) => {
      if (!groups[blog.category]) groups[blog.category] = [];
      groups[blog.category].push(blog);
    });
    return groups;
  }, [selectedCategory, searchQuery, featuredBlog]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <>
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-blue-500 selection:text-white relative ${
        isDark ? "bg-[#09090b] text-zinc-100" : "bg-[#f8fafc] text-zinc-900"
      }`}
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[350px]  blur-[130px] opacity-25 transition-all duration-700 ${
            isDark ? "bg-blue-600" : "bg-blue-400"
          }`}
        />
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
          isDark
            ? "bg-[#09090b]/80 border-zinc-800/80"
            : "bg-white/80 border-zinc-200/80"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-1 font-bold text-lg sm:text-xl tracking-tight transition-opacity hover:opacity-90"
          >
            <span className="text-zinc-400 group-hover:-translate-x-0.5 transition-transform">←</span>
            <span>Nitesh</span>
            <span className="text-blue-500">.dev</span>
          </Link>

          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-[14px] font-semibold border transition-all duration-200 active:scale-95 ${
              isDark
                ? "bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200 hover:text-black"
            }`}
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        
        {/* Modern Responsive Hero */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Knowledge Base & Engineering Insights
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
            Articles & Insights
          </h1>
          <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
            Deep dives into modern web architecture, AI patterns, system design, and practical developer guides.
          </p>
        </div>

        {/* Clean Spaced Search Input */}
        <div className="max-w-xl mx-auto mb-10 px-2">
          <div className="relative flex items-center">
            <svg
              className="w-5 h-5 absolute left-4 text-zinc-400 pointer-events-none z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by title, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-3.5 pl-12 pr-10 rounded-2xl text-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                isDark
                  ? "bg-zinc-900/90 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:bg-zinc-900 focus:border-blue-500/50"
                  : "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500/50 shadow-sm"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 text-zinc-400 hover:text-zinc-200 p-1 rounded-full hover:bg-zinc-800 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Header */}
        {Array.isArray(blogCategories) && (
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 px-2 no-scrollbar">
            {blogCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 flex items-center gap-2 active:scale-95 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : isDark
                      ? "bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                      : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200 shadow-sm"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : isDark
                        ? "bg-zinc-800 text-zinc-400"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Hero Featured Card */}
        {featuredBlog && (
          <div className="mb-14">
            <Link
              href={`/blogs/${featuredBlog.slug}`}
              className={`group relative block rounded-3xl border overflow-hidden transition-all duration-300 ${
                isDark
                  ? "bg-zinc-900/50 border-zinc-800 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
                  : "bg-white border-zinc-200 hover:border-blue-500/40 hover:shadow-xl"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="relative lg:col-span-7 h-60 sm:h-80 lg:h-[380px] w-full overflow-hidden bg-zinc-800">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
                    Featured Deep Dive
                  </span>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 mb-3">
                      <span>{featuredBlog.category}</span>
                      <span>•</span>
                      <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>
                        {featuredBlog.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight group-hover:text-blue-500 transition-colors leading-snug mb-3">
                      {featuredBlog.title}
                    </h2>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 ${
                        isDark ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {featuredBlog.excerpt}
                    </p>

                    {/* Highlights Preview */}
                    {featuredBlog.highlights && (
                      <div className="mb-6 hidden sm:block">
                        <p className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2">Key Highlights:</p>
                        <ul className="space-y-1">
                          {featuredBlog.highlights.slice(0, 2).map((h, i) => (
                            <li key={i} className={`text-xs flex items-start gap-1.5 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                              <span className="text-blue-500 font-bold">•</span>
                              <span className="line-clamp-1">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div
                    className={`pt-4 border-t flex items-center justify-between text-xs ${
                      isDark ? "border-zinc-800 text-zinc-400" : "border-zinc-200 text-zinc-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {featuredBlog.author?.avatar && (
                        <img
                          src={featuredBlog.author.avatar}
                          alt={featuredBlog.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                        />
                      )}
                      <span className="font-medium">{featuredBlog.author?.name}</span>
                    </div>
                    <span className="text-blue-500 font-semibold group-hover:translate-x-1 transition-transform">Read Full Article →</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Section Wise View */}
        {selectedCategory === "All" && searchQuery === "" ? (
          <div className="space-y-14">
            {Object.keys(groupedByCategory).map((categoryName) => (
              <CategorySectionHorizontal
                key={categoryName}
                categoryName={categoryName}
                blogs={groupedByCategory[categoryName]}
                isDark={isDark}
                onSelectCategory={handleCategoryChange}
              />
            ))}
          </div>
        ) : (
          <div>
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} isDark={isDark} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed rounded-3xl border-zinc-800/80 max-w-md mx-auto">
                <p className="text-sm font-semibold text-zinc-300">No articles found</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      
    </div>

    <section className="max-w-4xl mx-auto mt-20 border mb-20 border-zinc-800 bg-[#09090b] p-8 rounded-2xl text-center shadow-xl">
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

    </>
  );
}

function CategorySectionHorizontal({ categoryName, blogs, isDark, onSelectCategory }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{categoryName}</h2>
          <span className="text-xs font-mono text-zinc-500">({blogs.length})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectCategory(categoryName)}
            className="text-xs text-blue-500 hover:underline font-semibold mr-2"
          >
            View All →
          </button>
          <button
            onClick={() => scroll("left")}
            className={`p-2 rounded-full border text-xs transition-colors ${
              isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800" : "bg-white border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded-full border text-xs transition-colors ${
              isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800" : "bg-white border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
      >
        {blogs.map((blog) => (
          <div key={blog.slug} className="w-[280px] sm:w-[320px] shrink-0">
            <BlogCard blog={blog} isDark={isDark} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogCard({ blog, isDark }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={`group h-full rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${
        isDark
          ? "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5"
          : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-lg"
      }`}
    >
      <div>
        <div className="relative w-full h-44 overflow-hidden bg-zinc-800">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-md border border-white/10">
            {blog.category}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400 mb-2">
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>

          <h3 className="text-base font-bold group-hover:text-blue-500 transition-colors leading-snug line-clamp-2">
            {blog.title}
          </h3>

          <p
            className={`mt-2 text-xs line-clamp-2 leading-relaxed ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            {blog.excerpt}
          </p>
        </div>
      </div>

      <div
        className={`px-4 sm:px-5 py-3 border-t text-xs flex items-center justify-between ${
          isDark ? "border-zinc-800/80 text-zinc-400" : "border-zinc-100 text-zinc-500"
        }`}
      >
        <div className="flex items-center gap-2">
          {blog.author?.avatar && (
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-5 h-5 rounded-full object-cover border border-zinc-700"
            />
          )}
          <span className="font-medium text-[11px]">{blog.author?.name}</span>
        </div>
        <span className="text-blue-500 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
          Read Article <span>→</span>
        </span>
      </div>
    </Link>

    
  );
}