"use client"

import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { Play } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const images = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExemJ0aThzZ2Z5NW42N2E3eGtyejFkMDZmZWF3eTNwdTd2NDZvcGw3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LcyLy7Puzkdrp1Fqml/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpsYWxpMGl6ajU1NXBhZ3cyYzgwZGsxaTNtN3BjODZnejBqd2lqdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ELDyeRPpU2XcviNIno/giphy.gif",
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div
          key={images[currentIndex]}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Production Scene ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        </div>
      </div>



      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center max-w-5xl">
          <div className="relative">
            <h1
              className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-2 leading-[0.85] opacity-100 transform-none"
            >
              YELLOW SCOOTER <br />
              <span className="text-yellow-500 italic drop-shadow-[0_5px_15px_rgba(234,179,8,0.3)]">PRODUCTION</span>
            </h1>

            {/* Visual accent */}
            <div
              className="h-1 w-32 bg-yellow-500 mx-auto mt-4 scale-x-100"
            />
          </div>

          <p
            className="mt-8 text-lg md:text-xl font-medium tracking-tight text-white/50 max-w-xl mx-auto leading-relaxed opacity-100 transition-none"
          >
            Cinematic Visions. Bold Frames.
          </p>

          <div
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 opacity-100 scale-100 transition-none"
          >
            <button
              className="group relative h-20 px-12 bg-yellow-500 hover:bg-white text-black font-black text-sm tracking-[0.5em] uppercase rounded-full transition-all duration-500 shadow-[0_10px_40px_rgba(234,179,8,0.4)] hover:shadow-yellow-500/20 active:scale-95 overflow-hidden"
              onClick={() => scrollToSection("#join")}
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            <a
              href="https://www.instagram.com/one_44p/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-[#FAFAFA] font-black tracking-[0.4em] uppercase text-[10px] md:text-xs hover:text-yellow-500 transition-all group"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full border border-white/20 glass group-hover:border-yellow-500 transition-all duration-500 group-hover:bg-yellow-500 group-hover:text-black">
                <Play size={18} fill="currentColor" className="ml-1" />
              </span>
              View Showreel
            </a>
          </div>
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
