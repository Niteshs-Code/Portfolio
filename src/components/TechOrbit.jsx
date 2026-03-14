"use client";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiNextdotjs } from "react-icons/si";

export default function TechOrbit() {
  return (
    <div className="absolute lg:w-[500px] lg:h-[500px] h-[350px] w-[350px] animate-spin-slow">

      <div className="absolute top-0 left-1/2 text-blue-400 text-3xl">
        <FaReact />
      </div>

      <div className="absolute bottom-0 left-1/2 text-green-500 text-3xl">
        <FaNodeJs />
      </div>

      <div className="absolute left-0 top-1/2 text-green-400 text-3xl">
        <SiMongodb />
      </div>

      <div className="absolute right-0 top-1/2 text-white text-3xl">
        <SiNextdotjs />
      </div>

    </div>
  );
}