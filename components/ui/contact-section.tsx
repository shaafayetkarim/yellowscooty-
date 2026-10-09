"use client"

import { useState } from "react"
import { Send, CheckCircle2, AlertCircle, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

const CATEGORIES = [
  "Events",
  "Advertisements",
  "TCV / TVC",
  "Documentaries",
  "Music Videos",
  "Other",
]

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Advertisements",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `[Category: ${formData.category}]\n\n${formData.message}`,
        }),
      })

      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", category: "Advertisements", message: "" })
        setTimeout(() => setStatus("idle"), 6000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <section id="join" className="relative w-full py-28 md:py-36 bg-black text-white border-t border-white/5 font-outfit">
      {/* Background Subtle Ambience */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #8b0100 0%, transparent 70%)" }}
      />

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
                <span>let&apos;s direct</span> <br />
                <span style={{ color: "#8b0100" }}>your vision</span>
              </h2>
              <div className="h-1 w-24 rounded-full mb-6" style={{ background: "#8b0100" }} />

              <p className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed max-w-md">
                Have an ambitious narrative in mind? Whether it&apos;s a broadcast TVC, a documentary film, or mega event coverage, we&apos;re ready to shape your story with cinematic precision.
              </p>
            </div>

            {/* Direct Contact Points */}
            <div className="mt-12 space-y-6 pt-8 border-t border-white/10">
              <a
                href="mailto:aresproduction@gmail.com"
                className="flex items-center gap-4 group cursor-pointer text-white/80 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-none border border-white/20 bg-white/[0.03] flex items-center justify-center group-hover:border-[#8b0100] group-hover:bg-[#8b0100]/10 transition-colors">
                  <Mail size={18} style={{ color: "#8b0100" }} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block">Email Us</span>
                  <span className="text-sm font-semibold tracking-wide">aresproduction@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-none border border-white/20 bg-white/[0.03] flex items-center justify-center">
                  <MapPin size={18} style={{ color: "#8b0100" }} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block">Studio HQ</span>
                  <span className="text-sm font-semibold tracking-wide">Dhaka, Bangladesh · Global Deployments</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-none border border-white/20 bg-white/[0.03] flex items-center justify-center">
                  <Phone size={18} style={{ color: "#8b0100" }} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 block">Direct Line</span>
                  <span className="text-sm font-semibold tracking-wide">+880 1700-000000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Normal Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative p-8 sm:p-12 md:p-14 bg-zinc-950/70 border border-white/10 backdrop-blur-md">
              {/* Corner Accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-white/60 block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Turner"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/15 px-4 py-3.5 text-white placeholder-white/25 text-sm font-medium focus:border-[#8b0100] focus:bg-white/[0.06] outline-none transition-all rounded-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-white/60 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/15 px-4 py-3.5 text-white placeholder-white/25 text-sm font-medium focus:border-[#8b0100] focus:bg-white/[0.06] outline-none transition-all rounded-none"
                    />
                  </div>
                </div>

                {/* Project Category Selection */}
                <div className="space-y-3">
                  <label className="text-xs uppercase font-bold tracking-widest text-white/60 block">
                    Discipline / Scope
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-none border ${
                          formData.category === cat
                            ? "bg-[#8b0100] text-white border-[#8b0100]"
                            : "bg-white/[0.03] text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message / Vision */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-white/60 block">
                    Project Vision & Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Briefly describe your objectives, timelines, and vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/15 p-4 text-white placeholder-white/25 text-sm font-medium focus:border-[#8b0100] focus:bg-white/[0.06] outline-none transition-all rounded-none resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-3 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm font-medium">
                    <CheckCircle2 size={18} />
                    <span>Inquiry transmitted successfully. Our team will connect with you shortly.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm font-medium">
                    <AlertCircle size={18} />
                    <span>Failed to transmit inquiry. Please email us directly at aresproduction@gmail.com</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-10 py-4 bg-white text-black hover:bg-[#8b0100] hover:text-white font-bold text-xs uppercase tracking-[0.3em] transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT INQUIRY</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ContactSection
