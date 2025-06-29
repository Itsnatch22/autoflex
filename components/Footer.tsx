"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-section", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0a0a0a] text-white py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-10">

        {/* Brand Info */}
        <div className="footer-section space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">AutoFlex 🚘</h1>
          <p className="text-sm text-gray-400 max-w-sm">
            Precision, performance, and pure flex. Your journey starts here.
          </p>
        </div>

        {/* Footer Links */}
        <div className="footer-section grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="space-y-2">
            <h3 className="font-semibold">Pages</h3>
            <ul className="space-y-1 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="/booking" className="hover:text-white">Booking</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Partners</h3>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-white">Tesla</a></li>
              <li><a href="#" className="hover:text-white">BMW</a></li>
              <li><a href="#" className="hover:text-white">Audi</a></li>
              <li><a href="#" className="hover:text-white">Ferrari</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section w-full lg:w-1/3">
          <h3 className="font-semibold text-lg mb-3">Join the Ride 🏁</h3>
          <form className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-[#1a1a1a] text-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AutoFlex. All rights reserved.
      </div>
    </footer>
  );
}
