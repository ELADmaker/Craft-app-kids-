"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Gratuit",
    period: "",
    description: "Parfait pour decouvrir le minage Bitcoin",
    features: [
      "1 Mineur NFT Basic",
      "Acces au Dashboard",
      "1 Pool de Minage",
      "Blog & Actualites",
      "Support Email",
      "Programme Affiliation 10%",
    ],
    cta: "Commencer Gratuitement",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mois",
    description: "Pour les mineurs serieux qui veulent maximiser leurs gains",
    features: [
      "5 Mineurs NFT Pro",
      "Tous les 6 Pools",
      "Analytics Avancees",
      "Notifications SMS",
      "Support Prioritaire",
      "Programme Affiliation 20%",
      "Rapports TVA Automatises",
      "Acces API",
    ],
    cta: "Essai Gratuit 14 Jours",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mois",
    description: "Solution complete pour les professionnels et entreprises",
    features: [
      "Mineurs NFT Illimites",
      "Infrastructure Dediee",
      "API Personnalisee",
      "Conformite TVA Pro",
      "Partenaires Comptables",
      "Support 24/7",
      "Programme Affiliation 25%",
      "White-label Available",
      "SLA Garanti 99.9%",
    ],
    cta: "Contacter les Ventes",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Tarification
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Choisissez le plan qui{" "}
            <span className="text-gradient">vous correspond</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tous les plans incluent un essai gratuit. Annulez a tout moment.
            Pas de frais caches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass rounded-3xl p-8 ${
                plan.popular 
                  ? "border-primary/50 glow-green scale-105 z-10" 
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    Le Plus Populaire
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular 
                    ? "bg-primary hover:bg-primary/90" 
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Money back guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">Garantie Satisfait ou Rembourse</div>
              <div className="text-xs text-muted-foreground">30 jours pour tester sans risque</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
