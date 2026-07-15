"use client";
import Link from "next/link";

export default function RelatedArticles({ currentSlug, blogs, isDark }) {
  // 1. Current Blog object find karo taaki uski category mil sake
  const currentBlog = blogs.find((b) => b.slug === currentSlug);

  // 2. Same Category ke blogs filter karo (Current blog ko chhode kar)
  let related = blogs.filter(
    (b) => b.slug !== currentSlug && b.category === currentBlog?.category
  );

  // Fallback: Agar same category ke 2 articles na milein, toh baki categories se fill kar lo
  if (related.length < 2) {
    const otherBlogs = blogs.filter(
      (b) => b.slug !== currentSlug && b.category !== currentBlog?.category
    );
    related = [...related, ...otherBlogs];
  }

  // Final top 2 items pick karo
  const finalRelated = related.slice(0, 2);

  if (finalRelated.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl sm:text-2xl font-bold mb-6 tracking-tight">
        Recommended Articles 📚
      </h3>

      <div className="grid sm:grid-cols-2 gap-6">
        {finalRelated.map((item) => (
          <Link
            key={item.slug}
            href={`/blogs/${item.slug}`}
            className={`group p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? "bg-zinc-900/60 border-zinc-800 hover:border-blue-500/50"
                : "bg-white border-zinc-200 hover:border-blue-400 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="h-40 rounded-xl overflow-hidden mb-4">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-500 font-medium mb-2">
              <span>{item.category}</span>
              <span>•</span>
              <span className={isDark ? "text-zinc-400" : "text-zinc-500"}>
                {item.readTime}
              </span>
            </div>
            <h4 className="font-bold text-base line-clamp-2 group-hover:text-blue-500 transition-colors">
              {item.title}
            </h4>
            <p className={`text-xs mt-2 line-clamp-2 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              {item.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}