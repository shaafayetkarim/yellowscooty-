"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

// Production agency testimonials data
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Yellow Scooter delivered beyond our expectations. Their cinematic vision transformed our product launch into an unforgettable visual experience.",
    by: "Sarah Chen, Creative Director @ TechFlow",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SarahChen&backgroundColor=EAB308&textColor=000000",
  },
  {
    tempId: 1,
    testimonial:
      "The best production team we've worked with. Their attention to detail in post-production is unmatched. The color grading was pure magic.",
    by: "Marcus Johnson, Head of Marketing @ Peak",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MarcusJohnson&backgroundColor=EAB308&textColor=000000",
  },
  {
    tempId: 2,
    testimonial:
      "Cinematic, professional, and bold. They don't just film; they craft stories that resonate. Our brand engagement doubled after their campaign.",
    by: "Priya Patel, Founder @ Nexus",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=PriyaPatel&backgroundColor=EAB308&textColor=000000",
  },
  {
    tempId: 3,
    testimonial:
      "The energy they bring to the set is infectious. It's rare to find a team this passionate about every single frame. Highly recommended.",
    by: "David Rodriguez, Producer @ CineStream",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DavidRodriguez&backgroundColor=EAB308&textColor=000000",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
  isMobile: boolean
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize, isMobile }) => {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-6 sm:p-10 transition-all duration-700 ease-in-out border rounded-[2rem]",
        isCenter
          ? "z-10 glass-yellow scale-110 shadow-[0_0_50px_rgba(234,179,8,0.2)]"
          : "z-0 glass-dark opacity-40 hover:opacity-70 scale-90 blur-[1px] hover:blur-0",
      )}
      style={{
        width: cardSize,
        height: cardSize * (isMobile ? 1 : 0.8),
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.2) * position}px)
          translateY(${isCenter ? -20 : position % 2 ? 10 : -10}px)
          rotate(${isCenter ? 0 : position % 2 ? 5 : -5}deg)
        `,
      }}
    >
      <div className="relative h-full flex flex-col justify-between overflow-hidden">
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden glass-yellow p-1 shrink-0">
            <img
              src={testimonial.imgSrc || "/placeholder.svg"}
              alt={`${testimonial.by.split(",")[0]}`}
              className="w-full h-full object-cover rounded-lg sm:rounded-xl"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-black text-white text-xs sm:text-sm tracking-tight truncate">{testimonial.by.split(",")[0]}</h4>
            <span className="text-yellow-500 font-bold text-[8px] sm:text-[10px] uppercase tracking-widest truncate">{testimonial.by.split(",")[1]}</span>
          </div>
        </div>

        <h3 className={cn("text-sm sm:text-xl font-bold leading-tight sm:leading-snug tracking-tight", isCenter ? "text-white" : "text-white/60")}>
          "{testimonial.testimonial}"
        </h3>

        <div className="mt-4 sm:mt-6 flex items-center justify-between">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-yellow-500" />
            ))}
          </div>
          <span className="text-[8px] sm:text-[10px] font-black text-white/20 tracking-[0.2em] uppercase">VERIFIED PARTNER</span>
        </div>
      </div>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365)
  const [isMobile, setIsMobile] = useState(false)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
      setIsMobile(!matches)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            isMobile={isMobile}
          />
        )
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4">
        {[
          { icon: <ChevronLeft />, dir: -1, label: "Previous" },
          { icon: <ChevronRight />, dir: 1, label: "Next" },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleMove(btn.dir)}
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
              "glass-dark border border-white/5 text-white/40 hover:text-yellow-500 hover:border-yellow-500/30 hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50",
            )}
            aria-label={`${btn.label} testimonial`}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
