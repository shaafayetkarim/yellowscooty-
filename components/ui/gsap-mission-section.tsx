"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function GsapMissionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLParagraphElement>(null)
  const line2Ref = useRef<HTMLParagraphElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!line1Ref.current || !line2Ref.current || !iconRef.current) return

      const words1 = line1Ref.current.querySelectorAll(".mw")
      const words2 = line2Ref.current.querySelectorAll(".mw")

      // Background kinetic marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // Master timeline scrubbed by scroll
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      })

      // Phase 1: Line 1 word-by-word spotlight reveal (left aligned)
      master.fromTo(
        words1,
        {
          opacity: 0.08,
          filter: "blur(10px)",
          y: 30,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.06,
          ease: "power3.out",
        }
      )

      // Phase 2: Icon FALLS with a real visible bounce (NOT scrubbed)
      // This fires as a real-time animation when icon enters viewport
      gsap.set(iconRef.current, { opacity: 0, y: -150, scale: 0.2, rotate: -270 })

      ScrollTrigger.create({
        trigger: iconRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(iconRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: "bounce.out",
          })
        },
      })

      // Phase 3: Line 2 word-by-word spotlight reveal (right aligned)
      gsap.fromTo(
        words2,
        {
          opacity: 0.08,
          filter: "blur(10px)",
          y: 30,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line2Ref.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1.5,
          },
        }
      )

      // Progress bar
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 20%",
              scrub: 1.5,
            },
          }
        )
      }
    },
    { scope: containerRef }
  )

  const line1Text = "At Ares Production, we don't just capture images; we capture the essence of movement and the soul of your story."
  const line2Text = "Join us in redefining the art of visual storytelling, one frame at a time."

  const line1Words = line1Text.split(" ")
  const line2Words = line2Text.split(" ")

  return (
    <section
      id="mission"
      ref={containerRef}
      className="relative w-full py-36 md:py-52 bg-black text-white overflow-hidden border-t border-white/5 font-outfit select-none"
    >
      {/* Background Kinetic Marquee */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center opacity-[0.025]">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap text-[20vw] font-black uppercase tracking-tighter text-white"
        >
          ARES PRODUCTION — THE MISSION — CINEMATIC STORYTELLING — VISUAL EXCELLENCE —
        </div>
      </div>

      {/* Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[220px] pointer-events-none"
        style={{ background: "rgba(139,1,0,0.05)" }}
      />

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6">
            <span>the</span> <span style={{ color: "#8b0100" }}>mission</span>
          </h2>
          <div className="h-1 w-24 rounded-full" style={{ background: "#8b0100" }} />
        </div>

        {/* Line 1 — Left Aligned */}
        <p
          ref={line1Ref}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.2] text-white text-left flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]"
        >
          {line1Words.map((word, i) => (
            <span key={i} className="mw inline-block text-white">
              {word}
            </span>
          ))}
        </p>

        {/* Falling Icon Separator */}
        <div className="flex justify-center my-14 md:my-20">
          <div ref={iconRef} className="opacity-0">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Downward chevron / arrow icon */}
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="#8b0100"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M16 20L24 28L32 20"
                stroke="#8b0100"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Line 2 — Right Aligned */}
        <p
          ref={line2Ref}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.2] text-white text-right flex flex-wrap justify-end gap-x-[0.25em] gap-y-[0.1em]"
        >
          {line2Words.map((word, i) => (
            <span key={i} className="mw inline-block text-white">
              {word}
            </span>
          ))}
        </p>

        {/* Progress Line */}
        <div className="mt-24 md:mt-32 w-full h-[2px] bg-white/10 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 bottom-0 w-full"
            style={{ background: "#8b0100" }}
          />
        </div>
      </div>
    </section>
  )
}
