"use client";
import { useState } from "react";

export default function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/blogs/${slug}` 
    : `https://portfolio-omega-five-sz84sz7cb9.vercel.app/blogs/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-5 border-y border-zinc-200 dark:border-zinc-800/80 my-8 flex flex-wrap items-center justify-between gap-4 transition-colors">
      <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
        Share Article
      </span>
      
      <div className="flex items-center gap-2 flex-wrap">
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${shareUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white dark:bg-emerald-500/10 dark:hover:bg-emerald-600 dark:text-emerald-400 dark:hover:text-white border border-emerald-200 dark:border-emerald-800/50 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm"
        >
          WhatsApp
        </a>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white dark:bg-sky-500/10 dark:hover:bg-sky-500 dark:text-sky-400 dark:hover:text-white border border-sky-200 dark:border-sky-800/50 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm"
        >
          Twitter
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-500/10 dark:hover:bg-blue-600 dark:text-blue-400 dark:hover:text-white border border-blue-200 dark:border-blue-800/50 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm"
        >
          LinkedIn
        </a>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm"
        >
          {copied ? "✓ Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}