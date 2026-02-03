"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const brands = [
    { name: "Brand 1", src: "/Brands/67e8def3f0569de8686751674db28fab.png" },
    { name: "Brand 2", src: "/Brands/Asset_1_300x_eb69d38f-4bb9-4cf6-b6a9-fb8a2b493c56.avif" },
    { name: "Brand 3", src: "/Brands/KUDOS-Logo.svg" },
    { name: "Brand 4", src: "/Brands/Screenshot 2026-01-02 210747.png" },
    { name: "Brand 5", src: "/Brands/Screenshot 2026-01-02 211236.png" },
    { name: "Brand 6", src: "/Brands/Screenshot 2026-01-02 211423.png" },
    { name: "Brand 7", src: "/Brands/Screenshot 2026-01-03 003326.png" },
    { name: "Brand 8", src: "/Brands/Screenshot 2026-01-03 003620.png" },
    { name: "Brand 9", src: "/Brands/Screenshot 2026-01-03 003817.png" },
    { name: "Brand 10", src: "/Brands/Screenshot 2026-01-03 004011.png" },
    { name: "Brand 11", src: "/Brands/Screenshot 2026-01-03 004057.png" },
    { name: "Brand 12", src: "/Brands/airtel_dark_logo.d5bac2e1.svg" },
    { name: "Brand 13", src: "/Brands/eventBox.png" },
]

export const LogoCarousel = () => {
    // Triple the list to ensure smooth infinite loop
    const duplicatedBrands = [...brands, ...brands, ...brands]

    return (
        <div className="relative w-full overflow-hidden py-20 group">
            {/* Gradient Mask for Fade Effect */}
            <div className="absolute left-0 top-0 z-20 h-full w-40 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute right-0 top-0 z-20 h-full w-40 bg-gradient-to-l from-black to-transparent" />

            <motion.div
                className="flex gap-12 w-fit"
                animate={{
                    x: ["0%", "-33.33%"],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {duplicatedBrands.map((brand, index) => (
                    <motion.div
                        key={index}
                        initial="initial"
                        whileInView="animate"
                        viewport={{
                            margin: "-40% 0% -40% 0%",
                            once: false,
                        }}
                        className="flex items-center justify-center min-w-[180px] sm:min-w-[220px] h-[100px] sm:h-[120px] glass-dark rounded-[2rem] border border-white/5 p-6 sm:p-8 transition-all duration-500 hover:border-yellow-500/30 hover:bg-yellow-500/5 group/logo"
                    >
                        <motion.div
                            variants={{
                                initial: { filter: "grayscale(100%)", opacity: 0.3 },
                                animate: { filter: "grayscale(0%)", opacity: 1 }
                            }}
                            className="relative w-full h-full transition-all duration-500 group-hover/logo:filter-none group-hover/logo:opacity-100"
                        >
                            <Image
                                src={brand.src}
                                alt={brand.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 180px, 220px"
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
