'use client'
import { navLinks } from "@/contants";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<number | null>(null);

    useEffect(() => {
        const el = navRef.current;

        const scrollTrigger = ScrollTrigger.create({
            start: 'top 20%',
            end: 99999,
            onUpdate: (self) => {
                setIsScrolled(self.direction === 1 || window.scrollY > 50);
            },
        });

        // Cleanup
        return () => {
            scrollTrigger.kill();
        };
    }, []);

    // Close mobile menu when clicking on a link
    const handleLinkClick = (index: number) => {
        setActiveLink(index);
        setIsMenuOpen(false);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !(navRef.current as HTMLElement).contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-3 transition-all duration-300 ${
                isScrolled
                    ? "bg-black/90 shadow-lg backdrop-blur-md text-white"
                    : "bg-transparent text-white"
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-wider hover:text-red-400 transition-colors">
                    AutoFlex
                </Link>
                
                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                    {navLinks.map((link, i) => (
                        <li key={i}>
                            <Link
                                href={link.href}
                                className={`relative px-1 py-2 hover:text-red-400 transition-colors duration-300 ${
                                    activeLink === i ? 'text-red-400' : ''
                                }`}
                                onClick={() => handleLinkClick(i)}
                            >
                                {link.title}
                                {activeLink === i && (
                                    <motion.span 
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400"
                                        layoutId="underline"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 flex flex-col gap-1 text-red-400">
                        <span className={`h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Navigation */}
            <motion.div 
                className={`md:hidden overflow-hidden ${isMenuOpen ? 'block' : 'hidden'}`}
                initial={{ height: 0 }}
                animate={{ height: isMenuOpen ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
            >
                <ul className="flex flex-col gap-4 py-4">
                    {navLinks.map((link, i) => (
                        <li key={i}>
                            <Link
                                href={link.href}
                                className={`block px-4 py-2 hover:text-red-400 transition-colors ${
                                    activeLink === i ? 'text-red-400 font-semibold' : ''
                                }`}
                                onClick={() => handleLinkClick(i)}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.nav>
    )
}