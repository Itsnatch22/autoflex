'use client'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useWindowSize from '@/hooks/useWindowSize';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

    const { width } = useWindowSize();
    const videoRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const isMobile = width < 768;

    useEffect(() => {
        if(isMobile){
            gsap.fromTo(
                headingRef.current,
                {y: 100, opacity: 0},
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 80%',
                    }
                }
            )
            gsap.fromTo(
                textRef.current,
                { y: 100, opacity: 0},
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    delay: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 80%',
                    }
                }
            )
        }
    }, [isMobile]);
    return(
        <section
        className="relative h-screen w-full overflow-hidden flex items-center justify-center text-white">
            <AnimatePresence>
                { isMobile ? (
                    <Image
                    src="/images/hero-image.jpg"
                    alt="Hero Image"
                    layout="fill"
                    objectFit="cover"
                    priority
                    />
                ) : (
                    <motion.div
                    key="image"
                    className="absolute inset-0 w-full h-full z-0"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    >
                        <motion.video
                    ref={videoRef}
                    key='video'
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    autoPlay
                    src="/videos/video.mp4"
                    muted
                    loop
                    playsInline
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
        className="z-20 text-center text-white px-6"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <h1 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tight">
          <span className="block text-red-500">Redefine</span>
          <span className="block">Car Experience</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Welcome to AutoFlex — performance, elegance & tech in motion.
        </p>
        <button className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-full font-bold tracking-wide transition-all">
          Book A Test Ride
        </button>
      </motion.div>
        </section>
    )
}