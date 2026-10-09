"use client"

import { useScroll, useTransform, motion, useSpring } from "framer-motion"
import { useRef } from "react"
import { Instagram } from "lucide-react"
import Image from "next/image"

const founders = [
  {
    name: "Mohammad Samir",
    designations: ["Cinematographer", "Director"],
    src: "https://i.ibb.co.com/kjfXyZT/Mohammad-Samir.jpg",
    instagram: "https://instagram.com",
  },
  {
    name: "Simon Reza",
    designations: ["Director of Photography", "Editor"],
    src: "https://i.ibb.co.com/PvrwFvBf/Simon-Reza.jpg",
    instagram: "https://instagram.com",
  },
  {
    name: "Eshan Khondokar",
    designations: ["Creative Director", "Colorist"],
    src: "https://i.ibb.co.com/NQRC4LX/Eshan-Khondokar.jpg",
    instagram: "https://instagram.com",
  },
]

export const HandsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const headingY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"])

  return (
    <section id="hands" ref={containerRef} className="relative py-32 md:py-40 bg-black text-white overflow-hidden border-t border-white/5 font-outfit">
      {/* Background Orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: glowY }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px]" style={{ background: "rgba(139,1,0,0.06)" }} />
      </motion.div>

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Section Heading */}
        <motion.div style={{ y: headingY }} className="text-left mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6">
              <span>hands behind</span> <span style={{ color: "#8b0100" }}>the scene</span>
            </h2>
            <div className="h-1 w-24 rounded-full" style={{ background: "#8b0100" }} />
          </motion.div>
        </motion.div>

        {/* Founder Cards Grid with Form Architectural Style */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {founders.map((founder, idx) => (
            <FounderCard key={founder.name} founder={founder} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderCard({ founder, idx }: { founder: typeof founders[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const depths = [0.05, 0.08, 0.05]
  const d = depths[idx]
  const rawY = useTransform(scrollYProgress, [0, 1], [`${d * 100}%`, `${-d * 100}%`])
  const y = useSpring(rawY, { stiffness: 55, damping: 22 })

  return (
    <motion.div ref={cardRef} style={{ y }} className="group">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: idx * 0.15 }}
        viewport={{ once: true }}
        className="relative p-6 sm:p-8 bg-zinc-950/70 border border-white/10 backdrop-blur-md rounded-none"
      >
        {/* Architectural Corner Accents (Matching Contact Form) */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />

        {/* Founder Photo */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-none border border-white/15 mb-6">
          <Image
            src={founder.src}
            alt={founder.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />

          {/* Instagram Button */}
          <motion.a
            href={founder.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 w-10 h-10 bg-black/60 border border-white/20 hover:border-[#8b0100] hover:bg-[#8b0100] flex items-center justify-center text-white z-20 transition-all rounded-none cursor-pointer"
          >
            <Instagram size={18} />
          </motion.a>
        </div>

        {/* Info & Designations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {founder.name}
            </h3>
          </div>
          <span className="font-bold text-xs uppercase tracking-widest block" style={{ color: "#8b0100" }}>
            Founder
          </span>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
            {founder.designations.map((designation) => (
              <span
                key={designation}
                className="px-3 py-1 bg-white/[0.04] border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/70 rounded-none"
              >
                {designation}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default HandsSection
