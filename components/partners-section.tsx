"use client"

import { useEffect, useRef } from "react"

const partners = [
  { name: "Bitmain", logo: "BITMAIN" },
  { name: "Antpool", logo: "ANTPOOL" },
  { name: "F2Pool", logo: "F2POOL" },
  { name: "Binance", logo: "BINANCE" },
  { name: "Coinbase", logo: "COINBASE" },
  { name: "Kraken", logo: "KRAKEN" },
  { name: "Ledger", logo: "LEDGER" },
  { name: "Trezor", logo: "TREZOR" },
]

const certifications = [
  { name: "ISO 27001", description: "Securite Certifiee" },
  { name: "SOC 2", description: "Audit Type II" },
  { name: "GDPR", description: "Conforme UE" },
  { name: "PCI DSS", description: "Paiements Securises" },
]

export function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPos = 0

    const scroll = () => {
      scrollPos += 0.5
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0
      }
      scrollContainer.scrollLeft = scrollPos
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section className="py-16 relative overflow-hidden border-y border-border">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/30 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Partenaires et Certifications
          </p>
        </div>

        {/* Auto-scrolling partners */}
        <div 
          ref={scrollRef}
          className="flex gap-12 overflow-hidden mb-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-12 px-8 glass rounded-lg flex items-center justify-center min-w-[140px] hover:border-primary/30 transition-colors"
            >
              <span className="text-lg font-bold text-muted-foreground tracking-wider">
                {partner.logo}
              </span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center gap-3 glass rounded-full px-6 py-3"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold">{cert.name}</div>
                <div className="text-xs text-muted-foreground">{cert.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
