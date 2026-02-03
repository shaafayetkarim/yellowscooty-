"use client"

import React from "react"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import Image from "next/image"

const founders = [
    {
        name: "Simon",
        designations: ["Photographer", "Cinematographer", "Drone Operator"],
        instagram: "https://www.instagram.com/simonreza_/",
        image: "/hands/Simon Reza.jpg",
    },
    {
        name: "Samir",
        designations: ["Editor", "Photographer", "Cinematographer"],
        instagram: "https://www.instagram.com/mohammad.samirr/",
        image: "/hands/Mohammad Samir.jpg",
    },
    {
        name: "Ishan",
        designations: ["Cinematographer", "Editor"],
        instagram: "https://www.instagram.com/__._ishan_.__/",
        image: "/hands/Eshan Khondokar.jpg",
    },
]

export const HandsSection = () => {
    return (
        <section id="hands" className="relative py-32 bg-black overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-yellow-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block">The Visionaries</span>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8">
                        HANDS BEHIND <br />
                        <span className="text-yellow-500 italic drop-shadow-[0_5px_15px_rgba(234,179,8,0.2)]">THE SCENE</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {founders.map((founder, idx) => (
                        <motion.div
                            key={founder.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] glass border border-white/10 mb-8">
                                <Image
                                    src={founder.image}
                                    alt={founder.name}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                                {/* Social Icon */}
                                <motion.a
                                    href={founder.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="absolute top-6 right-6 w-12 h-12 glass-yellow rounded-2xl flex items-center justify-center text-white border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.3)] z-20"
                                >
                                    <Instagram size={20} />
                                </motion.a>
                            </div>

                            {/* Content */}
                            <div className="px-2">
                                <h3 className="text-3xl font-black text-white tracking-tighter mb-1 flex items-center gap-3">
                                    {founder.name}
                                    <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <span className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Founder</span>

                                <div className="flex flex-wrap gap-2">
                                    {founder.designations.map((designation) => (
                                        <span
                                            key={designation}
                                            className="px-3 py-1 glass-dark border border-white/5 rounded-full text-[10px] font-black tracking-widest uppercase text-white/50"
                                        >
                                            {designation}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative founder quote or designation text */}
                            <div className="absolute -bottom-4 -right-4 text-8xl font-black text-white/[0.03] pointer-events-none select-none italic uppercase">
                                {founder.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
