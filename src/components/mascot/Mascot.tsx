"use client";

import React from "react";
import { motion } from "framer-motion";

export type MascotPose = "waving" | "printing" | "analyzing" | "presenting" | "loading" | "footer";

interface MascotProps {
  pose?: MascotPose;
  className?: string;
  size?: number;
}

export const Mascot: React.FC<MascotProps> = ({ pose = "waving", className = "", size = 200 }) => {
  // Simple animations for eyes
  const eyeScaleY = {
    animate: {
      scaleY: [1, 0.1, 1],
    },
    transition: {
      duration: 3.5,
      repeat: Infinity,
      repeatDelay: 2.5
    }
  };

  const bodyFloating = {
    animate: {
      y: [-4, 4]
    },
    transition: {
      duration: 2.2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  // Render SVG based on pose
  const renderMascotBody = () => {
    switch (pose) {
      case "printing":
        return (
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {/* Printer Nozzle above */}
            <path d="M100 20 L100 50" stroke="#FF8C2A" strokeWidth="2.5" opacity="0.6" />
            <polygon points="96,50 104,50 100,58" fill="#FF8C2A" opacity="0.8" />
            <circle cx="100" cy="62" r="3" fill="#FF8C2A" className="animate-ping" />

            {/* Mascot Cube Body */}
            <rect x="60" y="80" width="80" height="80" rx="16" stroke="#FF8C2A" strokeWidth="4" fill="#1C1C1C" />
            
            {/* Eyes */}
            <motion.circle cx="85" cy="115" r="5" fill="#FFFFFF" variants={eyeScaleY} animate="animate" transition={eyeScaleY.transition} />
            <motion.circle cx="115" cy="115" r="5" fill="#FFFFFF" variants={eyeScaleY} animate="animate" transition={eyeScaleY.transition} />
            
            {/* Mouth (concentrated) */}
            <circle cx="100" cy="132" r="3.5" fill="#FF8C2A" />

            {/* Arms holding a tiny printed cube */}
            <path d="M50 120 Q35 115 60 115" stroke="#FF8C2A" strokeWidth="3" strokeLinecap="round" />
            <path d="M150 120 Q165 115 140 115" stroke="#FF8C2A" strokeWidth="3" strokeLinecap="round" />
            <rect x="91" y="66" width="18" height="18" rx="4" stroke="#FF8C2A" strokeWidth="2" fill="rgba(255,140,42,0.2)" />
            
            {/* Legs */}
            <path d="M80 160 L80 175" stroke="#FF8C2A" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M120 160 L120 175" stroke="#FF8C2A" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );

      case "analyzing":
        return (
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {/* Thinking bubble */}
            <circle cx="140" cy="50" r="3" fill="#5A5D64" />
            <circle cx="150" cy="40" r="5" fill="#FF8C2A" />
            
            {/* Mascot Cube Body */}
            <rect x="60" y="80" width="80" height="80" rx="16" stroke="#FF8C2A" strokeWidth="4" fill="#1C1C1C" />
            
            {/* Eyes (one looking bigger/curious) */}
            <circle cx="85" cy="115" r="7" fill="#FFFFFF" />
            <circle cx="85" cy="115" r="3.5" fill="#111111" />
            <circle cx="115" cy="115" r="4.5" fill="#FFFFFF" />
            
            {/* Mouth */}
            <path d="M96 135 Q100 130 104 135" stroke="#FF8C2A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Arm touching chin */}
            <path d="M50 120 Q38 128 64 132" stroke="#FF8C2A" strokeWidth="3" strokeLinecap="round" />
            <path d="M150 120 Q162 128 144 138" stroke="#FF8C2A" strokeWidth="3" strokeLinecap="round" />

            {/* Legs */}
            <path d="M80 160 L80 175" stroke="#FF8C2A" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M120 160 L120 175" stroke="#FF8C2A" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );

      case "loading":
        return (
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {/* Orbiting loading dots */}
            <motion.circle
              cx="100"
              cy="100"
              r="70"
              stroke="#FF8C2A"
              strokeWidth="2"
              strokeDasharray="15,40"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center" }}
            />
            
            {/* Mascot Cube Body */}
            <rect x="60" y="80" width="80" height="80" rx="16" stroke="#FF8C2A" strokeWidth="4" fill="#1C1C1C" />
            
            {/* Eyes (rolling/dizzy) */}
            <circle cx="85" cy="115" r="5.5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
            <circle cx="115" cy="115" r="5.5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
            
            {/* Mouth */}
            <circle cx="100" cy="134" r="4.5" fill="#FF8C2A" />

            {/* Legs */}
            <path d="M80 160 L80 175" stroke="#FF8C2A" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M120 160 L120 175" stroke="#FF8C2A" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );

      case "waving":
      case "presenting":
      case "footer":
      default:
        return (
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {/* Mascot Cube Body */}
            <rect x="60" y="80" width="80" height="80" rx="16" stroke="#FF8C2A" strokeWidth="4" fill="#1C1C1C" />
            
            {/* Eyes */}
            <motion.circle cx="85" cy="115" r="5" fill="#FFFFFF" variants={eyeScaleY} animate="animate" transition={eyeScaleY.transition} />
            <motion.circle cx="115" cy="115" r="5" fill="#FFFFFF" variants={eyeScaleY} animate="animate" transition={eyeScaleY.transition} />
            
            {/* Smiling Mouth */}
            <path d="M90 132 Q100 142 110 132" stroke="#FF8C2A" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Left Arm waving */}
            <motion.path
              d="M50 120 Q30 92 40 82"
              stroke="#FF8C2A"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ rotate: [-8, 16, -8] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "50px 120px" }}
            />
            {/* Right Arm down */}
            <path d="M150 120 Q165 135 155 145" stroke="#FF8C2A" strokeWidth="3" strokeLinecap="round" />

            {/* Legs */}
            <path d="M80 160 L80 175 H70" stroke="#FF8C2A" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M120 160 L120 175 H130" stroke="#FF8C2A" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      variants={bodyFloating}
      animate="animate"
      className={`relative flex items-center justify-center p-2 ${className}`}
      style={{ 
        width: size, 
        height: size
      }}
    >
      {renderMascotBody()}
    </motion.div>
  );
};

export default Mascot;
