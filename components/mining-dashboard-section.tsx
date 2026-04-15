"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Cpu, Activity, Zap, TrendingUp, Server, 
  ThermometerSun, Gauge, Clock, DollarSign, 
  BarChart3, Wallet, ArrowUpRight, Play, Pause
} from "lucide-react"
import { formatNumber, formatCurrency } from "@/lib/format"

interface MinerData {
  id: string
  name: string
  hashrate: number
  temp: number
  status: 'active' | 'idle' | 'maintenance'
  earnings24h: number
  efficiency: number
}

const initialMiners: MinerData[] = [
  { id: '1', name: 'Antminer S19 Pro', hashrate: 110, temp: 65, status: 'active', earnings24h: 12.45, efficiency: 29.5 },
  { id: '2', name: 'Whatsminer M30S++', hashrate: 112, temp: 62, status: 'active', earnings24h: 13.20, efficiency: 31.0 },
  { id: '3', name: 'Antminer S19 XP', hashrate: 140, temp: 68, status: 'active', earnings24h: 15.80, efficiency: 21.5 },
  { id: '4', name: 'Avalon A1246', hashrate: 90, temp: 58, status: 'idle', earnings24h: 0, efficiency: 38.0 },
]

export function MiningDashboardSection() {
  const [mounted, setMounted] = useState(false)
  const [miners, setMiners] = useState(initialMiners)
  const [globalHashrate, setGlobalHashrate] = useState(452)
  const [blocksFound, setBlocksFound] = useState(127)
  const [pendingRewards, setPendingRewards] = useState(0.00847)
  const [totalEarnings, setTotalEarnings] = useState(2847.32)
  const [miningEnabled, setMiningEnabled] = useState(true)
  const [blockProgress, setBlockProgress] = useState(45)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    if (!mounted || !miningEnabled) return

    const interval = setInterval(() => {
      // Update hashrates with small variations
      setMiners(prev => prev.map(miner => ({
        ...miner,
        hashrate: miner.status === 'active' 
          ? miner.hashrate + (Math.random() * 4 - 2) 
          : miner.hashrate,
        temp: miner.status === 'active'
          ? Math.min(80, Math.max(55, miner.temp + (Math.random() * 2 - 1)))
          : miner.temp,
        earnings24h: miner.status === 'active'
          ? miner.earnings24h + Math.random() * 0.01
          : 0,
      })))

      setGlobalHashrate(prev => prev + (Math.random() * 5 - 2.5))
      setPendingRewards(prev => prev + Math.random() * 0.00001)
      setTotalEarnings(prev => prev + Math.random() * 0.05)
      setBlockProgress(prev => {
        const next = prev + Math.random() * 2
        if (next >= 100) {
          setBlocksFound(b => b + 1)
          return 0
        }
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [mounted, miningEnabled])

  const activeMiners = miners.filter(m => m.status === 'active').length
  const totalHashrate = miners.reduce((sum, m) => sum + (m.status === 'active' ? m.hashrate : 0), 0)

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <Cpu className="h-4 w-4" />
            Dashboard de Minage
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Surveillez vos{" "}
            <span className="text-gradient">mineurs en temps reel</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Interface professionnelle pour gerer et optimiser vos operations de minage.
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="glass rounded-3xl p-6 md:p-8 mb-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center">
                <Server className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Mining Operations</h3>
                <div className="text-sm text-muted-foreground">
                  {activeMiners}/{miners.length} mineurs actifs
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setMiningEnabled(!miningEnabled)}
              className={miningEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}
            >
              {miningEnabled ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Mining
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Mining
                </>
              )}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl bg-secondary/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Hashrate Total</span>
              </div>
              <div className="text-2xl font-bold">
                {mounted ? totalHashrate.toFixed(1) : '452.0'} TH/s
              </div>
              <div className="text-xs text-primary flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +3.2% vs hier
              </div>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">Blocs Trouves</span>
              </div>
              <div className="text-2xl font-bold">
                {mounted ? blocksFound : 127}
              </div>
              <div className="text-xs text-accent flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                Dernier: il y a 2h
              </div>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Recompenses Pending</span>
              </div>
              <div className="text-2xl font-bold">
                {mounted ? pendingRewards.toFixed(5) : '0.00847'} BTC
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                ~{formatCurrency(pendingRewards * 98547, 2)}
              </div>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted-foreground">Gains Totaux</span>
              </div>
              <div className="text-2xl font-bold text-gradient">
                {mounted ? formatCurrency(totalEarnings, 2) : '$2,847.32'}
              </div>
              <div className="text-xs text-primary flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                +$127.45 cette semaine
              </div>
            </div>
          </div>

          {/* Block Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary animate-pulse" />
                Bloc #{(blocksFound + 1).toString().padStart(6, '0')} en cours
              </span>
              <span className="font-medium">{mounted ? blockProgress.toFixed(1) : '45.0'}%</span>
            </div>
            <div className="h-4 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-emerald-400 to-primary rounded-full transition-all duration-500"
                style={{ width: `${mounted ? blockProgress : 45}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Temps estime: ~8 min</span>
              <span>Recompense: 0.00012 BTC</span>
            </div>
          </div>

          {/* Miners List */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Server className="h-4 w-4" />
              Vos Mineurs
            </h4>
            <div className="space-y-3">
              {miners.map((miner) => (
                <div 
                  key={miner.id}
                  className={`rounded-xl bg-secondary/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    miner.status === 'active' ? 'border-l-4 border-primary' : 'border-l-4 border-muted'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      miner.status === 'active' ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Cpu className={`h-5 w-5 ${miner.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <div className="font-medium">{miner.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          miner.status === 'active' ? 'bg-primary' : 
                          miner.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        {miner.status === 'active' ? 'En fonctionnement' : 
                         miner.status === 'idle' ? 'En pause' : 'Maintenance'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 text-center sm:text-right">
                    <div>
                      <div className="text-xs text-muted-foreground">Hashrate</div>
                      <div className="font-medium">
                        {mounted ? miner.hashrate.toFixed(1) : miner.hashrate} TH/s
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Temp</div>
                      <div className={`font-medium ${miner.temp > 70 ? 'text-red-400' : 'text-foreground'}`}>
                        {mounted ? miner.temp.toFixed(0) : miner.temp}°C
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                      <div className="font-medium">{miner.efficiency} J/TH</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">24h</div>
                      <div className="font-medium text-primary">
                        ${mounted ? miner.earnings24h.toFixed(2) : miner.earnings24h.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Button variant="outline" className="glass border-border hover:border-primary/50 h-auto py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">Ajouter un Mineur</div>
                <div className="text-xs text-muted-foreground">Augmentez votre hashrate</div>
              </div>
            </div>
          </Button>
          <Button variant="outline" className="glass border-border hover:border-primary/50 h-auto py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-medium">Voir Analytics</div>
                <div className="text-xs text-muted-foreground">Rapports detailles</div>
              </div>
            </div>
          </Button>
          <Button variant="outline" className="glass border-border hover:border-primary/50 h-auto py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">Retirer BTC</div>
                <div className="text-xs text-muted-foreground">Min: 0.001 BTC</div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </section>
  )
}
