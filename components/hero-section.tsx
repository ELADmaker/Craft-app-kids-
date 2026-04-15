"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Zap, Users, Bitcoin, Cpu, Activity } from "lucide-react"
import { formatNumber, formatCurrency, formatHashrate } from "@/lib/format"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [btcPrice, setBtcPrice] = useState(98547)
  const [activeUsers, setActiveUsers] = useState(127453)
  const [totalMined, setTotalMined] = useState(2847.32)
  const [hashrate, setHashrate] = useState(319)
  const [miningActive, setMiningActive] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-update live stats
  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setBtcPrice(prev => prev + Math.random() * 100 - 50)
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5))
      setTotalMined(prev => prev + Math.random() * 0.01)
      setHashrate(prev => Math.max(300, prev + Math.random() * 2 - 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [mounted])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Live ticker */}
          <div className="inline-flex items-center gap-4 rounded-full glass px-6 py-2 mb-8 animate-fade-in">
            <div className="flex items-center gap-2">
              <Bitcoin className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">BTC</span>
              <span className="text-sm font-bold text-primary">
                {mounted ? formatCurrency(btcPrice) : '$98,547'}
              </span>
              <span className="text-xs text-primary">+2.4%</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                {mounted ? formatNumber(activeUsers) : '127,453'} utilisateurs en ligne
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
            <span className="block">Minez du Bitcoin</span>
            <span className="block text-gradient mt-2">Sans Materiel. Sans Effort.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-200">
            Rejoignez +127,000 utilisateurs qui generent des revenus passifs grace au 
            cloud mining. Conformite TVA integree. Programme affiliation jusqu&apos;a 25%.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 glow-green group">
              Commencer Gratuitement
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 glass border-border hover:border-primary/50 group">
              <Play className="mr-2 h-5 w-5" />
              Voir la Demo
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 animate-fade-in-up delay-400">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              Securise SSL 256-bit
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              Paiements sous 24h
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              Support 24/7
            </div>
          </div>
        </div>

        {/* Live Mining Dashboard Preview */}
        <div className="mt-16 glass rounded-3xl p-6 animate-fade-in-up delay-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Cpu className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Mining Dashboard Live</div>
                <div className="text-xs text-muted-foreground">Apercu en temps reel</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${miningActive ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
              <span className="text-sm text-primary font-medium">Mining Actif</span>
            </div>
          </div>

          {/* Mining progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progression du bloc</span>
              <span className="font-medium">78.4%</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full animate-shimmer"
                style={{ width: '78.4%' }}
              />
            </div>
          </div>

          {/* Live stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-secondary/50 p-4 text-center">
              <Activity className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient">
                {mounted ? formatNumber(activeUsers) : '127,453'}+
              </div>
              <div className="text-xs text-muted-foreground">Mineurs Actifs</div>
            </div>
            <div className="rounded-2xl bg-secondary/50 p-4 text-center">
              <Bitcoin className="h-5 w-5 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient">
                {mounted ? totalMined.toFixed(2) : '2847.32'}
              </div>
              <div className="text-xs text-muted-foreground">BTC Mines Total</div>
            </div>
            <div className="rounded-2xl bg-secondary/50 p-4 text-center">
              <Cpu className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient">
                {mounted ? formatHashrate(hashrate) : '319.0 EH/s'}
              </div>
              <div className="text-xs text-muted-foreground">Hashrate Global</div>
            </div>
            <div className="rounded-2xl bg-secondary/50 p-4 text-center">
              <Zap className="h-5 w-5 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-accent">$15.8M+</div>
              <div className="text-xs text-muted-foreground">Verse aux Affilies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  )
}
