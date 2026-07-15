"use client";

import { useState } from "react";

export default function Collaborate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    portfolio: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Input sanitization & state update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hard Frontend Validation Before Hitting Backend API
  const validateForm = () => {
    const { name, email, phone, role, portfolio } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !role || !portfolio.trim()) {
      setStatus({ type: "error", message: "Please fill out all required fields." });
      return false;
    }

    // Email Regex Verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return false;
    }

    // Phone Regex Verification (10-15 digits allowance for global/Indian numbers)
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setStatus({ type: "error", message: "Please enter a valid 10-digit phone number." });
      return false;
    }

    // Basic URL Verification
    try {
      new URL(portfolio);
    } catch (_) {
      setStatus({ type: "error", message: "Please enter a valid Portfolio/GitHub link (e.g., https://...)." });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/collaborate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: "success",
          message: "🎉 Application submitted successfully! Check your inbox shortly.",
        });
        setFormData({ name: "", email: "", phone: "", role: "", portfolio: "" });
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to connect to server. Please check your network.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="collaborate" className="py-20 px-6 border-t border-zinc-900 bg-black text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Info Side */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/50 px-3 py-1 rounded-full border border-blue-800/50">
            Grow Together
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mt-4 leading-tight">
            Let’s Build & Scale <span className="text-blue-500">Together.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Are you a passionate college student, junior dev, or designer? I frequently take on large client projects and love collaborating with talented individuals.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            <li className="flex items-center gap-2">✓ Real-world client project experience</li>
            <li className="flex items-center gap-2">✓ Fair payout & revenue share models</li>
            <li className="flex items-center gap-2">✓ Mentorship & portfolio boost</li>
          </ul>
        </div>

        {/* Secure Form Card */}
        <div className="bg-[#09090b] p-8 rounded-2xl border border-zinc-800/80 shadow-2xl">
          <h3 className="text-xl font-bold mb-1 text-zinc-100">Join the Dev Network</h3>
          <p className="text-xs text-zinc-500 mb-6">Drop your details and let’s connect for upcoming gigs.</p>

          {/* Status Message Display */}
          {status.message && (
            <div
              className={`p-3.5 mb-5 rounded-xl text-xs font-medium border ${
                status.type === "success"
                  ? "bg-emerald-950/40 border-emerald-800 text-emerald-400"
                  : "bg-red-950/40 border-red-800 text-red-400"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name *"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-zinc-200 transition-colors"
              />
            </div>

            {/* Email Address */}
            <div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Address *"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-zinc-200 transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone / WhatsApp Number *"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-zinc-200 transition-colors"
              />
            </div>

            {/* Skill Role Dropdown */}
            <div>
              <select
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-zinc-200 transition-colors"
              >
                <option value="" className="text-zinc-500">
                  Select Your Primary Skill *
                </option>
                <option value="Frontend (React/Next.js)">Frontend (React/Next.js)</option>
                <option value="Backend (Node/Python)">Backend (Node/Python)</option>
                <option value="Fullstack MERN">Fullstack MERN</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile App Dev (React Native/Flutter)">Mobile App Dev</option>
              </select>
            </div>

            {/* Portfolio Link */}
            <div>
              <input
                type="url"
                name="portfolio"
                required
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Portfolio / GitHub / LinkedIn Link (https://...) *"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-zinc-200 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Submitting Application...
                </>
              ) : (
                "Apply to Collaborate →"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}