"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Cpu, Shield, Wallet, TrendingUp, Globe, Clock, 
  Zap, BarChart3, Lock, Smartphone, RefreshCw, Headphones 
} from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Minage Cloud Haute Performance",
    description: "Infrastructure de derniere generation avec les meilleurs ASIC du marche. Aucun materiel a acheter ou maintenir.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Conformite TVA Automatique",
    description: "Rapports fiscaux generes automatiquement. Declarations simplifiees pour tous les pays europeens.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    icon: Wallet,
    title: "Retraits Instantanes",
    description: "Recevez vos gains en Bitcoin ou en euros sur votre compte bancaire. Virements sous 24h garantis.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    title: "ROI Optimise 12-18%",
    description: "Algorithmes d&apos;optimisation qui maximisent vos rendements en temps reel selon les conditions du marche.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    icon: Globe,
    title: "Accessible Partout",
    description: "Gerez vos mineurs depuis n&apos;importe ou dans le monde. Interface disponible en 12 langues.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Clock,
    title: "Uptime 99.9%",
    description: "Infrastructure redondante sur 5 continents. Vos mineurs ne s&apos;arretent jamais.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: Zap,
    title: "Energie Verte",
    description: "100% de notre energie provient de sources renouvelables. Minage eco-responsable certifie.",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    icon: BarChart3,
    title: "Dashboard Temps Reel",
    description: "Suivez vos revenus, hashrate et performances en direct. Statistiques detaillees et exportables.",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    icon: Lock,
    title: "Securite Bancaire",
    description: "Chiffrement AES-256, 2FA obligatoire, cold storage. Vos fonds sont proteges.",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    icon: Smartphone,
    title: "Application Mobile",
    description: "Gerez tout depuis votre smartphone. Notifications push pour chaque transaction.",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
  },
  {
    icon: RefreshCw,
    title: "Auto-Reinvestissement",
    description: "Activez le compound automatique pour maximiser vos gains sur le long terme.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
  },
  {
    icon: Headphones,
    title: "Support Premium 24/7",
    description: "Equipe dediee disponible en francais. Reponse garantie sous 2 heures.",
    color: "text-teal-400",
    bgColor: "bg-teal-400/10",
  },
]

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <Zap className="h-4 w-4" />
            Fonctionnalites
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Tout ce dont vous avez besoin pour{" "}
            <span className="text-gradient">reussir</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Une plateforme complete avec toutes les fonctionnalites pour maximiser 
            vos revenus de minage et d&apos;affiliation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 group ${
                visibleCards.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`h-12 w-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
