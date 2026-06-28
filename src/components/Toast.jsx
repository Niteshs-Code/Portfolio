"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          // Initial state: thoda screen ke upar se start hoga
          initial={{ opacity: 0, y: -20 }}
          // Animate state: top-5 position par aakar smoothly rukega
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          // z-[9999] add kiya hai taaki duniya ka koi bhi component isko na chupa sake
          className="fixed top-5 right-5 z-[9999] bg-zinc-950 border border-blue-500/80 text-white px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md max-w-sm"
        >
          <div className="flex items-center gap-2">
            <span>✨</span>
            <p className="text-sm font-medium tracking-wide font-sans">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}