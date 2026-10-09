"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export const LoadingScreen = ({ onComplete }: { onComplete?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete()
        },
      })

      // Set initial states
      gsap.set([line1Ref.current, line2Ref.current], {
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)",
      })

      // --- SEQUENCE ---

      // 1. Line 1 Slowly Appears ("need 📸 ?")
      tl.to(line1Ref.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.3,
        ease: "power2.out",
      })
        .to({}, { duration: 0.6 }) // Calm hold

        // 2. Line 1 Slowly Disappears (Gone)
        .to(line1Ref.current, {
          opacity: 0,
          scale: 1.06,
          filter: "blur(20px)",
          duration: 0.9,
          ease: "power2.in",
        })
        .to({}, { duration: 0.3 }) // Brief transition pause

        // 3. Line 2 Slowly Appears ("gotchu 😉")
        .to(line2Ref.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power2.out",
        })
        .to({}, { duration: 0.7 }) // Calm hold

        // 4. Line 2 Slowly Disappears
        .to(line2Ref.current, {
          opacity: 0,
          scale: 1.06,
          filter: "blur(20px)",
          duration: 0.9,
          ease: "power2.in",
        })

        // 5. Calm Loader Screen Fade Out
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.4"
        )
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white select-none overflow-hidden"
    >
      <div className="relative flex items-center justify-center text-center px-4 w-full min-h-[220px]">
        {/* Line 1: need 📸 ? */}
        <div
          ref={line1Ref}
          className="absolute font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter lowercase text-white inline-flex items-center justify-center gap-1.5 sm:gap-3 whitespace-nowrap leading-none"
        >
          <span>need</span>
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl inline-flex items-center self-center translate-y-[-2px]">
            📸
          </span>
          <span>?</span>
        </div>

        {/* Line 2: gotchu 😉 */}
        <div
          ref={line2Ref}
          className="absolute font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter lowercase text-white inline-flex items-center justify-center gap-1.5 sm:gap-3 whitespace-nowrap leading-none"
        >
          <span>gotchu</span>
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl inline-flex items-center self-center translate-y-[-2px]">
            😉
          </span>
        </div>
      </div>
    </div>
  )
}
