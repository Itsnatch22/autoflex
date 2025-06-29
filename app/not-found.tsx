// app/not-found.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function NotFound() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 text-center">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-7xl md:text-9xl font-extrabold tracking-tight text-red-600"
      >
        404
      </motion.h1>

      <div ref={textRef} className="mt-6 space-y-4 max-w-xl">
        <p className="text-xl md:text-2xl font-semibold">
          Lost in the lot? This page doesn't exist 🚫
        </p>
        <p className="text-gray-400">
          You might've taken a wrong turn in the dealership... Let's get you back on the road.
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
        >
          Take Me Home 🏠
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-12 w-full max-w-lg"
      >
        <img
          src="/car-error.svg" // Replace with your SVG or PNG
          alt="Lost Car"
          className="w-full object-contain"
        />
      </motion.div>
    </section>
  );
}
