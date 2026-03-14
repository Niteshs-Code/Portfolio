"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import projects from "@/data/project";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [visible, setVisible] = useState(3);
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-28 bg-black text-white">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          My Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {projects.slice(0, visible).map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="  bg-gray-900 border border-gray-800 rounded-xl overflow-hidden 
hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] 
transition duration-300 cursor-pointer"
onClick={() => setSelected(project)}
            >

              <img
                src={project.image}
                className="w-full h-48 object-cover  border-gray-600  border"
              />

              <div className="p-6">

                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-2">
                  {project.short}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  {project.tech}
                </p>

                <p className="text-gray-400 text-sm mt-3">
                  {project.details}
                </p>

                <div className="flex gap-4 mt-6">

                  <a
                    href={project.live}
                    className="px-4 py-2 bg-blue-500 rounded-lg"
                  >
                    Live
                  </a>

                  <a
                    href={project.github}
                    className="px-4 py-2 border border-gray-700 rounded-lg"
                  >
                    GitHub
                  </a>

                </div>

              </div>
            </motion.div>
          ))}

        </div>

        {visible < projects.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisible(visible + 3)}
              className="px-6 py-3 border border-gray-700 rounded-xl hover:bg-gray-800"
            >
              More Projects
            </button>
          </div>
        )}

      </div>
     
     <ProjectModal
  project={selected}
  close={() => setSelected(null)}
/>
    </section>

    
  );
}