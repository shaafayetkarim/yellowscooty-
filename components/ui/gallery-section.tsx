"use client"

import React from "react"
import { motion } from "framer-motion"
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
    return (
        <section id="gallery" className="relative py-32 bg-black overflow-hidden border-t border-white/5">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-yellow-500 font-black tracking-[0.5em] uppercase text-xs mb-4 block">Capturing Moments</span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8">
                        <span className="text-yellow-500 italic drop-shadow-[0_5px_15px_rgba(234,179,8,0.3)] font-serif uppercase">On</span> FOCUS
                    </h2>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto" />
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6 max-w-7xl mx-auto grid-flow-dense">
                    {galleryImages.map((image, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                filter: "grayscale(0%)",
                            }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: false, margin: "-10% 0% -10% 0%" }}
                            className={cn(
                                "group relative overflow-hidden rounded-[2rem] glass border border-white/10",
                                image.className
                            )}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className={cn(
                                        "object-cover transition-all duration-700 group-hover:scale-110",
                                        "md:grayscale md:opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100",
                                        "max-md:grayscale-0 max-md:opacity-100" // Always reveal on mobile once in view
                                    )}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <p className="text-yellow-500 font-black tracking-widest text-[10px] uppercase mb-1">Yellow Scooter</p>
                                <h4 className="text-white font-bold text-sm tracking-tight capitalize">{image.alt}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
