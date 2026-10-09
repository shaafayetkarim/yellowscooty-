"use client"

import Image from "next/image"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "On Focus", href: "#gallery" },
    { name: "What We Cover", href: "#coverage" },
    { name: "Process", href: "#community" },
    { name: "Clients", href: "#testimonials" },
    { name: "The Mission", href: "#mission" },
    { name: "Inquiries", href: "#join" },
  ]

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
  ]

  return (
    <footer id="footer" className="relative w-full bg-white text-zinc-900 border-t border-zinc-200 font-outfit select-none">
      {/* Content Section */}
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-16 md:pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Massive Red Logo Image */}
            <div className="relative w-full max-w-[850px] h-36 sm:h-52 md:h-64 lg:h-72 -ml-2">
              <Image
                src="/redfg.png"
                alt="Ares Production"
                fill
                priority
                className="object-contain object-[left_top]"
              />
            </div>

            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-sm font-normal">
              Capturing the raw essence of movement and cinematic narrative. Directed for global screens and ambitious storytellers.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8b0100] animate-pulse" />
                Available Worldwide
              </span>
              <span>·</span>
              <span>Dhaka HQ</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-[0.25em] text-zinc-400">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-zinc-600 hover:text-[#8b0100] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Contact Column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-[0.25em] text-zinc-400 mb-4">
                Follow The Vision
              </h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:border-[#8b0100] hover:bg-[#8b0100] hover:text-white transition-all duration-300"
                  >
                    {soc.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block">
                Direct Inquiries
              </span>
              <a
                href="mailto:aresproduction@gmail.com"
                className="text-sm sm:text-base font-bold text-zinc-900 hover:text-[#8b0100] transition-colors block"
              >
                aresproduction@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-16 pt-8 border-t border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500">
          <p>© {new Date().getFullYear()} ARES PRODUCTION. ALL RIGHTS RESERVED.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-700 hover:text-[#8b0100] transition-colors uppercase font-bold tracking-wider cursor-pointer"
          >
            <span>Back To Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
