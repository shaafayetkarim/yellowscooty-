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
    <div ref={containerRef} className={cn("relative font-outfit", className)}>
      {/* Central Timeline Line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-[1px] transform -translate-x-1/2 hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(139,1,0,0.4), transparent)",
        }}
      />

      {entries.map((entry, index) => (
        <TimelineItem
          key={entry.id}
          entry={entry}
          index={index}
          scrollProgress={scrollYProgress}
        />
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
  const scale = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92])

  const isLeft = entry.layout === "left"

  return (
    <motion.div ref={itemRef} style={{ opacity, scale }} className="relative mb-28 md:mb-40">
      {/* Timeline Center Dot */}
      <div
        className="absolute left-1/2 top-1/2 w-3.5 h-3.5 border-2 border-white rounded-none transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
        style={{ background: "#8b0100", boxShadow: "0 0 20px rgba(139,1,0,0.8)" }}
      />

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image Container with Form Corner Accents */}
          <div
            className={cn("relative group", {
              "md:order-2": isLeft,
              "md:order-1": !isLeft,
            })}
          >
            <div className="relative p-3 sm:p-4 bg-zinc-950/70 border border-white/10 backdrop-blur-md rounded-none">
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />

              <div className="relative overflow-hidden aspect-[16/10] bg-black border border-white/10">
                <img
                  src={entry.image || "/placeholder.svg"}
                  alt={entry.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
              </div>
            </div>
          </div>

          {/* Text Content with Form Architectural Style (Left Aligned) */}
          <div
            className={cn("relative text-left", {
              "md:order-1": isLeft,
              "md:order-2": !isLeft,
            })}
          >
            <motion.div
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-10 bg-zinc-950/70 border border-white/10 backdrop-blur-md rounded-none space-y-4"
            >
              {/* Form Corner Accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {entry.title}
              </h3>
              <div className="h-1 w-16 rounded-full" style={{ background: "#8b0100" }} />
              <p className="text-base sm:text-lg leading-relaxed text-white/60 font-normal">
                {entry.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
