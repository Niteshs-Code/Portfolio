"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Essential Web",
    price: "₹3,999",
    subtext: "Starting from",
    desc: "Perfect for responsive business landing pages, customized portfolio layouts, or basic CMS setups.",
    features: [
      "Custom UI Design & Layout",
      "Shopify / WordPress / Next.js Setup",
      "Essential SEO Optimization",
      "Contact Form Integration",
      "Delivery in 3-5 Days"
    ],
    highlight: false,
    cta: "Get Started"
  },
  {
    name: "Growth Scale Store",
    price: "₹9,999",
    subtext: "Starting from",
    desc: "Best for brands looking to launch full-scale modern E-Commerce stores or custom interactive dynamic platforms.",
    features: [
      "Full Stack / Advanced CMS Architecture",
      "Payment Gateway Integration",
      "Advanced Speed & Core Web Vitals Optimization",
      "Product Inventory Setup & Management",
      "1 Month Dedicated Support"
    ],
    highlight: true,
    cta: "Scale Your Business"
  },
  {
    name: "Bespoke & Marketing",
    price: "Custom",
    subtext: "According to budget",
    desc: "Looking for high-converting Google Ads setups, targeted marketing campaigns, or enterprise-grade large full-stack software?",
    features: [
      "Google Ads (PPC) Campaign Management",
      "Conversion Tracking & Advanced Analytics Setup",
      "Bespoke Full-Stack Next.js System Development",
      "Custom Scalable Database & Admin Dashboards",
      "Flexible Iterations Based On Your Budget"
    ],
    highlight: false,
    cta: "Let's Discuss Pricing"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Transparent Execution Packages
          </h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Choose a foundation or tailor a flexible roadmap constructed entirely around your custom operational goals and budget frameworks.
          </p>
        </div>

        {/* The Premium Pricing Responsive Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-6 sm:p-8 border flex flex-col justify-between overflow-hidden backdrop-blur-xl transition-all duration-300 shadow-xl ${
                plan.highlight
                  ? "bg-gradient-to-br from-blue-950/20 via-slate-900/40 to-purple-950/20 border-blue-500/60 shadow-blue-500/5"
                  : "bg-gradient-to-b from-gray-900/40 to-black border-gray-800/60"
              }`}
            >
              <div>
                {/* Visual Highlight Badge */}
                {plan.highlight && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                {/* Identity Header */}
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {plan.name}
                </h3>
                <p className="text-gray-400 mt-2 text-xs leading-relaxed min-h-[50px]">
                  {plan.desc}
                </p>

                {/* Flexible Financial Frame */}
                <div className="mt-6 pt-5 border-t border-gray-900/80">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block">
                    {plan.subtext}
                  </span>
                  <h4 className="text-3xl font-extrabold text-white tracking-tight mt-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {plan.price}
                  </h4>
                </div>

                {/* Features Checklist */}
                <ul className="mt-6 space-y-3 text-xs sm:text-sm text-gray-300">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-tight">
                      <span className="text-blue-500 font-bold shrink-0">✔</span>
                      <span className="text-gray-400">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic LocalStorage Action Trigger */}
              <button
                onClick={() => {
                  localStorage.setItem("selectedPlan", plan.name);
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`mt-8 w-full py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/10 hover:opacity-90"
                    : "bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-200 hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}