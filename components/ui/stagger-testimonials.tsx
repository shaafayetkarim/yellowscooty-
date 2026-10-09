"use client"

import React, { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface Testimonial {
  tempId: number
  testimonial: string
  by: string
  imgSrc: string
}

const testimonials: Testimonial[] = [
  {
    tempId: 0,
    testimonial:
      "Ares Production redefined our visual identity. Their technical mastery and cinematic pacing produced a campaign that set new industry benchmarks.",
    by: "Tanvir Hossain, Executive Creative Director",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 1,
    testimonial:
      "From pre-production strategy to the final color grade, their team delivered an incredible documentary film. Truly visionary storytelling.",
    by: "Nadia Rahman, Head of Brand Strategy",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 2,
    testimonial:
      "Working with Ares on our flagship commercial was effortless. They turned complex concepts into breathtaking broadcast visuals.",
    by: "Syed Al-Mansoor, Global Marketing VP",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 3,
    testimonial:
      "Their live mega-event coverage was executed with military precision and cinematic flair. The results blew our board away.",
    by: "Farhan Ahmed, Festival Director",
    imgSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
  },
  {
    tempId: 4,
    testimonial:
      "Ares Production brings a world-class standard to Bangladesh media production. They operate at the highest level of craftsmanship.",
    by: "Sabrina Karim, Lead Communications Director",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  },
]

/* ─── Desktop Card (stacked carousel) ─── */
interface DesktopCardProps {
  position: number
  testimonial: Testimonial
  handleMove: (steps: number) => void
  cardSize: number
}

const DesktopCard: React.FC<DesktopCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0
  const authorName = testimonial.by.split(",")[0]
  const authorTitle = testimonial.by.split(",")[1] || ""

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-6 sm:p-8 transition-all duration-700 ease-in-out border rounded-none font-outfit select-none",
        isCenter
          ? "z-10 bg-zinc-950/90 border-white/25 scale-105 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          : "z-0 bg-zinc-950/40 border-white/10 opacity-30 hover:opacity-60 scale-90 blur-[1px] hover:blur-0"
      )}
      style={{
        width: cardSize,
        height: cardSize * 0.82,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.18) * position}px)
          translateY(${isCenter ? -15 : position % 2 ? 10 : -10}px)
          rotate(${isCenter ? 0 : position % 2 ? 4 : -4}deg)
        `,
      }}
    >
      {isCenter && (
        <>
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/60" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/60" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/60" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/60" />
        </>
      )}

      <div className="relative h-full flex flex-col justify-between overflow-hidden">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-none overflow-hidden border border-white/20 p-0.5 shrink-0 bg-black">
            <img src={testimonial.imgSrc} alt={authorName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-bold text-white text-sm sm:text-base tracking-tight truncate">{authorName}</h4>
            {authorTitle && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8b0100] truncate">
                {authorTitle}
              </span>
            )}
          </div>
        </div>

        <p className={cn("text-xs sm:text-sm font-medium leading-relaxed tracking-normal", isCenter ? "text-white/90" : "text-white/50")}>
          &ldquo;{testimonial.testimonial}&rdquo;
        </p>

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#8b0100" }} />
            ))}
          </div>
          <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">VERIFIED CLIENT</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Mobile Card (single card, swipeable) ─── */
interface MobileCardProps {
  testimonial: Testimonial
}

const MobileCard: React.FC<MobileCardProps> = ({ testimonial }) => {
  const authorName = testimonial.by.split(",")[0]
  const authorTitle = testimonial.by.split(",")[1] || ""

  return (
    <div className="relative w-full p-6 bg-zinc-950/90 border border-white/25 font-outfit select-none">
      {/* Corner Accents */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/60" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/60" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/60" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/60" />

      <div className="flex flex-col gap-5">
        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 overflow-hidden border border-white/20 p-0.5 shrink-0 bg-black">
            <img src={testimonial.imgSrc} alt={authorName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-bold text-white text-sm tracking-tight truncate">{authorName}</h4>
            {authorTitle && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8b0100] truncate">
                {authorTitle}
              </span>
            )}
          </div>
        </div>

        {/* Quote */}
        <p className="text-sm font-medium leading-relaxed text-white/90">
          &ldquo;{testimonial.testimonial}&rdquo;
        </p>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#8b0100" }} />
            ))}
          </div>
          <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">VERIFIED CLIENT</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */
export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(380)
  const [isMobile, setIsMobile] = useState(false)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleMove = useCallback((steps: number) => {
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
  }, [testimonialsList])

  const handleMobileNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const handleMobilePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Touch swipe handlers for mobile
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart === null) return
      const touchEnd = e.changedTouches[0].clientX
      const diff = touchStart - touchEnd
      if (Math.abs(diff) > 50) {
        if (diff > 0) handleMobileNext()
        else handleMobilePrev()
      }
      setTouchStart(null)
    },
    [touchStart, handleMobileNext, handleMobilePrev]
  )

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setIsMobile(true)
        setCardSize(width - 48)
      } else if (width < 1024) {
        setIsMobile(false)
        setCardSize(340)
      } else {
        setIsMobile(false)
        setCardSize(390)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  /* ─── Mobile: single card with swipe + dots ─── */
  if (isMobile) {
    return (
      <div className="w-full select-none">
        {/* Swipeable Card */}
        <div
          className="w-full px-4 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="transition-all duration-500 ease-in-out">
            <MobileCard testimonial={testimonials[activeIndex]} />
          </div>
        </div>

        {/* Navigation: Arrows + Dots */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handleMobilePrev}
            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-[#8b0100] transition-colors"
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === activeIndex ? "w-6 bg-[#8b0100]" : "bg-white/30"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleMobileNext}
            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-[#8b0100] transition-colors"
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  /* ─── Desktop: stacked carousel ─── */
  return (
    <div className="relative w-full h-[440px] flex items-center justify-center overflow-hidden select-none">
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
        {testimonialsList.map((t, index) => {
          const position = index - Math.floor(testimonialsList.length / 2)
          return (
            <DesktopCard
              key={t.tempId}
              position={position}
              testimonial={t}
              handleMove={handleMove}
              cardSize={cardSize}
            />
          )
        })}
      </div>
    </div>
  )
}

export default StaggerTestimonials
