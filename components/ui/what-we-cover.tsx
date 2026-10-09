"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface CoverItem {
  id: string
  title: string
  subtitle: string
  tag: string
}

const COVER_ITEMS: CoverItem[] = [
  {
    id: "01",
    title: "Events",
    subtitle: "Concerts · Mega Festivals · Corporate Summits",
    tag: "Live Coverage",
  },
  {
    id: "02",
    title: "Advertisements",
    subtitle: "Brand Campaigns · Print · 360° Digital Media",
    tag: "Commercial",
  },
  {
    id: "03",
    title: "TCV / TVC",
    subtitle: "Television Commercials · High-Budget OVC Broadcast",
    tag: "Broadcast",
  },
  {
    id: "04",
    title: "Documentaries",
    subtitle: "Social Impact · Heritage · Global Agency Docudramas",
    tag: "Non-Fiction",
  },
  {
    id: "05",
    title: "Music Videos",
    subtitle: "Narrative Visuals · Independent Bands · Studio Releases",
    tag: "Art & Sound",
  },
]

export const WhatWeCoverSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll(".cover-item")

      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="coverage"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-black text-white overflow-hidden border-t border-white/5 font-outfit"
    >
      {/* Background Subtle Red Radial Ambience */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[180px] pointer-events-none opacity-20 transition-all duration-700"
        style={{
          background:
            hoveredIdx !== null
              ? "radial-gradient(circle, #8b0100 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(139,1,0,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Section Header - Bold & Clean (No eyebrow text) */}
        <div className="mb-14 md:mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6">
            <span>gotchu</span> <span style={{ color: "#8b0100" }}>covered 😉</span>
          </h2>
          <div
            className="h-1 w-24 rounded-full"
            style={{ background: "#8b0100" }}
          />
        </div>

        {/* Vertical Stacked Typography List (Screenshot Style) */}
        <div ref={listRef} className="w-full flex flex-col select-none">
          {COVER_ITEMS.map((item, idx) => {
            const isHovered = hoveredIdx === idx
            const isAnyHovered = hoveredIdx !== null

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cover-item group relative w-full py-4 md:py-6 cursor-pointer border-b border-white/[0.08] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8 w-full">
                  {/* Primary Title (Outfit Bold Font) */}
                  <div className="flex items-center">
                    {/* Massive Typography matching Screenshot */}
                    <h3
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight transition-all duration-300 leading-[1.05]"
                      style={{
                        color: isHovered
                          ? "#8b0100"
                          : isAnyHovered
                          ? "rgba(255, 225, 225, 0.22)"
                          : "rgba(255, 230, 230, 0.6)",
                        transform: isHovered ? "translateX(16px)" : "translateX(0)",
                        textShadow: "none",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Subtitle / Details (Pops on Hover) */}
                  <div
                    className="flex items-center gap-4 pl-8 md:pl-0 transition-all duration-300"
                    style={{
                      opacity: isHovered ? 1 : isAnyHovered ? 0.2 : 0.5,
                      transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                    }}
                  >
                    <span
                      className="text-xs sm:text-sm md:text-base font-medium tracking-wide transition-colors duration-300"
                      style={{ color: isHovered ? "#ffffff" : "rgba(255,255,255,0.4)" }}
                    >
                      {item.subtitle}
                    </span>

                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isHovered ? "#8b0100" : "rgba(255, 230, 230, 0.06)",
                        color: isHovered ? "#ffffff" : "rgba(255, 230, 230, 0.4)",
                        transform: isHovered ? "rotate(45deg) scale(1.1)" : "rotate(0) scale(1)",
                      }}
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default WhatWeCoverSection
