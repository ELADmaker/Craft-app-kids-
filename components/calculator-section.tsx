"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp } from "lucide-react"

export function CalculatorSection() {
  const [miners, setMiners] = useState([3])
  const [poolCount, setPoolCount] = useState([2])
  const [referrals, setReferrals] = useState([5])

  const minerRevenue = miners[0] * 85
  const poolBonus = poolCount[0] * 25
  const referralRevenue = referrals[0] * 42
  const totalMonthly = minerRevenue + poolBonus + referralRevenue
  const totalYearly = totalMonthly * 12

  return (
    <section id="calculator" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <Calculator className="h-4 w-4" />
            Calculateur de Revenus
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Estimez vos{" "}
            <span className="text-gradient">revenus potentiels</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ajustez les parametres pour voir combien vous pourriez gagner 
            avec CryptoMine chaque mois.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="glass rounded-3xl p-8 space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-medium">Nombre de Mineurs NFT</label>
                <span className="text-sm font-bold text-primary">{miners[0]} mineurs</span>
              </div>
              <Slider
                value={miners}
                onValueChange={setMiners}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-medium">Pools de Minage Actifs</label>
                <span className="text-sm font-bold text-primary">{poolCount[0]} pools</span>
              </div>
              <Slider
                value={poolCount}
                onValueChange={setPoolCount}
                max={6}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1</span>
                <span>6</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-sm font-medium">Filleuls Actifs</label>
                <span className="text-sm font-bold text-accent">{referrals[0]} personnes</span>
              </div>
              <Slider
                value={referrals}
                onValueChange={setReferrals}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>0</span>
                <span>50</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Revenus du Minage</div>
              </div>
              <div className="text-2xl font-bold">${minerRevenue}/mois</div>
              <div className="text-sm text-muted-foreground mt-1">
                {miners[0]} mineurs x $85 de revenus moyens
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Bonus Pools</div>
              </div>
              <div className="text-2xl font-bold">${poolBonus}/mois</div>
              <div className="text-sm text-muted-foreground mt-1">
                {poolCount[0]} pools x $25 de bonus moyens
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div className="text-sm text-muted-foreground">Commissions Affiliation</div>
              </div>
              <div className="text-2xl font-bold">${referralRevenue}/mois</div>
              <div className="text-sm text-muted-foreground mt-1">
                {referrals[0]} filleuls x $42 de commission moyenne
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border-primary/30 glow-green">
              <div className="text-sm text-muted-foreground mb-2">Total Estime</div>
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-4xl font-bold text-gradient">${totalMonthly}</div>
                  <div className="text-sm text-muted-foreground">par mois</div>
                </div>
                <div className="text-muted-foreground">/</div>
                <div>
                  <div className="text-2xl font-bold text-primary">${totalYearly.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">par an</div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                Commencer Maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
