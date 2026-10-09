"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScroll() {
  useEffect(() => {
    // Dynamic import/load of Lenis for buttery-smooth momentum scroll
    const script = document.createElement("script")
    script.src = "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"
    script.async = true
    script.onload = () => {
      // @ts-ignore
      if (window.Lenis) {
        // @ts-ignore
        const lenis = new window.Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        })

        // Synchronize with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update)

        const tickerCallback = (time: number) => {
          lenis.raf(time * 1000)
        }

        gsap.ticker.add(tickerCallback)
        gsap.ticker.lagSmoothing(0)

        // @ts-ignore
        window.__lenis = lenis

        return () => {
          gsap.ticker.remove(tickerCallback)
          lenis.destroy()
        }
      }
    }

    document.head.appendChild(script)

    return () => {
      // @ts-ignore
      if (window.__lenis) {
        // @ts-ignore
        window.__lenis.destroy()
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
