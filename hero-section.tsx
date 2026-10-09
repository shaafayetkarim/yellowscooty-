"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const scrollToContact = () => {
    const el = document.getElementById("join") || document.getElementById("footer")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.6 }
      ).fromTo(
        buttonRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      )

      // Button fades out and scrolls as user scrolls through the hero
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "45% top",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress
          if (buttonRef.current) {
            gsap.set(buttonRef.current, {
              opacity: Math.max(0, 1 - p * 2.2),
              y: -p * 35,
            })
          }
        },
      })

      // Background video subtle parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          if (videoRef.current) {
            gsap.set(videoRef.current, {
              y: `${p * 20}%`,
              scale: 1 + p * 0.1,
            })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Animated Gradient Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/colorflow-animation.mp4" type="video/mp4" />
        </video>

        {/* Subtle cinematic overlays for depth and contrast */}
        <div className="absolute inset-0 bg-black/25" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      {/* Hero Content: Invisible Anchor for Logo Position + Square Contact Button */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center select-none"
      >
        {/* Invisible Anchor: Reserving exact hero space & providing coordinates for the floating logo */}
        <div
          id="hero-logo-anchor"
          className="relative w-[300px] sm:w-[440px] md:w-[580px] lg:w-[680px] max-w-[88vw] aspect-[577/433] opacity-0 pointer-events-none select-none"
          aria-hidden="true"
        />

        {/* Square Contact Button */}
        <button
          ref={buttonRef}
          onClick={scrollToContact}
          className="group relative mt-28 sm:mt-16 md:mt-8 px-8 py-3.5 sm:px-10 sm:py-4 rounded-none bg-black/60 hover:bg-[#8b0100] border border-white/30 hover:border-[#8b0100] backdrop-blur-md text-white font-sans font-bold text-xs sm:text-sm tracking-[0.3em] uppercase transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(139,1,0,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Subtle inner square accent borders */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            CONTACT
          </span>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/70 group-hover:border-white transition-colors" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/70 group-hover:border-white transition-colors" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/70 group-hover:border-white transition-colors" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/70 group-hover:border-white transition-colors" />
        </button>
      </div>
    </section>
  )
}
