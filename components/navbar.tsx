"use client"

import { Menu, X, Instagram, Twitter, Facebook } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: "Home", href: "#hero" },
        { name: "On Focus", href: "#gallery" },
        { name: "Visionaries", href: "#hands" },
        { name: "Process", href: "#community" },
        { name: "Clients", href: "#testimonials" },
        { name: "Mission", href: "#mission" },
    ]

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setIsMenuOpen(false)
    }

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between h-20 px-6 md:px-12 transition-all duration-500 ${scrolled ? "glass-dark h-16" : "bg-transparent"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-12 h-12 flex items-center justify-center glass-yellow rounded-xl overflow-hidden cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-yellow-500/10" />
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="w-10 h-10 object-contain z-10"
                            onError={(e) => {
                                e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3233/3233827.png" // Fallback icon
                            }}
                        />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="font-sans font-[1000] text-xl tracking-tighter text-yellow-500 leading-none">YELLOW SCOOTER</span>
                        <span className="font-sans font-extrabold text-[10px] tracking-[0.2em] text-white/90 leading-none mt-1.5 uppercase">Production</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {navItems.slice(0, 3).map((item, idx) => (
                        <motion.button
                            key={item.name}
                            onClick={() => scrollToSection(item.href)}
                            className="text-white hover:text-yellow-500 transition-all duration-300 text-sm font-sans font-[1000] tracking-tight uppercase relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full" />
                        </motion.button>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={() => scrollToSection("#join")}
                        className="px-6 py-2.5 glass-yellow rounded-full text-[11px] font-sans font-[1000] tracking-tight text-white hover:bg-yellow-500 transition-all duration-500 uppercase"
                    >
                        Let's Talk
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden glass-yellow p-2 rounded-lg text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-[55] glass-dark flex flex-col items-center justify-center gap-10 p-6 md:hidden"
                >
                    <button
                        className="absolute top-6 right-6 p-2 text-white/50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X size={32} />
                    </button>
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.href)}
                            className="text-5xl font-serif italic font-bold text-white hover:text-yellow-500 transition-colors tracking-tight"
                        >
                            {item.name}
                        </button>
                    ))}
                    <div className="mt-12 flex gap-8">
                        <Instagram size={32} className="text-white/50 hover:text-yellow-500" />
                        <Twitter size={32} className="text-white/50 hover:text-yellow-500" />
                        <Facebook size={32} className="text-white/50 hover:text-yellow-500" />
                    </div>
                </div>
            )}
        </>
    )
}
