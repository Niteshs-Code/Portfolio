"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaWordpress, FaShopify } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGoogleads } from "react-icons/si";
import { TiHtml5 } from "react-icons/ti"; // Using basic HTML icon or matching your import
import { FaBootstrap } from "react-icons/fa6";

export default function About() {
  const [open, setOpen] = useState(null);

  const cards = [
    {
      title: "Frontend & Design",
      desc: "Modern, responsive UI development",
      tech: [
        {
          name: "React",
          icon: <FaReact className="text-blue-400" />,
          fact: "Component-based UI library"
        },
        {
          name: "Next.js",
          icon: <SiNextdotjs className="text-white" />,
          fact: "Full-stack React framework"
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="text-sky-400" />,
          fact: "Utility-first CSS framework"
        },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-yellow-400" />,
          fact: "High-performance interactive logic"
        },
        {
          name: "Bootstrap",
          icon: <FaBootstrap className="text-purple-500" />,
          fact: "Responsive grid layouts"
        }
      ]
    },
    {
      title: "Backend & CMS",
      desc: "Robust APIs & E-Commerce platforms",
      tech: [
        {
          name: "Node.js & Express",
          icon: <FaNodeJs className="text-green-400" />,
          fact: "Scalable JavaScript runtime engine"
        },
        {
          name: "MongoDB",
          icon: <SiMongodb className="text-green-500" />,
          fact: "NoSQL JSON document database"
        },
        {
          name: "Shopify Development",
          icon: <FaShopify className="text-green-400" />,
          fact: "Custom stores & liquid templates"
        },
        {
          name: "WordPress Setup",
          icon: <FaWordpress className="text-blue-400" />,
          fact: "Custom theme & plugin optimization"
        }
      ]
    },
    {
      title: "Tools & Growth Marketing",
      desc: "Workflow control & performance ads",
      tech: [
        {
          name: "Google Ads (PPC)",
          icon: <SiGoogleads className="text-yellow-500" />,
          fact: "Targeted campaigns to boost business ROI"
        },
        {
          name: "Git & GitHub",
          icon: <FaGitAlt className="text-orange-500" />,
          fact: "Distributed code version control"
        },
        {
          name: "REST APIs",
          icon: "⚡",
          fact: "Standard secure data communication"
        },
        {
          name: "Vite",
          icon: <img src="/projects/vite.png" alt="Vite" className="w-5 h-5 inline-block" />,
          fact: "Next-gen lightning-fast frontend tooling"
        }
      ]
    }
  ];

  return (
    <section id="about" className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-center tracking-tight"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-gray-400 text-center text-sm sm:text-base max-w-3xl mx-auto leading-relaxed"
        >
          I'm a Full Stack Web Developer and Digital Marketing Expert based in India. I bridge the gap between building cutting-edge web infrastructure—specializing in Next.js, React, MERN stack, and custom Shopify/WordPress deployments—and generating measurable business growth via optimized Google Ads campaigns.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mt-14 items-start">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => setOpen(open === i ? null : i)}
              className="relative cursor-pointer rounded-2xl p-6 
              bg-gradient-to-b from-[#0f172a]/80 to-[#020617]/90 
              border border-white/5 
              hover:border-blue-500/40
              backdrop-blur-xl
              shadow-xl shadow-black/50
              transition-all duration-200"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
                {card.title}
              </h3>

              <p className="text-gray-400 mt-1.5 text-xs sm:text-sm leading-relaxed">
                {card.desc}
              </p>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-5 overflow-hidden"
                  >
                    <div className="grid gap-2.5 pt-1">
                      {card.tech.map((t, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2.5 bg-gray-900/60 border border-gray-800/80 rounded-xl"
                        >
                          <div className="text-xl shrink-0">
                            {t.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-200 truncate">
                              {t.name}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate">
                              {t.fact}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}