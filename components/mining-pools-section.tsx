"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Layers, Users, Zap, TrendingUp, Clock, 
  CheckCircle2, Star, ArrowRight, Globe
} from "lucide-react"
import { formatNumber } from "@/lib/format"

interface Pool {
  id: string
  name: string
  region: string
  hashrate: number
  miners: number
  fee: number
  minPayout: number
  avgBlockTime: string
  reliability: number
  pps: boolean
  featured: boolean
}

const pools: Pool[] = [
  {
    id: '1',
    name: 'CryptoMine EU',
    region: 'Europe',
    hashrate: 89.5,
    miners: 12453,
    fee: 1.0,
    minPayout: 0.001,
    avgBlockTime: '12 min',
    reliability: 99.9,
    pps: true,
    featured: true,
  },
  {
    id: '2',
    name: 'CryptoMine US',
    region: 'Amerique du Nord',
    hashrate: 76.2,
    miners: 9847,
    fee: 1.0,
    minPayout: 0.001,
    avgBlockTime: '14 min',
    reliability: 99.8,
    pps: true,
    featured: false,
  },
  {
    id: '3',
    name: 'CryptoMine Asia',
    region: 'Asie-Pacifique',
    hashrate: 95.8,
    miners: 15234,
    fee: 0.8,
    minPayout: 0.0005,
    avgBlockTime: '10 min',
    reliability: 99.9,
    pps: true,
    featured: true,
  },
  {
    id: '4',
    name: 'CryptoMine Pro',
    region: 'Global',
    hashrate: 145.3,
    miners: 8921,
    fee: 1.5,
    minPayout: 0.01,
    avgBlockTime: '8 min',
    reliability: 99.95,
    pps: true,
    featured: false,
  },
]

export function MiningPoolsSection() {
  const [mounted, setMounted] = useState(false)
  const [poolData, setPoolData] = useState(pools)
  const [selectedPool, setSelectedPool] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setPoolData(prev => prev.map(pool => ({
        ...pool,
        hashrate: pool.hashrate + (Math.random() * 2 - 1),
        miners: pool.miners + Math.floor(Math.random() * 10 - 5),
      })))
    }, 5000)
    return () => clearInterval(interval)
  }, [mounted])

  const totalHashrate = poolData.reduce((sum, p) => sum + p.hashrate, 0)
  const totalMiners = poolData.reduce((sum, p) => sum + p.miners, 0)

  return (
    <section id="pools" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-500/5 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400 mb-4">
            <Layers className="h-4 w-4" />
            Pools de Minage
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Rejoignez nos{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              pools haute performance
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mutualisez votre puissance de calcul avec des milliers de mineurs 
            pour des revenus plus stables et previsibles.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass rounded-2xl p-6 text-center">
            <Layers className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{pools.length}</div>
            <div className="text-sm text-muted-foreground">Pools Disponibles</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{mounted ? totalHashrate.toFixed(1) : '406.8'} EH/s</div>
            <div className="text-sm text-muted-foreground">Hashrate Total</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <Users className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{mounted ? formatNumber(totalMiners) : '46,455'}</div>
            <div className="text-sm text-muted-foreground">Mineurs Actifs</div>
          </div>
          <div className="glass rounded-2xl p-6 text-center">
            <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime Moyen</div>
          </div>
        </div>

        {/* Pools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {poolData.map((pool) => (
            <div
              key={pool.id}
              className={`glass rounded-3xl p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                pool.featured ? 'border-cyan-500/30' : ''
              } ${selectedPool === pool.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedPool(pool.id === selectedPool ? null : pool.id)}
            >
              {pool.featured && (
                <div className="flex items-center gap-1 text-xs text-cyan-400 mb-4">
                  <Star className="h-3 w-3 fill-current" />
                  Pool Recommande
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{pool.name}</h3>
                    <div className="text-sm text-muted-foreground">{pool.region}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Frais</div>
                  <div className="font-bold text-primary">{pool.fee}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-secondary/50 p-3">
                  <div className="text-xs text-muted-foreground mb-1">Hashrate Pool</div>
                  <div className="font-semibold">{mounted ? pool.hashrate.toFixed(1) : pool.hashrate} EH/s</div>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3">
                  <div className="text-xs text-muted-foreground mb-1">Mineurs</div>
                  <div className="font-semibold">{mounted ? formatNumber(pool.miners) : formatNumber(pool.miners)}</div>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3">
                  <div className="text-xs text-muted-foreground mb-1">Temps Bloc Moy.</div>
                  <div className="font-semibold flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {pool.avgBlockTime}
                  </div>
                </div>
                <div className="rounded-xl bg-secondary/50 p-3">
                  <div className="text-xs text-muted-foreground mb-1">Fiabilite</div>
                  <div className="font-semibold text-primary">{pool.reliability}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    PPS+
                  </span>
                  <span className="text-muted-foreground">
                    Min: {pool.minPayout} BTC
                  </span>
                </div>
                <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                  Rejoindre
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-16 glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-center mb-8">Avantages du Pool Mining</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: 'Revenus Stables', desc: 'Paiements reguliers et previsibles' },
              { icon: Users, title: 'Force Collective', desc: 'Puissance de calcul mutualisee' },
              { icon: Zap, title: 'Faibles Frais', desc: 'Seulement 0.8-1.5% de commission' },
              { icon: CheckCircle2, title: 'Support 24/7', desc: 'Assistance technique continue' },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="font-semibold mb-1">{benefit.title}</div>
                <div className="text-sm text-muted-foreground">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
