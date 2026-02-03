"use client"

import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { Play } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/heropic.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      </div>



      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-start px-8 md:px-24">
        <div className="text-left max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="relative inline-block">
              <h1 className="flex flex-col tracking-tighter">
                <span className="text-6xl md:text-9xl font-[1000] text-yellow-500 leading-none drop-shadow-2xl">
                  YELLOW SCOOTER
                </span>
                <div className="flex items-center gap-6 mt-4">
                  <span className="text-xl md:text-4xl font-black text-white tracking-[0.6em] uppercase">
                    PRODUCTION
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent min-w-[100px] hidden md:block" />
                </div>
              </h1>
            </div>

            <p className="text-lg md:text-2xl font-medium tracking-tight text-white/60 max-w-2xl leading-relaxed">
              Crafting cinematic experiences through <span className="text-white">bold frames</span> and <span className="text-white italic">visionary storytelling</span>.
            </p>

            <div className="pt-8 flex flex-col md:flex-row items-center gap-8">
              <button
                className="group relative h-20 px-12 glass-yellow rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden border border-yellow-500/20"
                onClick={() => scrollToSection("#join")}
              >
                <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors duration-500" />
                <span className="relative z-10 text-yellow-500 font-black text-sm tracking-[0.5em] uppercase">
                  Start Project
                </span>
              </button>

              <a
                href="https://www.instagram.com/one_44p/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs hover:text-yellow-500 transition-all group"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl border border-white/10 glass-dark group-hover:border-yellow-500/50 transition-all duration-500 group-hover:bg-yellow-500/10">
                  <Play size={18} className="text-yellow-500 ml-1" fill="currentColor" />
                </span>
                View Showreel
              </a>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Scroll indicator - Static */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
        onClick={() => scrollToSection("#portfolio")}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
        </div>
      </div>
    </div>
  )
}
