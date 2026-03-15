"use client";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiNextdotjs } from "react-icons/si";

export default function TechOrbit() {
  return (
    <div className="absolute lg:w-[600px] lg:h-[600px] h-[360px] w-[360px] animate-spin-slow">

      <div className="absolute top-0 left-1/2 text-blue-400  text-2xl lg:text-5xl">
        <FaReact />
      </div>

      <div className="absolute bottom-0 left-1/2 text-green-500 text-2xl lg:text-5xl">
        <FaNodeJs />
      </div>

      <div className="absolute left-0 top-1/2 text-green-400 text-2xl lg:text-5xl">
        <SiMongodb />
      </div>

      <div className="absolute right-0 top-1/2 text-white text-2xl lg:text-5xl">
        <SiNextdotjs />
      </div>

    </div>
  );
}