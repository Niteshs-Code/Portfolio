"use client";

import { useState } from "react";


export default function SubmitArticle() {
  const [formData, setFormData] = useState({
    authorName: "",
    authorImage: "",
    sectionName: "",
    title: "",
    bodyContent: "",
    expiryDuration: "1-week",
    articleImage: "",
    phone: "",
    userEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { authorName, authorImage, sectionName, title, bodyContent, phone, userEmail } = formData;

    // Check Emptiness
    if (!authorName.trim() || !authorImage.trim() || !sectionName.trim() || !title.trim() || !bodyContent.trim() || !phone.trim() || !userEmail.trim()) {
      setStatus({ type: "error", message: "Please fill out all mandatory fields marked with (*)." });
      return false;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setStatus({ type: "error", message: "Please provide a valid email address." });
      return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setStatus({ type: "error", message: "Please enter a valid phone number (10-15 digits)." });
      return false;
    }

    // URL validations
    try {
      new URL(authorImage);
      if (formData.articleImage.trim()) {
        new URL(formData.articleImage);
      }
    } catch (_) {
      setStatus({ type: "error", message: "Please enter a valid public image URL (starting with https://)." });
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
      const response = await fetch("/api/submit-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: "success",
          message: "🎉 Thank you! Your article draft is securely logged. Our team is reviewing it.",
        });
        // Clear all inputs
        setFormData({
          authorName: "",
          authorImage: "",
          sectionName: "",
          title: "",
          bodyContent: "",
          expiryDuration: "1-week",
          articleImage: "",
          phone: "",
          userEmail: "",
        });
      } else {
        setStatus({ type: "error", message: result.error || "Submission failed. Please try again." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network error. Failed to dispatch draft to the server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-black text-white border-t border-zinc-900">
      <div className="max-w-3xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/50">
            Community Voice
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-100 mt-3">Publish Your Article</h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
            Got an interesting idea, case study, or tech breakdown? Submit your text draft. We'll format and host it for you!
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#09090b] border border-zinc-800/80 p-8 rounded-2xl shadow-2xl">
          {status.message && (
            <div className={`p-4 mb-6 rounded-xl text-xs font-medium border ${
              status.type === "success" 
                ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" 
                : "bg-red-950/40 border-red-800 text-red-400"
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Author Metadata */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Your Name *</label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  placeholder="e.g. Alex Graham"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Your Email Address *</label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  placeholder="e.g. alex@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200"
                />
              </div>
            </div>

            {/* Row 2: Author Image URL & Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Profile Image URL *</label>
                <input
                  type="url"
                  name="authorImage"
                  value={formData.authorImage}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername.png"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">WhatsApp / Contact Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="For minor layout tweaks or updates"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200"
                />
              </div>
            </div>

            <hr className="border-zinc-800/60 my-2" />

            {/* Row 3: Section & Title */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Section / Category *</label>
                <input
                  type="text"
                  name="sectionName"
                  value={formData.sectionName}
                  onChange={handleChange}
                  placeholder="e.g. Engineering, AI"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Article Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Keep it catchy and professional"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200"
                />
              </div>
            </div>

            {/* Row 4: Main Body */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs text-zinc-400 font-medium">Content Body *</label>
                <span className="text-[10px] text-zinc-500 italic">Just throw your core thoughts, we will brush it up!</span>
              </div>
              <textarea
                name="bodyContent"
                rows={6}
                value={formData.bodyContent}
                onChange={handleChange}
                placeholder="Write your article's main copy, steps, or logs here..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200 font-sans resize-none"
              />
            </div>

            {/* Row 5: Article Cover Image & Expiry */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Article Display Banner Image URL (Optional)</label>
                <input
                  type="url"
                  name="articleImage"
                  value={formData.articleImage}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Public Visibility Lifespan</label>
                <select
                  name="expiryDuration"
                  value={formData.expiryDuration}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-200"
                >
                  <option value="3-days">3 Days</option>
                  <option value="5-days">5 Days</option>
                  <option value="1-week">1 Week (Max Limit)</option>
                </select>
              </div>
            </div>

            {/* Submission Triggers */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Uploading to Core Loop...
                </>
              ) : (
                "Submit Layout Draft →"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}