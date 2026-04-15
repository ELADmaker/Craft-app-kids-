"use client"

import { useEffect, useState } from "react"
import { Coins, Users, Layers, Lock, ArrowUpRight } from "lucide-react"

const incomeStreams = [
  {
    icon: Coins,
    title: "Revenus de Minage",
    description: "Gagnez des Bitcoin quotidiennement grace a notre puissance de calcul mutualisee.",
    percentage: "8-12%",
    period: "ROI Annuel",
    color: "from-primary to-emerald-400",
    amount: "$85-150",
    frequency: "/mois par mineur",
  },
  {
    icon: Layers,
    title: "Bonus Pool Mining",
    description: "Bonus supplementaires en rejoignant nos pools de minage optimises.",
    percentage: "+15%",
    period: "Bonus Extra",
    color: "from-cyan-400 to-blue-500",
    amount: "$25-50",
    frequency: "/mois par pool",
  },
  {
    icon: Users,
    title: "Commissions Affiliation",
    description: "Gagnez jusqu&apos;a 25% sur les frais de minage de vos filleuls, a vie.",
    percentage: "10-25%",
    period: "A Vie",
    color: "from-accent to-orange-500",
    amount: "$42",
    frequency: "moyenne/filleul/mois",
  },
  {
    icon: Lock,
    title: "Staking Rewards",
    description: "Verrouillez vos BTC pour des rendements supplementaires garantis.",
    percentage: "5-8%",
    period: "APY",
    color: "from-purple-500 to-pink-500",
    amount: "Variable",
    frequency: "selon montant stake",
  },
]

export function IncomeSection() {
  const [counters, setCounters] = useState([0, 0, 0, 0])
  const targets = [847532, 156789, 2847645, 98547]

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      
      setCounters(targets.map(target => Math.floor(target * eased)))
      
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="income" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent mb-4">
            <Coins className="h-4 w-4" />
            Sources de Revenus
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            {"4 facons de generer des "}
            <span className="text-gradient">revenus passifs</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diversifiez vos sources de revenus et maximisez vos gains avec 
            notre ecosysteme complet.
          </p>
        </div>

        {/* Live counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Total Verse", value: counters[0], prefix: "$", suffix: "" },
            { label: "Utilisateurs Payes", value: counters[1], prefix: "", suffix: "+" },
            { label: "BTC Distribues", value: counters[2] / 1000, prefix: "", suffix: " BTC" },
            { label: "Prix BTC Live", value: counters[3], prefix: "$", suffix: "" },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-2xl p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient">
                {stat.prefix}{typeof stat.value === 'number' && stat.value % 1 !== 0 
                  ? stat.value.toFixed(2) 
                  : stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {incomeStreams.map((stream, index) => (
            <div
              key={index}
              className="glass rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${stream.color} p-0.5`}>
                  <div className="h-full w-full rounded-2xl bg-card flex items-center justify-center">
                    <stream.icon className="h-7 w-7 text-foreground" />
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stream.color} bg-clip-text text-transparent`}>
                    {stream.percentage}
                  </div>
                  <div className="text-xs text-muted-foreground">{stream.period}</div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                {stream.title}
                <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-muted-foreground mb-4">{stream.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Revenus moyens:</span>
                <span className="font-semibold text-primary">{stream.amount} <span className="text-xs text-muted-foreground">{stream.frequency}</span></span>
              </div>
            </div>
          ))}
        </div>

        {/* Income breakdown visual */}
        <div className="mt-16 glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-center mb-8">Exemple de Revenus Mensuels</h3>
          <div className="space-y-4">
            {[
              { label: "5 Mineurs NFT", amount: 425, percent: 45, color: "bg-primary" },
              { label: "3 Pools Actifs", amount: 150, percent: 16, color: "bg-cyan-400" },
              { label: "20 Filleuls", amount: 280, percent: 30, color: "bg-accent" },
              { label: "Staking 0.5 BTC", amount: 85, percent: 9, color: "bg-purple-500" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm text-muted-foreground">{item.label}</div>
                <div className="flex-1 h-8 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
                    style={{ width: `${item.percent}%` }}
                  >
                    <span className="text-xs font-bold text-white">${item.amount}</span>
                  </div>
                </div>
                <div className="w-20 text-right font-semibold">${item.amount}</div>
              </div>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div className="w-32 text-sm font-bold">TOTAL</div>
              <div className="flex-1" />
              <div className="w-20 text-right text-2xl font-bold text-gradient">$940</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
