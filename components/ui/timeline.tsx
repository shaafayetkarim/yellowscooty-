"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface TimelineEntry {
  id: number
  image: string
  alt: string
  title: string
  description: string
  layout: "left" | "right"
}

interface TimelineProps {
  entries: TimelineEntry[]
  className?: string
}

export function Timeline({ entries, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent transform -translate-x-1/2 hidden md:block" />

      {entries.map((entry, index) => (
        <TimelineItem key={entry.id} entry={entry} index={index} scrollProgress={scrollYProgress} />
      ))}
    </div>
  )
}

interface TimelineItemProps {
  entry: TimelineEntry
  index: number
  scrollProgress: any
}

function TimelineItem({ entry, index, scrollProgress }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  })

  const opacity = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2])
  const scale = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9])

  const isLeft = entry.layout === "left"

  return (
    <motion.div ref={itemRef} style={{ opacity, scale }} className="relative mb-32 md:mb-48">
      {/* Timeline Dot */}
      <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block shadow-[0_0_15px_rgba(234,179,8,0.8)]" />

      <div className="container mx-auto px-6">
        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center", {
            "md:text-right": isLeft,
          })}
        >
          {/* Image */}
          <div
            className={cn("relative group", {
              "md:order-2": isLeft,
              "md:order-1": !isLeft,
            })}
          >
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-3xl aspect-[16/10] bg-zinc-900 border border-white/10 glass">
                <img
                  src={entry.image || "/placeholder.svg"}
                  alt={entry.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={cn("relative", {
              "md:order-1": isLeft,
              "md:order-2": !isLeft,
            })}
          >
            <div className="sticky top-40">
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className={cn("flex items-center gap-4", isLeft ? "md:justify-end" : "justify-start")}>
                  <span className="text-yellow-500 font-black text-6xl opacity-20">0{index + 1}</span>
                  <div className="h-[1px] w-12 bg-yellow-500/50" />
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-none">
                  {entry.title}
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-white/50 max-w-lg mx-auto md:mx-0">
                  {entry.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
