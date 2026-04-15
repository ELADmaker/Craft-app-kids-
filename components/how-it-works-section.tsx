"use client"

import { UserPlus, ShoppingCart, Play, Wallet, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Creez votre compte",
    description: "Inscription gratuite en 2 minutes. Email et verification KYC simplifiee.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Achetez des mineurs",
    description: "Choisissez vos mineurs NFT selon votre budget. A partir de $99.",
    color: "from-primary to-emerald-400",
  },
  {
    number: "03",
    icon: Play,
    title: "Activez le minage",
    description: "Un clic pour demarrer. Vos mineurs commencent immediatement.",
    color: "from-accent to-orange-500",
  },
  {
    number: "04",
    icon: Wallet,
    title: "Recevez vos gains",
    description: "Revenus credites quotidiennement. Retirez quand vous voulez.",
    color: "from-purple-500 to-pink-500",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <Play className="h-4 w-4" />
            Comment ca marche
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Commencez a miner en{" "}
            <span className="text-gradient">4 etapes simples</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pas besoin d&apos;etre expert. Notre plateforme est concue pour etre 
            accessible a tous, du debutant au professionnel.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Arrow connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="sm:hidden absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <ArrowRight className="h-6 w-6 text-border rotate-90" />
                  </div>
                )}

                <div className="glass rounded-3xl p-8 text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-card border border-border text-sm font-bold text-muted-foreground">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`relative mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 group-hover:scale-110 transition-transform`}>
                    <div className="h-full w-full rounded-2xl bg-card flex items-center justify-center">
                      <step.icon className="h-10 w-10 text-foreground" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video placeholder */}
        <div className="mt-16 glass rounded-3xl overflow-hidden aspect-video max-w-4xl mx-auto group cursor-pointer">
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2322c55e\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            <div className="relative h-20 w-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/50">
              <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
            </div>
            <div className="absolute bottom-6 left-6 text-left">
              <div className="text-sm text-muted-foreground mb-1">Tutoriel video</div>
              <div className="text-lg font-semibold">Decouvrez CryptoMine en 3 minutes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
