"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

const galleryImages = [
    { src: "/picu/DSC02042.jpg", className: "md:col-span-2 md:row-span-2", alt: "Cinematic Capture" },
    { src: "/picu/MUG09771.jpg", className: "md:col-span-1 md:row-span-2", alt: "Editorial" },
    { src: "/picu/UMY02097.JPG", className: "md:col-span-1 md:row-span-2", alt: "Portrait" },
    { src: "/picu/DSC00237.jpg", className: "md:col-span-2 md:row-span-1", alt: "Street" },
    { src: "/picu/UMY01999.JPG", className: "md:col-span-1 md:row-span-1", alt: "Moment" },
    { src: "/picu/DSC04324.jpg", className: "md:col-span-1 md:row-span-1", alt: "Cinematic" },
    { src: "/picu/MUG04939.jpg", className: "md:col-span-2 md:row-span-2", alt: "Vision" },
    { src: "/picu/DSC06530.jpg", className: "md:col-span-1 md:row-span-1", alt: "Perspective" },
    { src: "/picu/UMY01810.jpg", className: "md:col-span-1 md:row-span-1", alt: "Frame" },
    { src: "/picu/DSC00854.jpg", className: "md:col-span-2 md:row-span-1", alt: "Composition" },
    { src: "/picu/DSC04377.jpg", className: "md:col-span-1 md:row-span-1", alt: "Atmosphere" },
    { src: "/picu/MUG05283.jpg", className: "md:col-span-1 md:row-span-1", alt: "Texture" },
    { src: "/picu/Screenshot 2026-01-03 021105.png", className: "md:col-span-2 md:row-span-2", alt: "Creative" },
    { src: "/picu/Screenshot 2026-01-03 021202.png", className: "md:col-span-1 md:row-span-1", alt: "Design" },
    { src: "/picu/Screenshot 2026-01-03 021230.png", className: "md:col-span-1 md:row-span-2", alt: "Modern" },
    { src: "/picu/Screenshot 2026-01-03 021432.png", className: "md:col-span-2 md:row-span-2", alt: "Visual" },
    { src: "/picu/Screenshot 2026-01-03 021537.png", className: "md:col-span-1 md:row-span-1", alt: "Graphic" },
    { src: "/picu/Screenshot 2026-01-03 021610.png", className: "md:col-span-2 md:row-span-1", alt: "Motion" },
    { src: "/picu/beef chili lime.jpg", className: "md:col-span-2 md:row-span-1", alt: "Culinary" },
    { src: "/picu/frenchfry.jpg", className: "md:col-span-2 md:row-span-1", alt: "Detail" },
]

export const GallerySection = () => {
    const sectionRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    // Heading floats up
    const rawHeadingY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])
    const headingY = useSpring(rawHeadingY, { stiffness: 50, damping: 20 })

    // Subtle background shift
    const rawBgY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"])
    const bgY = useSpring(rawBgY, { stiffness: 30, damping: 15 })

    return (
        <section ref={sectionRef} id="gallery" className="parallax-section py-32 bg-black border-t border-white/5">
            {/* Parallax ambient glow layer */}
            <motion.div
                className="absolute inset-0 pointer-events-none parallax-layer"
                style={{ y: bgY }}
            >
                <div className="absolute inset-0 bg-grid-subtle opacity-10" />
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px]" style={{ background: "rgba(139,1,0,0.05)" }} />
            </motion.div>

            <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
                {/* Parallax heading - Left aligned Form style */}
                <motion.div
                    style={{ y: headingY }}
                    className="parallax-layer text-left mb-14 md:mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6">
                            <span>right at</span> <span style={{ color: "#8b0100" }}>you...</span>
                        </h2>
                        <div className="h-1 w-24 rounded-full" style={{ background: "#8b0100" }} />
                    </motion.div>
                </motion.div>

                {/* Bento Grid - Full Width */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[260px] md:auto-rows-[300px] gap-6 grid-flow-dense">
                    {galleryImages.map((image, idx) => (
                        <GalleryItem key={idx} image={image} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function GalleryItem({ image, idx }: { image: typeof galleryImages[0]; idx: number }) {
    const itemRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"],
    })

    // Alternate parallax directions for visual depth: odd items go up, even go slightly down
    const direction = idx % 3 === 0 ? 0.08 : idx % 3 === 1 ? 0.05 : 0.06
    const sign = idx % 2 === 0 ? 1 : -1
    const rawY = useTransform(
        scrollYProgress,
        [0, 1],
        [`${sign * direction * 100}%`, `${-sign * direction * 100}%`]
    )
    const y = useSpring(rawY, { stiffness: 55, damping: 22 })

    return (
        <motion.div
            ref={itemRef}
            style={{ y }}
            className={cn(
                "group relative overflow-hidden rounded-[2rem] glass border border-white/10 shadow-depth parallax-layer",
                image.className
            )}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: (idx % 5) * 0.06 }}
                viewport={{ once: false, margin: "-10% 0% -10% 0%" }}
                className="relative w-full h-full"
            >
                <div className="relative w-full h-full">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h4 className="text-white font-bold text-sm tracking-tight capitalize text-shadow-deep">
                        {image.alt}
                    </h4>
                </div>
            </motion.div>
        </motion.div>
    )
}
