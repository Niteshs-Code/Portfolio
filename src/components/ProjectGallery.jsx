import React from 'react';
import Image from 'next/image';

export default function ProjectGallery() {
  // All images updated to the '/projects/' subfolder path
  const row1Images = [
    { id: 1, title: "Premium Clothes & Luxury Label", url: "/projects/clothes website.png" },
    { id: 2, title: "High-Conversion E-Commerce Portal", url: "/projects/e-comerecd website.png" },
    { id: 3, title: "Google Ads Growth Matrix", url: "/projects/google ads.png" },
    { id: 4, title: "Elite Personal Portfolio Engine", url: "/projects/portfolio.png" }, // Added New
  ];

  const row2Images = [
    { id: 5, title: "Corporate Business Platform", url: "/projects/business website.png" },
    { id: 6, title: "Next-Gen Education & Agency Hub", url: "/projects/education and agency.png" },
    { id: 7, title: "Dynamic Modern Blog System", url: "/projects/blog website.png" },
    { id: 8, title: "Real Estate Property Matrix", url: "/projects/real state.png" }, // Added New
    { id: 9, title: "Social Media Engagement Portal", url: "/projects/social media.png" }, // Added New
  ];

  // Duplicating arrays for endless infinite flow
  const firstRow = [...row1Images, ...row1Images];
  const secondRow = [...row2Images, ...row2Images];

  return (
    <section className="py-20 bg-black overflow-hidden border-t border-zinc-900/60">
      <div className="max-w-6xl mx-auto px-4 mb-12 text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Deployed <span className="text-blue-500">Work Gallery</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-xl">
          A production-grade visual loop of high-conversion E-commerce architectures, dashboards, and client web systems.
        </p>
      </div>

      {/* Track Container */}
      <div className="flex flex-col gap-6 w-full">
        
        {/* ROW 1: Moves Left */}
        <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="flex gap-6 shrink-0 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {firstRow.map((img, index) => (
              <div 
                key={`gallery-r1-${img.id}-${index}`} 
                className="relative w-[300px] h-[180px] md:w-[380px] md:h-[220px] shrink-0 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 group transition-all duration-300"
              >
                <Image 
                  src={img.url} 
                  alt={img.title}
                  fill
                  sizes="(max-w-768px) 300px, 380px"
                  className="object-cover object-cover filter contrast-125 brightness-90 md:grayscale md:brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500 group-hover:scale-[1.03] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-xs font-semibold text-white tracking-wide font-mono bg-zinc-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-zinc-800">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Right */}
        <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="flex gap-6 shrink-0 animate-marquee-reverse hover:[animation-play-state:paused] cursor-pointer">
            {secondRow.map((img, index) => (
              <div 
                key={`gallery-r2-${img.id}-${index}`} 
                className="relative w-[300px] h-[180px] md:w-[380px] md:h-[220px] shrink-0 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 group transition-all duration-300"
              >
                <Image 
                  src={img.url} 
                  alt={img.title}
                  fill
                  sizes="(max-w-768px) 300px, 380px"
                  className="object-cover object-cover filter contrast-125 brightness-90 md:grayscale md:brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500 group-hover:scale-[1.03] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-xs font-semibold text-white tracking-wide font-mono bg-zinc-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-zinc-800">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}