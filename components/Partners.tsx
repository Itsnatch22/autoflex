"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  "/images/tesla.png",
  "/images/audi.png",
  "/images/bmw.png",
  "/images/ferrari.png",
  "/images/benz.png",
  "/images/porsche.png",
];

export default function PartnerMarquee() {
  return (
    <section className="w-full bg-white py-10 overflow-hidden relative z-10">
      <h2 className="text-center text-black text-2xl font-semibold mb-8">
        Powering the Drive 🔋
      </h2>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-24 w-max"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...logos, ...logos].map((src, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[160px]"
            >
              <Image
                src={src}
                alt={`Partner logo ${index}`}
                width={120}
                height={60}
                className="opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
