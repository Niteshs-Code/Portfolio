"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-white text-xl font-bold">
          Nitesh.dev
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300 ">
          <a href="#home" className="hover:text-white">Home</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      <AnimatePresence>
{open && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.35 }}
    className="md:hidden bg-black/80 backdrop-blur-xl border-t border-gray-800 text-center py-6 space-y-6 text-gray-300"
  >

    <a
      href="#home"
      className="block text-lg hover:text-blue-400 transition"
      onClick={() => setOpen(false)}
    >
      Home
    </a>

    <a
      href="#about"
      className="block text-lg hover:text-blue-400 transition"
      onClick={() => setOpen(false)}
    >
      About
    </a>

    <a
      href="#projects"
      className="block text-lg hover:text-blue-400 transition"
      onClick={() => setOpen(false)}
    >
      Projects
    </a>

    <a
      href="#contact"
      className="block text-lg hover:text-blue-400 transition"
      onClick={() => setOpen(false)}
    >
      Contact
    </a>

  </motion.div>
)}
</AnimatePresence>
    </nav>
  );
}