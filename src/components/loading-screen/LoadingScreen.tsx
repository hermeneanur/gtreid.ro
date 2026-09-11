"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingTexts = [
  "Inițializare interfață gtreiD...",
  "Se încălzește duza la 220°C...",
  "Se calibrează patul de printare...",
  "Se verifică senzorul de filament...",
  "Modelare în curs...",
  "Totul este gata!"
];

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Increment progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 500); // fade out
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 180);

    // Rotate loading text
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 900);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111] text-white"
        >
          <div className="flex flex-col items-center max-w-sm px-6 text-center">
            {/* Brand Logo image with elegant white background preserving original colors */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 rounded-2xl bg-white border border-zinc-200/80 p-3 shadow-2xl flex items-center justify-center"
            >
              <img
                src="/logo.png"
                alt="gt3D Logo"
                className="h-36 object-contain"
              />
            </motion.div>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-xs tracking-widest text-[#F6F6F6] font-mono"
            >
              PRINT. PLAY. REPEAT.
            </motion.p>

            {/* Progress Bar Container */}
            <div className="relative w-64 h-1.5 mt-8 overflow-hidden rounded-full bg-[#1C1C1C] border border-[#FF8C2A]/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Animated Loading Texts */}
            <div className="h-6 mt-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.8 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-medium tracking-wide text-[#F6F6F6]/80 font-inter"
                >
                  {loadingTexts[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default LoadingScreen;
