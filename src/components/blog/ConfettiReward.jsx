"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiReward({ targetId = "article-end-sentinel" }) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (triggered) return;

    const targetNode = document.getElementById(targetId);
    if (!targetNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTriggered(true);

          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 },
          });

          setTimeout(() => {
            confetti({ particleCount: 40, angle: 60, spread: 50, origin: { x: 0 } });
            confetti({ particleCount: 40, angle: 120, spread: 50, origin: { x: 1 } });
          }, 150);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(targetNode);

    return () => observer.disconnect();
  }, [targetId, triggered]);

  return null;
}