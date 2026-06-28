"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaWordpress, FaShopify } from "react-icons/fa";
import { SiMongodb, SiJavascript, SiGoogleads } from "react-icons/si";

const skillCards = [
  { 
    name: "React / Next.js", 
    type: "Development",
    metric: "Expert", 
    icon: <FaReact className="text-blue-400 group-hover:rotate-12 transition-transform duration-300" />,
    desc: "Building highly-scalable web architectures, server-side rendered apps, and performance-first interfaces."
  },
  { 
    name: "JavaScript (ES6+)", 
    type: "Core Engine",
    metric: "Advanced", 
    icon: <SiJavascript className="text-yellow-400" />,
    desc: "Writing clean, optimized asynchronous programming logic and complex client-side interactions."
  },
  { 
    name: "Node.js & Express", 
    type: "Backend & Systems",
    metric: "Advanced", 
    icon: <FaNodeJs className="text-green-400" />,
    desc: "Designing secure RESTful microservices, event-driven web servers, and robust state logic."
  },
  { 
    name: "MongoDB Database", 
    type: "Storage",
    metric: "Intermediate", 
    icon: <SiMongodb className="text-green-500" />,
    desc: "Architecting non-relational document databases, structuring secure schemas, and fine-tuning queries."
  },
  { 
    name: "Shopify & WordPress", 
    type: "CMS & E-Commerce",
    metric: "Expert Integration", 
    icon: <FaShopify className="text-green-400" />,
    desc: "Deploying production-ready themes, liquid configurations, and custom WooCommerce storefront ecosystem scaling."
  },
  { 
    name: "Google Ads (PPC)", 
    type: "Growth Marketing",
    metric: "ROI Optimizer", 
    icon: <SiGoogleads className="text-yellow-500" />,
    desc: "Setting up search & performance max campaigns, advanced tag tracking, and maximizing direct lead generation."
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Subtle Gradient Flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Technical Superpowers
          </h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            A comprehensive matrix blending high-end engineering, custom CMS management, and conversion-focused performance marketing.
          </p>
        </div>

        {/* The New Card Matrix Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCards.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl p-6 bg-gradient-to-b from-gray-900/40 to-black border border-gray-800/60 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Subtle card internal glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Upper Meta Row */}
                <div className="flex justify-between items-start mb-5">
                  <div className="p-3 bg-gray-900/80 border border-gray-800 rounded-xl text-3xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {skill.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                    {skill.type}
                  </span>
                </div>

                {/* Main Identity */}
                <h3 className="text-lg font-semibold text-white tracking-wide group-hover:text-blue-400 transition-colors duration-200">
                  {skill.name}
                </h3>
                
                <p className="text-gray-400 mt-2 text-xs sm:text-sm leading-relaxed min-h-[60px]">
                  {skill.desc}
                </p>
              </div>

              {/* Lower Experience Badge Metric */}
              <div className="mt-6 pt-4 border-t border-gray-900 flex justify-between items-center">
                <span className="text-[11px] text-gray-500 font-medium">Competency</span>
                <span className="text-xs font-semibold font-mono text-gray-300 bg-gray-900 px-3 py-1 rounded-md border border-gray-800/60">
                  {skill.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}