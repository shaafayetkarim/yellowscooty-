"use client"

import { motion } from "framer-motion"

export function ApertureAnimation({ className }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full text-yellow-500/20"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                {/* Aperture blades */}
                {[...Array(8)].map((_, i) => (
                    <motion.path
                        key={i}
                        d="M 100,20 L 160,50 L 160,150 L 100,180 L 40,150 L 40,50 Z"
                        fill="currentColor"
                        initial={{ scale: 0.8, opacity: 0.3 }}
                        animate={{
                            scale: [0.8, 1.1, 0.8],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                        style={{
                            transformOrigin: "center",
                            rotate: i * 45
                        }}
                    />
                ))}
            </motion.svg>

            {/* Central "Lens" */}
            <motion.div
                className="absolute w-1/4 h-1/4 rounded-full glass-yellow flex items-center justify-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-1/2 h-1/2 rounded-full bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.8)]" />
            </motion.div>
        </div>
    )
}
