"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-28 bg-black text-white">

      <div className="max-w-4xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold"
        >
          Contact Me
        </motion.h2>

        <p className="text-gray-400 mt-4">
          If you want to work together or have any question feel free to message.
        </p>

        <form className="mt-12 space-y-6">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl outline-none"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-4 bg-gray-900 border border-gray-800 rounded-xl outline-none"
          />

          <button className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600">
            Send Message
          </button>

        </form>

      </div>
<div className="fixed bottom-5 right-5 flex items-center justify-between bg-green-500 text-white px-5 py-3 rounded-full shadow-xl w-auto animate-bounce hover:scale-105 transition-transform duration-300 cursor-pointer">
            {/* Left side text */}
            <span className="font-semibold text-lg hidden md:block mr-1">Contact Us</span>

            {/* Right side WhatsApp Icon */}
            <a
              href="https://wa.me/918595460058"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-500 p-2 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-colors duration-300"
            >
              <FaWhatsapp size={25} />
            </a>
          </div>
    </section>
  );
}