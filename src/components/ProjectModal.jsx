"use client";

export default function ProjectModal({ project, close }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-gray-900 max-w-lg w-full rounded-xl p-8 relative">

        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400"
        >
          ✕
        </button>

        <img
          src={project.image}
          className="w-full h-52 object-cover rounded-lg"
        />

        <h2 className="text-2xl font-bold mt-6">
          {project.title}
        </h2>

        <p className="text-gray-400 mt-3">
          {project.details}
        </p>

        <p className="text-sm text-gray-500 mt-3">
          {project.tech}
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

    </div>
  );
}