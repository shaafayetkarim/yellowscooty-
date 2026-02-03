"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const LoadingScreen = ({ onComplete }: { onComplete?: () => void }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    return 100
                }
                return prev + 2
            })
        }, 40)

        return () => clearInterval(timer)
    }, [])

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            onAnimationComplete={onComplete}
        >
            <div className="relative">
                {/* LOGO TEXT */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-2"
                >
                    YELLOW SCOOTER <span className="text-yellow-500 italic block text-3xl md:text-6xl mt-2">PRODUCTION</span>
                </motion.h1>

                {/* LOADING BAR */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-yellow-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <motion.p
                    className="text-yellow-500/50 text-[10px] font-black tracking-[0.5em] uppercase text-center mt-4"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Loading Experience
                </motion.p>
            </div>
        </motion.div>
    )
}
