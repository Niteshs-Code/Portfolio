"use client";
import { useState, useEffect } from "react";

export default function ProgressBar() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div
        className="h-full bg-blue-600 transition-all duration-150 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}