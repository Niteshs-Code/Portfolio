"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show, message }) {

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0 }}
          className="fixed top-5 right-5 bg-black border border-blue-500 text-white px-6 py-4 rounded-xl shadow-xl"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}