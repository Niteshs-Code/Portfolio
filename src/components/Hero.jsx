"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import TechOrbit from "./TechOrbit";
import { FaDownload } from "react-icons/fa";

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
        <div className="relative max-w-2xl mb-20 mt-28 px-6 lg:px-0">

  {/* small intro */}
  <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mb-3">
    Welcome to my portfolio
  </p>

  {/* name */}
  <motion.h1
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
  >
    Nitesh Kumar
  </motion.h1>

  {/* typing */}
  <div className="mt-4 text-lg sm:text-xl md:text-2xl text-blue-400 font-medium">
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

  {/* description */}
  <p className="mt-6 text-gray-400 leading-relaxed text-base sm:text-lg">
    I build modern and scalable web applications using the MERN stack and 
    cutting-edge technologies, focusing on performance, clean design, 
    and real-world problem solving.
  </p>

  {/* buttons */}
  <div className="mt-8 flex flex-wrap gap-4">

    <a
      href="#projects"
      className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition shadow-lg hover:shadow-blue-500/30"
    >
      View Projects
    </a>

    <a
      href="#contact"
      className="px-6 py-3 border border-gray-600 rounded-xl hover:bg-gray-800 transition"
    >
      Contact Me
    </a>
    <motion.a
  href="/resume.pdf"
  download
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold 
  bg-gradient-to-r from-blue-500 to-purple-500 
  shadow-lg hover:shadow-blue-500/40 transition"
>
  <FaDownload />
  Download CV
</motion.a>

  </div>

</div>

        {/* RIGHT PANEL */}
        <div className="flex justify-center lg:pt-0 pt-30">

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative "
          >

            {/* orbit */}
          <div className="absolute lg:bottom-120 bottom-65 right-85 lg:right-170  md:scale-100">
            <TechOrbit />
          </div>
            <div className="grid grid-cols-2 gap-4 rotate-panel w-80 lg:w-180">

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