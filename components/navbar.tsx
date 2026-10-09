"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null)
  const navBgRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const logoImgRef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      let scrollTween: gsap.core.Timeline | null = null

      const initAnimation = () => {
        if (scrollTween) {
          scrollTween.kill()
          scrollTween = null
        }

        const anchor = document.getElementById("hero-logo-anchor")
        const nav = navRef.current
        const logoWrapper = logoWrapperRef.current
        const navBg = navBgRef.current

        if (!anchor || !nav || !logoWrapper || !navBg) return

        const anchorRect = anchor.getBoundingClientRect()
        const navRect = nav.getBoundingClientRect()
        const currentScroll = window.scrollY

        // Center of the hero anchor relative to the document
        const anchorCenterDocY = anchorRect.top + currentScroll + anchorRect.height / 2
        // Center of the fixed navbar relative to viewport top
        const navCenterY = navRect.height / 2

        const deltaY = anchorCenterDocY - navCenterY

        // Target size in navbar: ~120px desktop, ~95px mobile
        const isMobile = window.innerWidth < 768
        const targetWidth = isMobile ? 95 : 125
        const currentAnchorWidth = anchorRect.width || (isMobile ? 320 : 580)
        const targetScale = Math.min(0.28, Math.max(0.16, targetWidth / currentAnchorWidth))

        // Set initial positions
        gsap.set(logoWrapper, {
          y: deltaY,
          scale: 1,
          transformOrigin: "center center",
          force3D: true,
        })
        gsap.set(navBg, { opacity: 0 })

        // Scrubbed GSAP timeline linking hero scroll to logo movement
        scrollTween = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "85% top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })

        // Logo slowly glides to navbar and scales down
        scrollTween.to(
          logoWrapper,
          {
            y: 0,
            scale: targetScale,
            ease: "power1.inOut",
          },
          0
        )

        // Glassmorphic background fades in smoothly as logo docks
        scrollTween.to(
          navBg,
          {
            opacity: 1,
            ease: "power2.inOut",
          },
          0.15
        )
      }

      // Initial setup
      initAnimation()

      // Refresh once images and fonts are loaded
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
        initAnimation()
      }, 1400)

      const handleResize = () => {
        initAnimation()
      }

      window.addEventListener("resize", handleResize)

      return () => {
        clearTimeout(timer)
        window.removeEventListener("resize", handleResize)
        if (scrollTween) scrollTween.kill()
      }
    }, navRef)

    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[60] h-16 md:h-20 flex items-center justify-center pointer-events-none"
    >
      {/* Glassmorphic Navbar Background - fades in smoothly as logo reaches navbar */}
      <div
        ref={navBgRef}
        className="absolute inset-0 w-full h-full backdrop-blur-xl bg-black/50 border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      />

      {/* Centered White Ares Logo - smoothly glides from hero center to navbar */}
      <div
        ref={logoWrapperRef}
        onClick={scrollToTop}
        className="relative z-10 pointer-events-auto cursor-pointer select-none"
        style={{
          transformOrigin: "center center",
          willChange: "transform",
        }}
        title="Ares Production - Scroll to top"
      >
        <div
          ref={logoImgRef}
          className="relative w-[300px] sm:w-[440px] md:w-[580px] lg:w-[680px] max-w-[88vw] aspect-[577/433] flex items-center justify-center"
        >
          <Image
            src="/hero main.png"
            alt="Ares"
            fill
            priority
            className="object-contain filter drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
          />
        </div>
      </div>
    </nav>
  )
}
