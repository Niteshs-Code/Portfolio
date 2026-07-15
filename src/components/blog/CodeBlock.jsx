"use client";
import { useState } from "react";

export default function CodeBlock({ code, isDark }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative my-6 rounded-xl overflow-hidden border ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-900 border-zinc-800"}`}>
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700/50 text-xs text-zinc-400">
        <span className="font-mono text-[11px]">Code Snippet</span>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors text-xs font-medium flex items-center gap-1"
        >
          {copied ? "✓ Copied!" : "📋 Copy"}
        </button>
      </div>

      {/* Code Text Area */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-200">
        <pre><code className="whitespace-pre">{code}</code></pre>
      </div>
    </div>
  );
}