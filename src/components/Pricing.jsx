"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "₹2,999",
    desc: "Perfect for simple websites",
    features: [
      "1-2 Pages Website",
      "Responsive Design",
      "Basic SEO",
      "Delivery in 3 Days"
    ],
    highlight: false
  },
  {
    name: "Standard",
    price: "₹6,999",
    desc: "Best for growing business",
    features: [
      "5-6 Pages Website",
      "Modern UI/UX",
      "Fast Performance",
      "Basic Backend (Form)",
      "Delivery in 5 Days"
    ],
    highlight: true
  },
  {
    name: "Premium",
    price: "₹14,999",
    desc: "Full professional solution",
    features: [
      "Full Stack Website",
      "Authentication",
      "API Integration",
      "Admin Panel",
      "Deployment + Support",
      "Delivery in 7-10 Days"
    ],
    highlight: false
  }
];

export default function Pricing() {
  return (
    <section className="py-32 bg-black text-white">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold">
          Pricing Plans
        </h2>

        <p className="text-gray-400 mt-4">
          Choose a plan that fits your needs
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {plans.map((plan, i) => (

            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`relative p-8 rounded-2xl border 
              ${plan.highlight
                ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500"
                : "bg-white/5 border-white/10"
              } backdrop-blur-xl shadow-xl`}
            >

              {/* Badge */}
              {plan.highlight && (
                <span className="absolute top-4 right-4 bg-blue-500 text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-semibold">
                {plan.name}
              </h3>

              <p className="text-gray-400 mt-2">
                {plan.desc}
              </p>

              <h4 className="text-3xl font-bold mt-6">
                {plan.price}
              </h4>

              <ul className="mt-6 space-y-3 text-gray-300">
                {plan.features.map((f, idx) => (
                  <li key={idx}>✔ {f}</li>
                ))}
              </ul>

              <button 
              onClick={() => {
  localStorage.setItem("selectedPlan", plan.name);
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}}
              
              className="mt-8 w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition">
                Get Started
              </button>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}