"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Gift, Users, Wallet, Share2 } from "lucide-react"

const tiers = [
  {
    level: "Bronze",
    referrals: "1-10",
    commission: "10%",
    bonus: "$50",
    color: "from-amber-700 to-amber-900",
  },
  {
    level: "Silver",
    referrals: "11-50",
    commission: "15%",
    bonus: "$200",
    color: "from-slate-400 to-slate-600",
  },
  {
    level: "Gold",
    referrals: "51-100",
    commission: "20%",
    bonus: "$500",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    level: "Diamond",
    referrals: "100+",
    commission: "25%",
    bonus: "$2,000",
    color: "from-cyan-300 to-cyan-500",
  },
]

const steps = [
  {
    icon: Share2,
    title: "Partagez votre lien",
    description: "Obtenez votre lien unique et partagez-le sur vos reseaux.",
  },
  {
    icon: Users,
    title: "Vos amis s'inscrivent",
    description: "Ils beneficient de 10% de reduction sur leur premier achat.",
  },
  {
    icon: Wallet,
    title: "Recevez vos commissions",
    description: "Gagnez jusqu'a 25% sur tous leurs frais de minage, a vie.",
  },
]

export function AffiliateSection() {
  return (
    <section id="affiliate" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent mb-4">
            <Gift className="h-4 w-4" />
            Programme Affiliation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            {"Gagnez jusqu'a "}
            <span className="text-gradient">25% de commission</span>
            {" a vie"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Recommandez CryptoMine a vos amis et gagnez des commissions 
            sur tous leurs frais de minage. Pour toujours.
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-flex">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Commission tiers */}
        <div className="glass rounded-3xl p-8 glow-gold">
          <h3 className="text-xl font-bold text-center mb-8">Niveaux de Commission</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="relative rounded-2xl p-6 text-center overflow-hidden group hover:-translate-y-1 transition-transform"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className="text-sm text-muted-foreground mb-1">Niveau</div>
                  <div className="text-2xl font-bold mb-4">{tier.level}</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Filleuls</span>
                      <span className="font-medium">{tier.referrals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Commission</span>
                      <span className="font-bold text-primary">{tier.commission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bonus</span>
                      <span className="font-medium text-accent">{tier.bonus}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Rejoindre le Programme
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Top affiliates */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-8">Top Affilies du Mois</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Marc D.", earnings: "$12,450", country: "FR" },
              { name: "Sophie L.", earnings: "$9,830", country: "BE" },
              { name: "Pierre M.", earnings: "$8,245", country: "CH" },
              { name: "Julie R.", earnings: "$7,120", country: "CA" },
              { name: "Thomas K.", earnings: "$6,890", country: "FR" },
            ].map((affiliate, index) => (
              <div key={index} className="glass rounded-xl px-6 py-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                  #{index + 1}
                </div>
                <div className="text-left">
                  <div className="font-medium">{affiliate.name} <span className="text-xs text-muted-foreground">({affiliate.country})</span></div>
                  <div className="text-sm text-primary font-bold">{affiliate.earnings}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
