"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-12 glow-green">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
            Pret a generer des{" "}
            <span className="text-gradient">revenus passifs</span> ?
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Rejoignez plus de 50,000 utilisateurs qui gagnent deja des revenus 
            avec CryptoMine. Inscription gratuite, commencez a miner en 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 px-8 text-base">
              Creer Mon Compte Gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base">
              Parler a un Expert
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <span>Pas de carte requise</span>
            <span>Configuration en 5 min</span>
            <span>Support 24/7</span>
          </div>
        </div>
      </div>
    </section>
  )
}
