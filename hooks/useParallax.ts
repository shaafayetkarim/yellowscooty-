"use client"

import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion"
import { useRef, RefObject } from "react"

interface ParallaxOptions {
  speed?: number         // multiplier: positive = up, negative = down
  offset?: [string, string]
  springConfig?: { stiffness: number; damping: number }
}

/**
 * useParallax – returns a ref + springed y MotionValue for parallax effects.
 * Attach `ref` to the section container and `y` to a motion.div inside.
 */
export function useParallax(options: ParallaxOptions = {}) {
  const {
    speed = 0.15,
    offset = ["start end", "end start"],
    springConfig = { stiffness: 50, damping: 20 },
  } = options

  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: offset as [string, string],
  })

  // Map scroll 0→1 to y shift based on speed
  const rawY = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])
  const y = useSpring(rawY, springConfig)

  return { ref, y }
}

/**
 * useParallaxY – returns a MotionValue for y based on scroll, with spring smoothing.
 * Useful when you already have a ref from useScroll at a higher level.
 */
export function useScrollParallax(
  scrollYProgress: MotionValue<number>,
  inputRange: [number, number] = [0, 1],
  outputRange: [string, string] = ["10%", "-10%"],
  springConfig = { stiffness: 60, damping: 20 }
) {
  const rawY = useTransform(scrollYProgress, inputRange, outputRange)
  return useSpring(rawY, springConfig)
}
