"use client";

import { useEffect, useState } from "react";

export default function CursorGlow(){

  const [pos,setPos]=useState({x:0,y:0});

  useEffect(()=>{

    const move=(e)=>{
      setPos({x:e.clientX,y:e.clientY});
    };

    window.addEventListener("mousemove",move);

    return()=>window.removeEventListener("mousemove",move);

  },[]);

  return(
    <div
      style={{
        left:pos.x,
        top:pos.y
      }}
      className="fixed w-40 h-40 bg-blue-500/30 blur-3xl rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-40"
    />
  );
}