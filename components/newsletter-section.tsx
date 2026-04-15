"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Gift, Check, Loader2 } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setEmail("")
    }, 1500)
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 text-center glow-green">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm text-accent mb-4">
            <Gift className="h-4 w-4" />
            Bonus Exclusif
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Recevez <span className="text-gradient">$50 de bonus</span> pour votre inscription
          </h2>

          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Inscrivez-vous a notre newsletter et recevez $50 de credit mining, 
            plus nos meilleurs conseils pour maximiser vos revenus.
          </p>

          {status === "success" ? (
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/20 px-6 py-3 text-primary">
              <Check className="h-5 w-5" />
              <span className="font-medium">Merci! Verifiez votre email pour votre bonus.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="h-12 px-8 bg-primary hover:bg-primary/90"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Recevoir mon bonus"
                )}
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            En vous inscrivant, vous acceptez nos conditions d&apos;utilisation. 
            Desabonnement possible a tout moment.
          </p>
        </div>
      </div>
    </section>
  )
}
