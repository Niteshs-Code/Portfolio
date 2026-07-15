import Link from "next/link";
// Main blogs data source se direct import
import { blogsData } from "@/data/blogs";

export default function BlogPreview() {
  // 1. Array safety check: Check karo blogs data available hai ya nahi
  const allBlogs = blogsData || [];

  // 2. Dynamic Category Filtering: Har unique category ka PEHLA blog pick karega
  const uniqueCategoryBlogs = allBlogs.reduce((acc, current) => {
    const exists = acc.find((item) => item.category === current.category);
    if (!exists) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  // 3. Top 3 unique categories ke pehle articles pick karenge
  const featuredBlogs = uniqueCategoryBlogs.slice(0, 3);

  if (featuredBlogs.length === 0) return null;

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto border-t border-zinc-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
            Featured Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mt-2">
            Latest Articles
          </h2>
        </div>
        <Link
          href="/blogs"
          className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group"
        >
          View All Posts
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Cards Layout: Mobile pe 1 Card (idx === 0), Desktop pe 3 Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {featuredBlogs.map((blog, idx) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className={`group bg-[#09090b] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl ${
              // Mobile par pehla card dikhega, baki 2 cards mobile par hidden rahenge
              idx > 0 ? "hidden md:flex" : "flex"
            }`}
          >
            <div>
              {/* Cover Image */}
              <div className="h-48 w-full overflow-hidden relative border-b border-zinc-800/60">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-blue-400 text-[11px] font-semibold px-3 py-1 rounded-full border border-blue-500/20">
                  {blog.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-zinc-400 text-sm mt-3 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            {/* Read Article Link */}
            <div className="px-6 pb-6 text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:text-blue-300">
              Read Article <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}