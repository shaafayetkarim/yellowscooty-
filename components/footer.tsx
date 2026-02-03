"use client"

import { motion } from "framer-motion"
import { Instagram, Mail, MapPin } from "lucide-react"

export default function Footer() {

  return (
    <footer id="footer" className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 items-center">
          {/* Left Side: Brand & Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-6 mb-12">
              <img src="/images/logo.png" alt="Yellow Scooter" className="w-16 h-16" />
              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-none">
                  YELLOW <span className="text-yellow-500">SCOOTER</span> <br />
                  <span className="text-lg md:text-xl text-white/80">PRODUCTION</span>
                </h3>
                <span className="text-white/20 text-[10px] font-black tracking-[0.5em] uppercase mt-2 block">Premium Production 2024</span>
              </div>
            </div>
            <p className="text-2xl text-white/40 leading-relaxed font-serif italic max-w-xl">
              "We turn light and shadow into visual legacies. Your vision, directed with cinematic excellence."
            </p>
          </motion.div>

          {/* Right Side: Information & Instagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-sm font-black text-yellow-500 mb-8 tracking-[0.4em] uppercase">HQ Dhaka</h4>
                <div className="space-y-6 text-white/60">
                  <div className="flex items-start space-x-4">
                    <MapPin size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                    <span className="font-bold text-xs tracking-widest uppercase leading-loose">
                      Yellow Scooter Production House,<br />
                      Dhaka, Bangladesh
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail size={20} className="text-yellow-500 flex-shrink-0" />
                    <a href="mailto:yellowscooterproduction@gmail.com" className="hover:text-yellow-500 transition-colors duration-300 font-black text-xs tracking-[0.1em]">
                      YELLOWSCOOTERPRODUCTION@GMAIL.COM
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-yellow-500 mb-8 tracking-[0.4em] uppercase">Follow The Vision</h4>
                <a
                  href="https://www.instagram.com/one_44p/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-8 py-5 glass border border-white/10 rounded-2xl text-white group hover:glass-yellow transition-all duration-500"
                >
                  <Instagram className="group-hover:scale-110 transition-transform" />
                  <span className="font-black tracking-[0.3em] uppercase text-xs">Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/20">
            © 2024 YELLOW SCOOTER PRODUCTION. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-12">
            {['Privacy', 'Legal', 'Terms'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-black tracking-[0.3em] uppercase text-white/20 hover:text-yellow-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Developer Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-2 pb-8"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white font-signature tracking-normal">
              By
            </span>
            <motion.a
              href="https://github.com/shaafayetkarim"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <span className="text-2xl font-bold text-white transition-all duration-500 group-hover:text-yellow-500 font-signature tracking-normal">
                Shafayet Karim
              </span>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-yellow-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Subtle underline animation */}
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-500 transition-all duration-500 group-hover:w-full" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
