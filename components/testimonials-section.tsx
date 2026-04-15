"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Jean-Pierre M.",
    role: "Entrepreneur, Lyon",
    avatar: "JP",
    content: "Je gagne maintenant plus de 2,500 EUR par mois grace a CryptoMine. Le programme d'affiliation est incroyable - j'ai parraine 35 personnes et les commissions s'accumulent.",
    rating: 5,
    earnings: "+$3,200/mois",
    verified: true,
  },
  {
    name: "Marie L.",
    role: "Freelance, Paris",
    avatar: "ML",
    content: "Ce qui m'a convaincue c'est la simplicite. Pas besoin d'etre expert en crypto. J'ai configure mes mineurs en 10 minutes et les revenus arrivent chaque jour automatiquement.",
    rating: 5,
    earnings: "+$1,850/mois",
    verified: true,
  },
  {
    name: "Thomas D.",
    role: "Investisseur, Geneve",
    avatar: "TD",
    content: "Apres avoir teste plusieurs plateformes, CryptoMine est de loin la meilleure. La transparence sur les revenus et la conformite TVA integree font toute la difference.",
    rating: 5,
    earnings: "+$5,400/mois",
    verified: true,
  },
  {
    name: "Sophie B.",
    role: "Comptable, Bruxelles",
    avatar: "SB",
    content: "En tant que comptable, j'apprecie particulierement les rapports fiscaux automatises. Mes clients peuvent facilement declarer leurs revenus de minage sans tracas.",
    rating: 5,
    earnings: "+$2,100/mois",
    verified: true,
  },
  {
    name: "Nicolas R.",
    role: "Etudiant, Bordeaux",
    avatar: "NR",
    content: "J'ai commence avec le plan gratuit pour tester. Maintenant je suis Pro et je finance mes etudes avec les revenus du minage. Le meilleur investissement que j'ai fait.",
    rating: 5,
    earnings: "+$890/mois",
    verified: true,
  },
  {
    name: "Claire V.",
    role: "Retraitee, Nice",
    avatar: "CV",
    content: "A 62 ans, je pensais que la crypto n'etait pas pour moi. Le support m'a aide a tout configurer et maintenant j'ai un complement de retraite appreciable.",
    rating: 5,
    earnings: "+$1,200/mois",
    verified: true,
  },
  {
    name: "Alexandre P.",
    role: "Developer, Montreal",
    avatar: "AP",
    content: "L'API est excellente pour l'integration. J'ai automatise tout mon workflow et je suis mes revenus en temps reel. Le support technique est tres reactif.",
    rating: 5,
    earnings: "+$4,500/mois",
    verified: true,
  },
  {
    name: "Isabelle M.",
    role: "Marketing, Marseille",
    avatar: "IM",
    content: "Le programme d'affiliation m'a permis de quitter mon emploi. Avec mes 150 filleuls actifs, je genere plus de 6000 EUR par mois en commissions seules.",
    rating: 5,
    earnings: "+$7,200/mois",
    verified: true,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent mb-4">
            <Quote className="h-4 w-4" />
            Temoignages
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Ils ont transforme leurs{" "}
            <span className="text-gradient">revenus avec CryptoMine</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Decouvrez les histoires de nos utilisateurs qui generent des revenus 
            passifs chaque mois.
          </p>
        </div>

        {/* Featured testimonial carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden rounded-3xl">
            <div 
              ref={containerRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-accent p-0.5">
                          <div className="h-full w-full rounded-2xl bg-card flex items-center justify-center text-2xl font-bold">
                            {testimonial.avatar}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                          ))}
                        </div>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                          {`"${testimonial.content}"`}
                        </p>
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              {testimonial.name}
                              {testimonial.verified && (
                                <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          </div>
                          <div className="md:ml-auto">
                            <div className="text-2xl font-bold text-primary">{testimonial.earnings}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Social proof bar */}
        <div className="glass rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient">4.9/5</div>
              <div className="text-sm text-muted-foreground mt-1">Note Moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient">12,500+</div>
              <div className="text-sm text-muted-foreground mt-1">Avis Verifies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient">97%</div>
              <div className="text-sm text-muted-foreground mt-1">Taux de Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient">{"<2h"}</div>
              <div className="text-sm text-muted-foreground mt-1">Temps de Reponse</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
