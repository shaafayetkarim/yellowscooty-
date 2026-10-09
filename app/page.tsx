"use client"

import HeroSection from "../hero-section"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import "./globals.css"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import ContactSection from "@/components/ui/contact-section"
import { DemoOne } from "@/components/demo"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { HandsSection } from "@/components/ui/hands-section"
import { GallerySection } from "@/components/ui/gallery-section"
import { WhatWeCoverSection } from "@/components/ui/what-we-cover"
import { GsapMissionSection } from "@/components/ui/gsap-mission-section"
import Footer from "@/components/footer"
import Image from "next/image"


import { AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { Navbar } from "@/components/navbar"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        // Hero Image
        "/hero main.png",
        // Logos
        "/ares1.webp",
        "/ares2.webp",
        // Founders (lowercase .jpg on disk)
        "https://i.ibb.co.com/PvrwFvBf/Simon-Reza.jpg",
        "https://i.ibb.co.com/kjfXyZT/Mohammad-Samir.jpg",
        "https://i.ibb.co.com/NQRC4LX/Eshan-Khondokar.jpg",
        // Gallery - Picu (standardizing with disk state)
        "/picu/DSC02042.jpg",
        "/picu/MUG09771.jpg",
        "/picu/UMY02097.JPG",
        "/picu/DSC00237.jpg",
        "/picu/UMY01999.JPG",
        "/picu/DSC04324.jpg",
        "/picu/MUG04939.jpg",
        "/picu/DSC06530.jpg",
        "/picu/UMY01810.jpg",
        "/picu/DSC00854.jpg",
        "/picu/DSC04377.jpg",
        "/picu/MUG05283.jpg"
      ]

      const loadImage = (url: string) => {
        return new Promise((resolve) => {
          const img = new window.Image()
          img.src = url
          img.onload = resolve
          img.onerror = resolve // Resolve even on error to prevent hanging
        })
      }

      try {
        await Promise.all(imageUrls.map(loadImage))
      } catch (err) {
        console.error("Failed to preload images", err)
      }
    }

    const init = async () => {
      // Wait for both minimum time AND critical image loading
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 6000)),
        preloadImages()
      ])
      setIsLoading(false)
    }

    init()
  }, [])

  const missionStatement =
    "At Ares Production, we don't just capture images; we capture the essence of movement and the soul of your story. From the cinematic streets of Dhaka to global landscapes, we bring a bold, fresh perspective to every frame. Our vision is rooted in the belief that every moment deserves a director's touch. Whether it's a high-octane commercial or an intimate documentary, we fuel your brand with visual excellence. Join us in redefining the art of visual storytelling, one frame at a time."

  const timelineEntries = [
    {
      id: 1,
      image: "/images/drne.png",
      alt: "Cinematographer at work",
      title: "Visionary Frames",
      description:
        "Every project starts with a vision. At Ares Production, we specialize in translating your complex ideas into stunning visual narratives. From pre-production to the final cut, we ensure your story is told with cinematic precision.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "/images/IMG_9143.JPG",
      alt: "Editing suite workflow",
      title: "The Art of the Cut",
      description:
        "Our post-production suite is where the magic happens. We blend high-end color grading, sound design, and rhythm to create an immersive experience that resonates with your audience long after the screen fades to black.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80",
      alt: "Photography lighting setup",
      title: "Global Production",
      description:
        "We are built for scale. Whether it's a local shoot or a multi-country production, our network of creators and top-tier equipment ensures that quality is never compromised. We travel wherever the story takes us.",
      layout: "left" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white" style={{ ["--selection-bg" as string]: "rgba(139,1,0,0.3)", ["--selection-color" as string]: "#8b0100" }}>
      <style>{`::selection { background: rgba(139,1,0,0.3); color: #ff4040; }`}</style>
      <Navbar />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ filter: "blur(20px)", opacity: 0 }}
        animate={{
          filter: isLoading ? "blur(20px)" : "blur(0px)",
          opacity: isLoading ? 0 : 1
        }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Randomized Gallery Section - Moved after Hero */}
        <GallerySection />

        {/* What We Cover Section */}
        <WhatWeCoverSection />

        {/* Timeline Section */}
        <section id="community" className="relative py-32 bg-black">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 mb-16 md:mb-20">
              <div className="text-left">
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6">
                  <span>crafting</span> <span style={{ color: "#8b0100" }}>excellence</span>
                </h2>
                <div className="h-1 w-24 rounded-full mb-6" style={{ background: "#8b0100" }} />
                <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
                  From concept to delivery, we follow a rigorous creative process that puts quality and storytelling at the forefront.
                </p>
              </div>
            </div>

            <Timeline entries={timelineEntries} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative py-32 bg-black border-t border-white/5">
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
            {/* Brand Logo Carousel moved here */}
            <div className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-left mb-14 md:mb-20"
              >
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6">
                  <span>trusted by</span> <span style={{ color: "#8b0100" }}>giants</span>
                </h2>
                <div className="h-1 w-24 rounded-full" style={{ background: "#8b0100" }} />
              </motion.div>
              <LogoCarousel />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-right mb-16 md:mb-20"
            >
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6">
                <span>it&apos;s always</span> <span style={{ color: "#8b0100" }}>clients say</span>
              </h2>
              <div className="h-1 w-24 rounded-full mb-6 ml-auto" style={{ background: "#8b0100" }} />
              <p className="text-lg md:text-xl text-white/50 max-w-2xl ml-auto leading-relaxed">
                Trusted by leading brand visionaries to tell their most ambitious stories.
              </p>
            </motion.div>

            <StaggerTestimonials />
          </div>
        </section>

        {/* Hands Behind The Scene Section */}
        <HandsSection />

        {/* Page-Wide GSAP Animated Mission Section */}
        <GsapMissionSection />

        {/* Simple & Clean Contact Form Section */}
        <ContactSection />

        <Footer />
      </motion.div>
    </div>
  )
}
