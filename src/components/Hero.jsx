"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import TechOrbit from "./TechOrbit";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-black tech-grid overflow-hidden px-6"
    >
      {/* glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-150px] right-[-150px]" />

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="relative  mb-20  ml-10 lg:ml-0 lg:mb-0">

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >
            Nitesh Kumar
          </motion.h1>

          <div className="mt-4 text-xl md:text-2xl text-blue-400">
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "MERN Stack Developer",
                2000,
                "AI App Builder",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </div>

          {/* orbit */}
          <div className="absolute lg:bottom-90 bottom-56 right-89 lg:right-170  md:scale-100">
            <TechOrbit />
          </div>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition" >
              View Projects
            </button>

            <button className="px-6 py-3 border border-gray-600 rounded-xl hover:bg-gray-800 transition">
              Contact
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex justify-center lg:pt-0 pt-30">

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative "
          >

            <div className="grid grid-cols-2 gap-4 rotate-panel">

              <img src="/projects/zento.png" className="rounded-xl" />
              <img src="/projects/weather.png" className="rounded-xl" />
              <img src="/projects/movie.png" className="rounded-xl" />
              <img src="/projects/blinkit.png" className="rounded-xl" />

            </div>

            {/* glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 sm:w-56 h-20 bg-blue-500/40 blur-3xl rounded-full"></div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}