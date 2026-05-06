"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import Toast from "@/components/Toast";

export default function Contact() {

  const [toast, setToast] = useState({ show: false, message: "" });

const handleSubmit = async (e) => {

  e.preventDefault();

  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const message = e.target.message.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 3) {
    alert("Name must be at least 3 characters");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email");
    return;
  }

  if (message.length < 10) {
    alert("Message must be at least 10 characters");
    return;
  }

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  });

  const data = await res.json();

  if (data.success) {
    setToast({
  show: true,
  message: "Message sent successfully 🚀"
});

setTimeout(() => {
  setToast({ show: false, message: "" });
}, 3000);
    e.target.reset();
  } else {
    
setToast({
 show:true,
 message:"Something went wrong"
})

  }

};




  
  return (
    <section id="contact" className="relative py-32 bg-black text-white overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 blur-3xl">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Let's Work Together
        </motion.h2>

        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Have a project in mind or want to collaborate?  
          Send me a message and I'll get back to you soon.
        </p>

        {/* FORM CARD */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 space-y-6 backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-2xl"
          onSubmit={handleSubmit}
        >

         <input
  type="text"
  name="name"
  placeholder="Your Name"
  required
  minLength={3}
  className="w-full p-4 bg-transparent border border-gray-700 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
/>

<input
  type="email"
  name="email"
  placeholder="Your Email"
  required
  className="w-full p-4 bg-transparent border border-gray-700 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
/>

<textarea
  rows="5"
  name="message"
  placeholder="Your Message"
  required
  minLength={10}
  className="w-full p-4 bg-transparent border border-gray-700 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
/>

          <button className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition transform">
            Send Message
          </button>

        </motion.form>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-5 right-5 flex items-center justify-between bg-green-500 text-white px-5 py-3 rounded-full shadow-xl animate-bounce hover:scale-105 transition cursor-pointer z-10">

        <span className="font-semibold text-lg hidden md:block mr-2">
          Contact Us
        </span>

        <a
  href="https://wa.me/918595460058?text=Hello%20Nitesh%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
  target="_blank"
  rel="noopener noreferrer"
  className="bg-white text-green-500 p-2 rounded-full hover:bg-green-600 hover:text-white transition "
>
  <FaWhatsapp size={25} />
</a>

      </div>
<Toast show={toast.show} message={toast.message} />
    </section>
  );
}