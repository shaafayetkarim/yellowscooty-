"use client"

import HeroSection from "../hero-section"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import "./globals.css"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"
import { DemoOne } from "@/components/demo"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { HandsSection } from "@/components/ui/hands-section"
import { GallerySection } from "@/components/ui/gallery-section"
import Footer from "@/components/footer"
import Image from "next/image"


import { AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { Navbar } from "@/components/navbar"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const missionStatement =
    "At Yellow Scooter Production, we don't just capture images; we capture the essence of movement and the soul of your story. From the cinematic streets of Dhaka to global landscapes, we bring a bold, fresh perspective to every frame. Our vision is rooted in the belief that every moment deserves a director's touch. Whether it's a high-octane commercial or an intimate documentary, we fuel your brand with visual excellence. Join us in redefining the art of visual storytelling, one frame at a time."

  const timelineEntries = [
    {
      id: 1,
      image: "/images/drne.png",
      alt: "Cinematographer at work",
      title: "Visionary Frames",
      description:
        "Every project starts with a vision. At Yellow Scooter, we specialize in translating your complex ideas into stunning visual narratives. From pre-production to the final cut, we ensure your story is told with cinematic precision.",
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
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 selection:text-yellow-500">
      <Navbar />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
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

        {/* Timeline Section */}
        <section id="community" className="relative py-32 bg-black">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <div className="container mx-auto px-6 mb-24">
              <div className="text-center">
                <span className="text-yellow-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block">Process & Perfection</span>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-white">CRAFTING EXCELLENCE</h2>
                <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto leading-relaxed">
                  From concept to delivery, we follow a rigorous creative process that puts quality and storytelling at the forefront.
                </p>
              </div>
            </div>

            <Timeline entries={timelineEntries} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative py-32 bg-black border-t border-white/5">
          <div className="container mx-auto px-6 relative z-10">
            {/* Brand Logo Carousel moved here */}
            <div className="mb-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="text-yellow-500 font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">Industry Partners</span>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                  TRUSTED BY <span className="text-yellow-500 italic">GIANTS</span>
                </h3>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mx-auto mt-4" />
              </motion.div>
              <LogoCarousel />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-yellow-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Director's Vouchers</span>
              <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-white mb-8">
                IT'S ALWAYS <br />
                <span className="text-yellow-500 italic drop-shadow-[0_5px_15px_rgba(234,179,8,0.2)] uppercase">Clients Say</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto leading-relaxed">
                Trusted by the architects of modern cinema and the rebels of visual storytelling.
              </p>
            </motion.div>

            <StaggerTestimonials />
          </div>
        </section>

        {/* Hands Behind The Scene Section */}
        <HandsSection />

        {/* Mission Statement Section - Moved and Redesigned */}
        <section id="mission" className="relative min-h-screen flex items-center justify-center py-40 bg-black overflow-hidden border-t border-white/5">
          {/* Advanced Background Layering */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80"
              alt="Cinematic Background"
              fill
              className="object-cover opacity-[0.07] scale-110 blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-1" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-yellow-500/10 to-transparent opacity-30 z-1" />

          {/* Dynamic Glows */}
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-yellow-500/10 blur-[180px] rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-yellow-500/5 blur-[150px] rounded-full"
          />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mb-16 relative"
              >
                <span className="text-yellow-500 font-black tracking-[0.6em] uppercase text-[10px] mb-6 block">Our Manifesto</span>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-white relative">
                  THE MISSION
                  <motion.span
                    animate={{ opacity: [0, 0.5, 0], x: [-10, 10, -10] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                    className="absolute inset-0 text-yellow-500/30 blur-sm -z-10"
                  >
                    THE MISSION
                  </motion.span>
                </h2>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-8" />
              </motion.div>

              <div className="relative max-w-4xl mx-auto">
                {/* Card Container */}
                <div className="glass-dark border border-white/10 rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl backdrop-blur-md">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-50" />
                  <div className="absolute -left-10 -top-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Stylish Serif Font with Gradient Scroll */}
                  <TextGradientScroll
                    text={missionStatement}
                    className="text-xl md:text-3xl lg:text-4xl font-serif italic leading-relaxed tracking-wide text-white/90 drop-shadow-lg text-center"
                    type="word"
                    textOpacity="soft"
                  />
                </div>

                {/* Decorative side accent - adjusted position */}
                <div className="absolute -left-4 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent hidden xl:block" />
                <div className="absolute -right-4 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent hidden xl:block" />
              </div>

            </div>
          </div>
        </section>

        {/* Smooth Scroll Hero with CTA Overlay */}
        <section id="join" className="relative">
          <SmoothScrollHero
            scrollHeight={2500}
            desktopImage="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=2000&q=100"
            mobileImage="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=100"
            initialClipPercentage={20}
            finalClipPercentage={80}
          />
        </section>

        <Footer />
      </motion.div>
    </div>
  )
}
