"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiJavascript } from "react-icons/si";

const skills = [
  { name: "React", level: 90, icon: <FaReact className="text-blue-400" /> },
  { name: "Node.js", level: 85, icon: <FaNodeJs className="text-green-400" /> },
  { name: "MongoDB", level: 80, icon: <SiMongodb className="text-green-400"/> },
  { name: "JavaScript", level: 88, icon: <SiJavascript className="text-yellow-200" /> },
];

export default function Skills() {
  return (
    <section className="py-28 bg-black text-white">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Skills
        </h2>

        <div className="space-y-8">

          {skills.map((skill, i) => (

            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >

              {/* top row */}
              <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">
                    {skill.icon}
                  </span>
                  {skill.name}
                </div>

                <span className="text-gray-400">
                  {skill.level}%
                </span>

              </div>

              {/* progress bar */}
              <div className="h-3 bg-gray-800 rounded overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-blue-500 relative"
                >

                  {/* shine effect */}
                  <div className="absolute inset-0 shine"></div>

                </motion.div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}