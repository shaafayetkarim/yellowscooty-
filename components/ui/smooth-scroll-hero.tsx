"use client"

import * as React from "react"
import { useRef } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { MapPin, Users, Calendar, Trophy, Camera, Send, Loader2, MousePointer2 } from "lucide-react"
import { useState } from "react"

interface SmoothScrollHeroProps {
  scrollHeight?: number
  desktopImage: string
  mobileImage: string
  initialClipPercentage?: number
  finalClipPercentage?: number
}

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1875,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 3000)
      } else {
        setStatus("error")
      }
    } catch (err) {
      setStatus("error")
    }
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Clip path animation - image fully reveals by 70% scroll progress
  const clipStart = useTransform(scrollYProgress, [0, 0.7], [initialClipPercentage, 0])
  const clipEnd = useTransform(scrollYProgress, [0, 0.7], [finalClipPercentage, 100])
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`

  // Background size animation - completes when image is fully revealed
  const backgroundSize = useTransform(scrollYProgress, [0, 0.7], ["170%", "100%"])

  // Scale animation - completes when image is fully revealed
  const scale = useTransform(scrollYProgress, [0, 0.7], [1.2, 1])

  // CTA overlay animations - appears earlier and completes by 50%
  const ctaOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])

  // Scrolling effort text animation - visible at start, fades out as CTA appears
  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scrollTextY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}px` }} className="relative w-full">
      <motion.div
        className="sticky top-0 h-screen w-full bg-black overflow-hidden"
        style={{
          clipPath,
          willChange: "transform",
        }}
      >
        {/* Desktop background */}
        <motion.div
          className="absolute inset-0 hidden md:block grayscale"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale,
          }}
        />
        {/* Mobile background */}
        <motion.div
          className="absolute inset-0 md:hidden grayscale"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale,
          }}
        />

        {/* Grain / Noise Overlay */}
        <div className="absolute inset-0 z-[5] opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/50 z-[1]" />

        {/* Scrolling Effort Text - Stylish & Compact */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 px-6 pointer-events-none"
          style={{ opacity: scrollTextOpacity, y: scrollTextY }}
        >
          <div className="text-center max-w-2xl flex flex-col items-center">
            <p className="text-white text-lg md:text-2xl font-black tracking-[0.4em] uppercase leading-tight md:leading-relaxed flex flex-col md:block">
              <span className="mb-2 md:mb-0">Give a little <span className="text-white">effort</span> by</span>
              <span className="text-6xl md:text-8xl lg:text-9xl text-yellow-500 block my-6 tracking-tighter italic font-serif leading-none">SCROLLING</span>
              <span className="mb-2 md:mb-0">to reach us because</span>
              <span className="text-white/60 italic tracking-[0.2em] md:tracking-widest mt-4 block text-sm md:text-lg">we will be giving too..</span>
            </p>

            {/* Mouse Scroll Animation - Solid & High Visibility */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              <div className="w-[30px] h-[50px] rounded-full border-2 border-yellow-500 flex justify-center p-2 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <motion.div
                  animate={{
                    y: [0, 15, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-1 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                />
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Scroll Down</span>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{
            opacity: ctaOpacity,
            y: ctaY,
          }}
        >
          <div className="text-center text-white max-w-5xl mx-auto px-6 pb-20 md:pb-0">
            {/* Main CTA Heading */}
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-none">
              READY FOR
              <br />
              <span className="text-yellow-500 italic drop-shadow-[0_5px_15px_rgba(234,179,8,0.2)]">
                PRODUCTION?
              </span>
            </h2>

            {/* Supporting Text */}
            <p className="text-xl md:text-2xl text-white/60 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Join leading global brands who've trusted us to tell their most ambitious stories through cinematic excellence.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { icon: <Camera />, value: "250+", label: "Projects Done" },
                { icon: <Users />, value: "45+", label: "Global Clients" },
                { icon: <Calendar />, value: "12", label: "Years Exp." },
                { icon: <Trophy />, value: "15", label: "Awards Won" },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="flex justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                    <div className="w-14 h-14 glass-yellow rounded-2xl flex items-center justify-center border border-yellow-500/20">
                      {React.isValidElement(stat.icon) && React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6 text-yellow-500" })}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] text-white/30 font-black tracking-[0.2em] uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Contact Form - Posh & Standard */}
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="glass-dark border border-white/10 rounded-[2rem] p-10 md:p-14 shadow-2xl overflow-hidden relative">
                {/* Subtle accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black tracking-[0.2em] text-white uppercase ml-1">Name</label>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/30 focus:border-yellow-500 py-3 text-white transition-all outline-none text-sm font-medium placeholder:text-white/30"
                        placeholder="ALEX TURNER"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black tracking-[0.2em] text-white uppercase ml-1">Email</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/30 focus:border-yellow-500 py-3 text-white transition-all outline-none text-sm font-medium placeholder:text-white/30"
                        placeholder="ALEX@VISION.COM"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black tracking-[0.2em] text-white uppercase ml-1">Your Vision</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-white/30 focus:border-yellow-500 py-3 text-white transition-all outline-none text-sm font-medium min-h-[100px] resize-none placeholder:text-white/30"
                      placeholder="TELL US ABOUT YOUR PROJECT..."
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
                    <div className="flex items-center gap-2">
                      {status === "success" && (
                        <p className="text-yellow-500 text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">Inquiry Transmitted</p>
                      )}
                      {status === "error" && (
                        <p className="text-red-500 text-[10px] font-black tracking-[0.3em] uppercase">Transmission Failed</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-full hover:bg-yellow-500 transition-all duration-500 disabled:opacity-50"
                    >
                      <span className="flex items-center gap-3">
                        {status === "loading" ? (
                          <Loader2 className="animate-spin w-3 h-3" />
                        ) : (
                          <Send className="w-3 h-3" />
                        )}
                        {status === "success" ? "TRANSMITTED" : "INITIATE PROJECT"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-[10px] text-white/20 mb-6 font-black tracking-[0.4em]">TRUSTED BY VISIONARIES</p>
              <div className="flex flex-wrap justify-center items-center gap-10 text-white/40 font-bold text-[10px] tracking-[0.2em] uppercase">
                <span>📹 CINEMATIC</span>
                <span>🎬 DIRECTION</span>
                <span>🎨 GRADING</span>
                <span>🔊 SOUND</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SmoothScrollHero
