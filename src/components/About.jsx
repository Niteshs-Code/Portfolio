"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, } from "react-icons/si";
import { TiHtml5 } from "react-icons/ti";
import { FaJava, FaBootstrap} from "react-icons/fa6";




export default function About() {


  const [open, setOpen] = useState(null);

  const cards = [
{
title:"Frontend",
desc:"Modern UI development",

tech:[
{
name:"React",
icon:<FaReact/>,
fact:"Component based UI library"
},

{
name:"Next.js",
icon:<SiNextdotjs className="text-white"/>,
fact:"Full stack React framework"
},

{
name:"Tailwind",
icon:<SiTailwindcss/>,
fact:"Utility first CSS framework"
},
{
name:"HTML",
icon: <TiHtml5/>,
fact:"Structure and layout"
},
{
name:"CSS",
icon:"🎨",
fact:"Styling & layout control"
},
{
name:"JavaScript",
icon: <FaJava className="text-yellow-200" />,
fact:"Make interactive"
}
,{
  name:"BootStrap",
  icon: <FaBootstrap className="text-purple-500"/>,
  fact:"Make website in minutes"
}
]
},

{
title:"Backend",
desc:"API & server logic",

tech:[
{
name:"Node.js",
icon:<FaNodeJs className="text-green-400"/>,
fact:"JavaScript runtime for backend"
},

{
name:"Express",
icon:<SiExpress/>,
fact:"Minimal backend framework"
},

{
name:"MongoDB",
icon:<SiMongodb className="text-green-400"/>,
fact:"NoSQL document database"
}
]
},

{
title:"Tools",
desc:"Development workflow",

tech:[
{
name:"Git",
icon:<FaGitAlt/>,
fact:"Version control system"
},

{
name:"GitHub",
icon:"🐙",
fact:"Code hosting platform"
},

{
name:"REST API",
icon:"⚡",
fact:"Standard API communication"
},
{
name:"Vite",
icon: <img src="/projects/vite.png"  alt="" className="w-7 h-7" />,
fact:"Standard API communication"
}
]
}
];



  return (
    <section id="about" className="py-28 bg-black text-white">

      <div className="max-w-6xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-center"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-gray-400 text-center max-w-3xl mx-auto"
        >
          I'm a Full Stack Developer in India specializing in Next.js, React, Node.js, and MongoDB. I build fast, scalable, and user-friendly web applications for startups and businesses.
        </motion.p>
        <p className="mt-4 text-gray-400 text-center max-w-3xl mx-auto">
  Based in India, I provide web development services including frontend, backend, and full stack solutions using modern technologies.
</p>

        <div className="grid md:grid-cols-3 gap-8 mt-16 items-start">

      {cards.map((card, i) => (

        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          onClick={() => setOpen(open === i ? null : i)}
          className="relative cursor-pointer rounded-2xl p-6 
bg-gradient-to-b from-[#0f172a] to-[#020617] 
border border-white/10 
hover:border-blue-500/50
backdrop-blur-xl
shadow-lg shadow-black/40
transition-all duration-300
hover:scale-[1.04]
hover:shadow-blue-500/20"
        >
          

         <h3 className="text-xl font-semibold text-white tracking-wide">
            {card.title}
          </h3>

         <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            {card.desc}
          </p>

          <AnimatePresence>

            {open === i && (

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 overflow-hidden"
              >

                <div className="grid gap-3">

{card.tech.map((t,index)=>(

<div
key={index}
className="flex gap-3 p-3 bg-gray-900 border border-gray-700 rounded-lg"
>

<div className="text-blue-400 text-xl">
{t.icon}
</div>

<div>

<p className="text-sm font-semibold">
{t.name}
</p>

<p className="text-xs text-gray-400">
{t.fact}
</p>

</div>

</div>

))}

</div>

              </motion.div>

            )}

          </AnimatePresence>

        </motion.div>

      ))}

    </div>

      </div>

    </section>
  );
}