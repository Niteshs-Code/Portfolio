"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Toast from "@/components/Toast";

export default function Contact() {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [selectedPlan, setSelectedPlan] = useState("");
  const formRef = useRef(null);

  // Automatically fetch selected plan if client redirected from pricing card
  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    }
  }, []);

  // Silent input sanitization (No tech labels shown to user)
  const sanitizeInput = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawName = e.target.name.value.trim();
    const rawEmail = e.target.email.value.trim();
    const rawService = e.target.service.value.trim();
    const rawMessage = e.target.message.value.trim();

    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(rawName)) {
      alert("Please enter a valid name (3-50 characters, letters only).");
      return;
    }

    if (!emailRegex.test(rawEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (rawMessage.length < 10 || rawMessage.length > 1000) {
      alert("Message should be between 10 and 1000 characters.");
      return;
    }

    const name = sanitizeInput(rawName);
    const email = sanitizeInput(rawEmail);
    const service = sanitizeInput(rawService);
    const message = sanitizeInput(rawMessage);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, service, message })
      });

      const data = await res.json();

      if (data.success) {
        setToast({ show: true, message: "Message sent successfully 🚀" });
        localStorage.removeItem("selectedPlan");
        setSelectedPlan("");
        e.target.reset();
      } else {
        setToast({ show: true, message: data.error || "Something went wrong" });
      }
    } catch (error) {
      setToast({ show: true, message: "Network connection failure" });
    }

    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Let's Engineer Something Great
          </h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Have a project in mind or want to collaborate? Drop a message to negotiate milestones or custom budget options.
          </p>
        </div>

        {/* Layout Splitting */}
        <div className="grid md:grid-cols-5 gap-10 items-start mt-12">
          
          {/* Left Panel: Clean Personal Channels */}
          <div className="md:col-span-2 space-y-4 order-2 md:order-1">
            <div className="p-6 bg-gradient-to-b from-gray-900/50 to-black border border-gray-800/60 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Direct Channels</h3>
              <div className="space-y-4">
                <a 
  href="https://instagram.com/nitesh_dev24/" // Yahan apna real Instagram username daal dena
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-4 text-sm text-gray-400 hover:text-pink-500 transition group"
>
  <div className="p-3 bg-gray-900 border border-gray-800 rounded-xl group-hover:scale-105 transition text-pink-500">
    <FaInstagram size={18} />
  </div>
  @ Connect on Insta
</a>
                <a 
                  href="https://facebook.com/profile.php?id=61591270509518/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-sm text-gray-400 hover:text-blue-400 transition group"
                >
                  <div className="p-3 bg-gray-900 border border-gray-800 rounded-xl group-hover:scale-105 transition text-blue-600"><FaFacebook size={18} /></div>
                  Connect on Facebook
                </a>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-b from-gray-900/50 to-black border border-gray-800/60 rounded-2xl">
              <p className="text-xs text-gray-500 leading-relaxed">
                📌 **Response Time:** I usually respond within 12-24 hours. For urgent project discussions, feel free to use the instant chat button down below.
              </p>
            </div>
          </div>

          {/* Right Panel: Clean Professional Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-4 backdrop-blur-xl bg-gradient-to-b from-gray-900/30 to-black border border-gray-800/80 p-6 sm:p-8 rounded-2xl shadow-2xl order-1 md:order-2"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                maxLength={50}
                className="w-full p-3.5 text-sm bg-black/60 border border-gray-800 rounded-xl outline-none focus:border-blue-500 transition text-gray-200"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3.5 text-sm bg-black/60 border border-gray-800 rounded-xl outline-none focus:border-blue-500 transition text-gray-200"
              />
            </div>

            <div className="relative">
              <select
                name="service"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full p-3.5 text-sm bg-black/60 border border-gray-800 rounded-xl outline-none focus:border-blue-500 transition text-gray-300 appearance-none cursor-pointer"
              >
                <option value="">Select Service / Custom Budget Route</option>
                <option value="Essential Web">Essential Web (Shopify/WordPress/Next.js Layouts)</option>
                <option value="Growth Scale Store">Growth Scale Store (Full Stack Commerce Engine)</option>
                <option value="Bespoke & Marketing">Bespoke & Growth Marketing (Google Ads / Custom Apps)</option>
                <option value="General Query">General Collaboration</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-xs">▼</div>
            </div>

            <textarea
              rows="4"
              name="message"
              placeholder="Outline your project requirements..."
              required
              maxLength={1000}
              className="w-full p-3.5 text-sm bg-black/60 border border-gray-800 rounded-xl outline-none focus:border-blue-500 transition text-gray-200"
            />

            <button className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 active:scale-[0.99] transition shadow-lg shadow-blue-500/10">
              Submit Message
            </button>
          </motion.form>

        </div>
      </div>

      {/* Floating Action WhatsApp */}
      <div className="fixed bottom-5 right-5 flex items-center bg-green-500 text-white p-1 rounded-full shadow-2xl hover:scale-105 transition cursor-pointer z-50">
        <a
          href="https://wa.me/918595460058?text=Hello%20Nitesh%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5"
        >
          <FaWhatsapp size={22} />
          <span className="font-semibold text-xs tracking-wide">Instant Chat</span>
        </a>
      </div>

      <Toast show={toast.show} message={toast.message} />
    </section>
  );
}