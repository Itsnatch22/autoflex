'use client'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        gsap.fromTo(el, {
            opacity: 0,
            y: 100
        },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            scrub: true
        },
    }
);
    }, []);
    return(
      <section
      ref={sectionRef}
      id='about'
      className='relative w-full py-20 px-6 md:px-16 bg-black text-white overflow-hidden'
      >
        <div
        className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12'>
            <motion.div
            className='w-full lg:w-1/2'
            initial={{scale: 0.9, opacity: 0}}
            whileInView={{scale: 1, opacity: 1}}
            transition={{duration: 1, ease: 'easeOut'}}>
                <img
                src='/images/about.jpg'
                alt="About AutoFlex"
                className='rounded-2xl shadow-lg'
                />
            </motion.div>

            <motion.div
            className='w-full lg:w-1/2 space-y-6'
            initial={{ x: 100, opacity: 1}}
            whileInView={{ x: 0, opacity: 1}}
            transition={{ duration: 1, delay: 0.3 }}
            >
                <h2
                className='text-4xl md:text-5xl font-extrabold tracking-tight'>
                    AutoFlex: <span className=''>Where Motion</span> Meets Obsession
                </h2>
                <p
                className='text-lg text-gray-300 leading-relaxed'>
                     We&apos;re not just redefining how you move. We&apos;re rewriting what *movement* even means.
                     From next-gen booking to real-time support and exclusive rides, AutoFlex is your
                     gateway to a smarter, sleeker automotive experience.
                </p>
                <p
                className='text-md text-gray-400'>Backed by precision. Powered by community. Designed for HIMs and HERs who demand more.</p>
                <button
                className='mt-4 bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-full font-bold shadow-lg transition-all'
                >
                    Learn More
                </button>
            </motion.div>
        </div>
      </section>
    )
}