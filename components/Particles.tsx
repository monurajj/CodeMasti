"use client";

import React, { useMemo } from "react";

interface Particle {
  left: number;
  top: number;
  width: number;
  height: number;
  backgroundColor: string;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
}

interface ParticlesProps {
  count?: number;
}

export default function Particles({ count = 10 }: ParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 3 + 1.5,
      height: Math.random() * 3 + 1.5,
      backgroundColor: i % 3 === 0 ? '#FCD34D' : i % 3 === 1 ? '#F59E0B' : '#EAB308',
      opacity: Math.random() * 0.2 + 0.08,
      animationDelay: Math.random() * 5,
      animationDuration: Math.random() * 4 + 4,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            backgroundColor: particle.backgroundColor,
            opacity: particle.opacity,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
